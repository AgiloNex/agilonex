import { useState } from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageContext";
import { useComments } from "@/hooks/useComments";
import {
  sanitizeComment,
  validateBody,
  validateName,
  validateRating,
  validateWebsite,
  type CreateCommentResult,
} from "@/lib/comments";
import { getRecaptchaToken } from "@/lib/recaptcha";
import { commentSchema } from "@/lib/seoSchemas";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

const COMMENT_SCRIPT_ATTR = "data-seo-schema-comments";

const injectCommentSchema = (scriptId: string, content: Record<string, unknown>) => {
  document.querySelectorAll(`script[${COMMENT_SCRIPT_ATTR}]`).forEach((el) => {
    if (el.getAttribute("id") !== scriptId) el.remove();
  });
  const existing = document.getElementById(scriptId);
  if (existing) {
    existing.textContent = JSON.stringify(content);
    return;
  }
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.setAttribute(COMMENT_SCRIPT_ATTR, "true");
  el.id = scriptId;
  el.textContent = JSON.stringify(content);
  document.head.appendChild(el);
};

const formatDate = (iso: string, lang: string): string => {
  try {
    return new Intl.DateTimeFormat(lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const errorMsg = (result: CreateCommentResult, fallback: string): string => {
  switch (result.error) {
    case "rate-limited":
      return "commentsRateLimited";
    case "recaptcha-failed":
      return "commentsRecaptchaFailed";
    case "invalid-name":
      return "commentsInvalidName";
    case "invalid-body":
      return "commentsInvalidBody";
    default:
      return fallback;
  }
};

interface CommentsSectionProps {
  slug: string;
}

const CommentsSection = ({ slug }: CommentsSectionProps) => {
  const { t, language } = useLanguage();
  const { comments, loading, submit, reload } = useComments(slug, language);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Injeta/atualiza o JSON-LD `Comment` quando a lista muda — o Googlebot
  // pode ler via prerender ou rendering dinâmico; em produção, o Worker
  // também expõe /api/comments/:slug.jsonld para crawlers sem JS.
  useState(() => {});
  if (comments.length > 0) {
    injectCommentSchema(
      `comments-jsonld-${slug}`,
      commentSchema(language, slug, comments)
    );
  }

  const tc = t.comments;
  if (!tc) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    // Honeypot — bot preencheu; fingir sucesso sem persistir.
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!validateName(name)) {
      setFormError(tc.commentsInvalidName);
      return;
    }
    if (!validateBody(body)) {
      setFormError(tc.commentsInvalidBody);
      return;
    }
    if (website && !validateWebsite(website)) {
      setFormError(tc.commentsInvalidUrl);
      return;
    }
    if (rating !== "" && !validateRating(rating)) {
      setFormError(tc.commentsInvalidRating);
      return;
    }

    let token = "";
    if (RECAPTCHA_SITE_KEY) {
      try {
        token = await getRecaptchaToken(RECAPTCHA_SITE_KEY);
      } catch {
        setFormError(tc.commentsRecaptchaFailed);
        return;
      }
    }

    setSending(true);
    try {
      const result = await submit({
        name: name.trim(),
        body: body.trim(),
        rating: rating === "" ? null : rating,
        website: website.trim(),
        lang: language,
        recaptchaToken: token,
      });
      if (!result.ok) {
        setFormError(tc[errorMsg(result, tc.commentsError)] ?? tc.commentsError);
        return;
      }
      setSubmitted(true);
      setName("");
      setBody("");
      setWebsite("");
      setRating("");
      setFormError(null);
      reload();
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="comentarios" className="mt-16">
      <div className="rounded-[20px] border border-border/70 bg-card/80 p-6 md:p-8">
        <div className="mb-6 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            {tc.commentsTitle}
          </h2>
        </div>

        {/* Lista */}
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            {tc.commentsLoading}
          </div>
        ) : comments.length === 0 ? (
          <p className="py-6 text-sm text-muted-foreground">{tc.commentsEmpty}</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-border/60 bg-background/60 p-4"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">
                      {c.authorUrl ? (
                        <a
                          href={c.authorUrl}
                          rel="ugc nofollow noopener"
                          target="_blank"
                          className="hover:underline"
                        >
                          {c.authorName}
                        </a>
                      ) : (
                        c.authorName
                      )}
                    </span>
                    {c.rating !== null && (
                      <span
                        className="text-xs text-amber-500"
                        aria-label={tc.commentsRatingAria.replace("{value}", String(c.rating))}
                      >
                        {"\u2605".repeat(c.rating)}
                        {"\u2606".repeat(5 - c.rating)}
                      </span>
                    )}
                  </div>
                  <time
                    dateTime={c.createdAt}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDate(c.createdAt, language)}
                  </time>
                </div>
                <p
                  className="text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: sanitizeComment(c.body) }}
                />
              </li>
            ))}
          </ul>
        )}

        {/* Form */}
        {submitted ? (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-sm text-foreground">
            {tc.commentsSuccess}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="ml-2 text-primary hover:underline"
            >
              {tc.commentsWriteAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Honeypot */}
            <input
              type="text"
              name="website_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="comment-name">{tc.commentsNameLabel}</Label>
                <Input
                  id="comment-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  required
                  placeholder={tc.commentsNamePlaceholder}
                  className="border-border/70 bg-background/90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment-website">{tc.commentsWebsiteLabel}</Label>
                <Input
                  id="comment-website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={tc.commentsWebsitePlaceholder}
                  className="border-border/70 bg-background/90"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment-body">{tc.commentsBodyLabel}</Label>
              <Textarea
                id="comment-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                maxLength={280}
                required
                placeholder={tc.commentsBodyPlaceholder}
                className="border-border/70 bg-background/90"
              />
              <p className="text-xs text-muted-foreground">
                {tc.commentsCharsRemaining.replace("{n}", String(280 - body.length))}
              </p>
            </div>
            <div className="space-y-2">
              <Label>{tc.commentsRatingLabel}</Label>
              <div className="flex gap-1" role="radiogroup" aria-label={tc.commentsRatingLabel}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={rating === v}
                    aria-label={tc.commentsRatingAria.replace("{value}", String(v))}
                    onClick={() => setRating((prev) => (prev === v ? "" : v))}
                    className={`text-2xl transition-colors ${
                      rating !== "" && rating >= v
                        ? "text-amber-500"
                        : "text-muted-foreground hover:text-amber-400"
                    }`}
                  >
                    {"\u2605"}
                  </button>
                ))}
                {rating !== "" && (
                  <button
                    type="button"
                    onClick={() => setRating("")}
                    className="ml-2 text-xs text-muted-foreground hover:underline"
                  >
                    {tc.commentsClearRating}
                  </button>
                )}
              </div>
            </div>

            {formError && (
              <p className="text-sm text-red-500" role="alert">
                {formError}
              </p>
            )}

            <p className="text-xs text-muted-foreground">{tc.commentsUgcNotice}</p>

            <Button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {sending ? tc.commentsSending : tc.commentsSubmit}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
