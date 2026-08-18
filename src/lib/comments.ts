/**
 * Tipos e helpers compartilhados entre o cliente e (opcionalmente) testes.
 * Mantidos aqui para que o componente CommentsSection possa importar
 * sem depender diretamente do Worker.
 */
export interface PublicComment {
  id: number;
  authorName: string;
  authorUrl: string | null;
  body: string;
  rating: number | null;
  createdAt: string;
  lang: string;
}

export interface CommentsResponse {
  slug: string;
  count: number;
  comments: PublicComment[];
}

export interface CreateCommentPayload {
  name: string;
  body: string;
  rating?: number | null;
  website?: string;
  lang: string;
  recaptchaToken: string;
}

export interface CreateCommentResult {
  ok: boolean;
  pending?: boolean;
  id?: number;
  error?: string;
  reason?: string;
}

const MAX_BODY_LENGTH = 280;
const MAX_NAME_LENGTH = 60;

export const validateName = (name: string): boolean => {
  const n = name.trim();
  return n.length >= 2 && n.length <= MAX_NAME_LENGTH;
};

export const validateBody = (body: string): boolean => {
  const b = body.trim();
  return b.length >= 3 && b.length <= MAX_BODY_LENGTH;
};

export const validateRating = (rating: unknown): rating is number =>
  typeof rating === "number" && Number.isInteger(rating) && rating >= 1 && rating <= 5;

export const validateWebsite = (url: string): boolean => {
  if (!url) return true;
  if (url.length > 200) return false;
  try {
    const u = new URL(url);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
};

/**
 * Escape de HTML do corpo do comentario (o Worker tambem ja stripa HTML,
 * mas nunca confiamos no servidor sozinho -- defence in depth). Depois
 * converte URLs soltas em <a> com rel="ugc nofollow noopener" -- exigencia
 * do guia SEO/UGC para qualquer link deixado por usuario.
 */
export const sanitizeComment = (raw: string): string => {
  const escaped = raw
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'");
  const withLinks = escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    return `<a href="${url}" rel="ugc nofollow noopener" target="_blank">${url}</a>`;
  });
  return withLinks;
};