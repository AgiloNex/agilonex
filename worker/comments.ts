/**
 * Lógica de comentários do Worker: validação, sanitização,
 * verificação reCAPTCHA, rate-limiting e moderação.
 *
 * Tudo o que aqui trata de input de usuário segue o guia SEO/UGC:
 * - comentários só ficam públicos após moderação (status='approved')
 * - links deixados pelos usuários recebem rel="ugc nofollow" no render
 * - reCAPTCHA v3 + honeypot + rate-limit barram spam automatizado
 */
export const MAX_BODY_LENGTH = 280;
export const MAX_NAME_LENGTH = 60;
export const MAX_AUTHOR_URL_LENGTH = 200;
export const RATE_LIMIT_MAX = 3; // submissions
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos

export type CommentStatus = "pending" | "approved" | "spam" | "rejected";

export interface CommentRow {
  id: number;
  post_slug: string;
  author_name: string;
  author_url: string | null;
  body: string;
  rating: number | null;
  status: CommentStatus;
  created_at: string;
  lang: string;
}

export interface PublicComment {
  id: number;
  authorName: string;
  authorUrl: string | null;
  body: string;
  rating: number | null;
  createdAt: string;
  lang: string;
}

export const toPublic = (row: CommentRow): PublicComment => ({
  id: row.id,
  authorName: row.author_name,
  authorUrl: row.author_url,
  body: row.body,
  rating: row.rating,
  createdAt: row.created_at,
  lang: row.lang,
});

/** Hash SHA-256 hex do IP (nunca guardamos o IP em claro). */
export async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const SLUG_RE = /^[a-z0-9-]+$/;
export const isValidSlug = (slug: string): boolean =>
  typeof slug === "string" && slug.length > 0 && slug.length <= 120 && SLUG_RE.test(slug);

export const isValidName = (name: string): boolean => {
  const n = name.trim();
  return n.length >= 2 && n.length <= MAX_NAME_LENGTH;
};

export const isValidBody = (body: string): boolean => {
  const b = body.trim();
  return b.length >= 3 && b.length <= MAX_BODY_LENGTH;
};

export const isValidRating = (rating: unknown): rating is number =>
  typeof rating === "number" && Number.isInteger(rating) && rating >= 1 && rating <= 5;

/** Valida uma URL de website deixada pelo usuário (http/https apenas). */
export const isValidAuthorUrl = (url: string): boolean => {
  if (!url) return true; // opcional
  if (url.length > MAX_AUTHOR_URL_LENGTH) return false;
  try {
    const u = new URL(url);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
};

/**
 * Remove qualquer HTML do corpo do comentário. A renderização segura
 * (escape + linkificação com rel="ugc nofollow") acontece no cliente,
 * mas também garantimos aqui que nada de HTML cru chegue ao banco.
 */
export const stripHtml = (raw: string): string =>
  raw
    .replace(/<[^>]*>/g, "") // remove tags
    .replace(/&[#a-zA-Z0-9]+;/g, "") // remove entities
    .trim();

/** Conta submissões de um ip_hash em uma janela de tempo. */
export async function countRecentByIp(
  db: D1Database,
  ipHash: string,
  windowMs: number
): Promise<number> {
  const since = new Date(Date.now() - windowMs).toISOString();
  const result = await db
    .prepare("SELECT COUNT(*) as n FROM comments WHERE ip_hash = ? AND created_at >= ?")
    .bind(ipHash, since)
    .first<{ n: number }>();
  return result?.n ?? 0;
}

/** Verifica token reCAPTCHA v3 via API do Google; rejeita score < 0.5. */
export async function verifyRecaptcha(
  token: string,
  secret: string,
  remoteIp: string
): Promise<{ ok: boolean; score: number; reason?: string }> {
  if (!token) return { ok: false, score: 0, reason: "missing-token" };
  if (!secret) return { ok: false, score: 0, reason: "missing-secret" };

  const params = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  });

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      "error-codes"?: string[];
    };
    if (!data.success) return { ok: false, score: 0, reason: "google-rejected" };
    const score = data.score ?? 0;
    return score >= 0.5
      ? { ok: true, score }
      : { ok: false, score, reason: "low-score" };
  } catch {
    return { ok: false, score: 0, reason: "fetch-error" };
  }
}

/** Checagem simples de spam heurística por palavras/links conhecidos. */
const SPAM_PATTERNS = [
  /\bviagra\b/i,
  /\bcasino\b/i,
  /\bpayday\s*loan\b/i,
  /https?:\/\/\S+/gi, // muitos links podem indicar spam (verificado por contagem)
];

export const looksLikeSpam = (body: string, name: string): boolean => {
  const text = `${name} ${body}`;
  const linkCount = (text.match(/https?:\/\/\S+/gi) ?? []).length;
  if (linkCount > 3) return true;
  for (const pat of SPAM_PATTERNS) {
    if (pat === /https?:\/\/\S+/gi) continue;
    if (pat.test(text)) return true;
  }
  return false;
};
