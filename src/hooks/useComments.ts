import { useEffect, useState } from "react";
import type { CommentsResponse, CreateCommentPayload, CreateCommentResult } from "@/lib/comments";

const API_URL = import.meta.env.VITE_COMMENTS_API_URL || "";

const buildUrl = (path: string): string => {
  if (API_URL) {
    const base = API_URL.replace(/\/$/, "");
    return `${base}${path}`;
  }
  return path;
};

export const useComments = (slug: string, lang: string) => {
  const [comments, setComments] = useState<CommentsResponse["comments"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(buildUrl(`/api/comments/${encodeURIComponent(slug)}`), {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`http-${res.status}`);
      const data = (await res.json()) as CommentsResponse;
      setComments(data.comments ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "load-failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const submit = async (payload: CreateCommentPayload): Promise<CreateCommentResult> => {
    try {
      const res = await fetch(buildUrl(`/api/comments/${encodeURIComponent(slug)}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 429) return { ok: false, error: "rate-limited" };
      const data = (await res.json()) as CreateCommentResult;
      return data;
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "network" };
    }
  };

  return { comments, loading, error, submit, reload: load };
};
