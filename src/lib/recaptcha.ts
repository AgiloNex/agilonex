/**
 * Carrega o script do reCAPTCHA v3 uma única vez e resolve com o
 * `grecaptcha` já disponível. Usado por CommentsSection para obter o
 * token enviado ao Worker.
 */
let loaded: Promise<void> | null = null;

export const loadRecaptcha = (siteKey: string): Promise<void> => {
  if (typeof window === "undefined") return Promise.reject(new Error("no-window"));
  if (loaded) return loaded;
  loaded = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loaded = null;
      reject(new Error("recaptcha-load-failed"));
    };
    document.head.appendChild(script);
  });
  return loaded;
};

export const getRecaptchaToken = async (siteKey: string): Promise<string> => {
  await loadRecaptcha(siteKey);
  const g = (window as Record<string, unknown>).grecaptcha as {
    execute: (key: string, opts: { action: string }) => Promise<string>;
  } | undefined;
  if (!g || typeof g.execute !== "function") {
    throw new Error("recaptcha-not-available");
  }
  return g.execute(siteKey, { action: "comment" });
};
