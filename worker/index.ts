/**
 * Worker Cloudflare — API de comentários (UGC) com moderação.
 *
 * Roteamento:
 *   GET    /api/comments/:slug          → lista comentários aprovados (público, crawlable)
 *   POST   /api/comments/:slug          → envia novo comentário (pending) — reCAPTCHA + honeypot + rate-limit
 *   GET    /api/comments/:slug.jsonld    → JSON-LD Comment[] para o Googlebot (crawlable sem JS)
 *   GET    /api/admin/pending           → lista pendentes (requer token)
 *   POST   /api/admin/:id/approve      → aprova (requer token)
 *   POST   /api/admin/:id/reject       → rejeita (requer token)
 *   POST   /api/admin/:id/spam         → marca spam (requer token)
 *   Tudo o mais → cai no handler de assets (SPA estática)
 */
import {
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  countRecentByIp,
  hashIp,
  isValidAuthorUrl,
  isValidBody,
  isValidName,
  isValidRating,
  isValidSlug,
  looksLikeSpam,
  stripHtml,
  toPublic,
  verifyRecaptcha,
  type CommentRow,
  type PublicComment,
} from "./comments";

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  RECAPTCHA_SECRET: string;
  ADMIN_TOKEN: string;
  IP_SALT: string;
}

const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
      ...headers,
    },
  });

const jsonld = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });

const getClientIp = (req: Request): string => {
  const fwd = req.headers.get("CF-Connecting-IP") ?? req.headers.get("X-Forwarded-For");
  if (!fwd) return "0.0.0.0";
  return fwd.split(",")[0]?.trim() ?? "0.0.0.0";
};

const requireAdmin = (req: Request, env: Env): boolean => {
  const token = req.headers.get("X-Admin-Token");
  return !!token && token === env.ADMIN_TOKEN;
};

/** GET /api/comments/:slug — só comentários aprovados. */
async function handleList(db: D1Database, slug: string): Promise<Response> {
  const stmt = db
    .prepare(
      "SELECT * FROM comments WHERE post_slug = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 200"
    )
    .bind(slug);
  const result = await stmt.all<CommentRow>();
  const rows = result.results ?? [];
  const public_rows: PublicComment[] = rows.map(toPublic);
  return json({ slug, count: public_rows.length, comments: public_rows });
}

/** GET /api/comments/:slug.jsonld — payload JSON-LD `Comment[]` (começável por Googlebot sem JS). */
async function handleJsonld(db: D1Database, slug: string, baseUrl: string, lang: string): Promise<Response> {
  const result = await db
    .prepare(
      "SELECT * FROM comments WHERE post_slug = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 100"
    )
    .bind(slug)
    .all<CommentRow>();
  const rows = result.results ?? [];
  const items = rows.map((r) => ({
    "@type": "Comment",
    "@id": `${baseUrl}#comment-${r.id}`,
    parentItem: `${baseUrl}#article`,
    author: {
      "@type": "Person",
      name: r.author_name,
      ...(r.author_url ? { url: r.author_url } : {}),
    },
    datePublished: r.created_at,
    text: r.body,
    ...(r.rating ? {
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    } : {}),
    inLanguage: lang,
  }));
  return jsonld({ "@context": "https://schema.org", "@graph": items });
}

/** POST /api/comments/:slug — validação, reCAPTCHA, honeypot, rate-limit, spam check. */
async function handleCreate(
  req: Request,
  env: Env,
  slug: string
): Promise<Response> {
  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "invalid-json" }, 400);
  }

  const name = String(payload.name ?? "").trim();
  const body = stripHtml(String(payload.body ?? ""));
  const authorUrl = String(payload.website ?? payload.authorUrl ?? "").trim();
  const rating = Number(payload.rating);
  const lang = String(payload.lang ?? "pt").trim().slice(0, 5);
  const recaptchaToken = String(payload.recaptchaToken ?? "");
  const honeypot = String(payload.website_url ?? payload.company ?? "");

  // Honeypot: bots preenchem campos ocultos. Silenciosamente OK-200 não persiste.
  if (honeypot) {
    return json({ ok: true, pending: true }, 202); // fingir sucesso p/ não alertar bot
  }

  if (!isValidSlug(slug)) return json({ error: "invalid-slug" }, 400);
  if (!isValidName(name)) return json({ error: "invalid-name" }, 400);
  if (!isValidBody(body)) return json({ error: "invalid-body" }, 400);
  if (authorUrl && !isValidAuthorUrl(authorUrl)) return json({ error: "invalid-url" }, 400);
  if (payload.rating !== undefined && payload.rating !== null && !isValidRating(rating)) {
    return json({ error: "invalid-rating" }, 400);
  }

  // reCAPTCHA
  const ip = getClientIp(req);
  const captcha = await verifyRecaptcha(recaptchaToken, env.RECAPTCHA_SECRET, ip);
  if (!captcha.ok) return json({ error: "recaptcha-failed", reason: captcha.reason }, 400);

  // Rate-limiting por hash de IP
  const ipHash = await hashIp(ip, env.IP_SALT);
  const recent = await countRecentByIp(env.DB, ipHash, RATE_LIMIT_WINDOW_MS);
  if (recent >= RATE_LIMIT_MAX) return json({ error: "rate-limited" }, 429);

  // Spam heurístico → marca 'spam' direto (não aparece nem fica pending para moderar).
  const isSpam = looksLikeSpam(body, name) || captcha.score < 0.3;
  const status: CommentRow["status"] = isSpam ? "spam" : "pending";

  const insert = await env.DB
    .prepare(
      `INSERT INTO comments (post_slug, author_name, author_url, body, rating, status, ip_hash, user_agent, lang)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      slug,
      name,
      authorUrl || null,
      body,
      payload.rating !== undefined && payload.rating !== null && isValidRating(rating) ? rating : null,
      status,
      ipHash,
      (req.headers.get("user-agent") ?? "").slice(0, 200),
      lang
    )
    .run();

  return json({ ok: true, pending: status === "pending", id: insert.meta?.last_row_id }, 202);
}

/** Moderação: aprovar / rejeitar / marcar spam. */
async function handleModerate(req: Request, env: Env, id: number, action: string): Promise<Response> {
  if (!requireAdmin(req, env)) return json({ error: "unauthorized" }, 401);
  const valid: Record<string, string> = { approve: "approved", reject: "rejected", spam: "spam" };
  const newStatus = valid[action];
  if (!newStatus) return json({ error: "invalid-action" }, 400);
  await env.DB.prepare("UPDATE comments SET status = ? WHERE id = ?").bind(newStatus, id).run();
  return json({ ok: true, id, status: newStatus });
}

async function handleAdminList(req: Request, env: Env, status: string): Promise<Response> {
  if (!requireAdmin(req, env)) return json({ error: "unauthorized" }, 401);
  const result = await env.DB
    .prepare("SELECT * FROM comments WHERE status = ? ORDER BY created_at DESC LIMIT 100")
    .bind(status)
    .all<CommentRow>();
  return json({ status, count: (result.results ?? []).length, comments: result.results ?? [] });
}

export default {
  async fetch(req: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    const method = req.method;
    const path = url.pathname;
    const origin = `${url.protocol}//${url.host}`;

    if (method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // /api/comments/:slug(.jsonld)?
    const commentMatch = path.match(/^\/api\/comments\/([a-z0-9-]+)(\.jsonld)?$/);
    if (commentMatch) {
      const slug = commentMatch[1];
      const isJsonld = commentMatch[2] === ".jsonld";
      if (isJsonld && method === "GET") {
        return await handleJsonld(env.DB, slug, `${origin}${path.replace(/\.jsonld$/, "")}`, url.searchParams.get("lang") ?? "pt");
      }
      if (method === "GET") return await handleList(env.DB, slug);
      if (method === "POST") return await handleCreate(req, env, slug);
      return json({ error: "method-not-allowed" }, 405);
    }

    // /api/admin/pending[?status=...]
    const adminListMatch = path.match(/^\/api\/admin\/(pending|approved|rejected|spam)$/);
    if (adminListMatch && method === "GET") {
      return await handleAdminList(req, env, adminListMatch[1]);
    }

    // /api/admin/:id/(approve|reject|spam)
    const modMatch = path.match(/^\/api\/admin\/(\d+)\/(approve|reject|spam)$/);
    if (modMatch && method === "POST") {
      return await handleModerate(req, env, Number(modMatch[1]), modMatch[2]);
    }

    // /api/health
    if (path === "/api/health") return json({ ok: true });

    // tudo o mais → assets (SPA)
    return env.ASSETS.fetch(req);
  },
};
