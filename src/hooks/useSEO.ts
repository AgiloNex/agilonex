import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  lang?: string;
  noIndex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = "AgiloNex";
const BASE_URL = "https://agilonex.com.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

function setOrCreate(selector: string, attrs: Record<string, string>) {
  let el = document.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => {
      if (k !== "content") el!.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  if (attrs.content !== undefined) el.setAttribute("content", attrs.content);
}

function setOrCreateLink(rel: string, attrs: Record<string, string>) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function removeSchemas() {
  document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
}

function injectSchema(schema: Record<string, unknown> | Record<string, unknown>[]) {
  removeSchemas();
  const schemas = Array.isArray(schema) ? schema : [schema];
  schemas.forEach((s) => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-schema", "true");
    el.textContent = JSON.stringify(s);
    document.head.appendChild(el);
  });
}

/**
 * Hook para injetar meta tags de SEO dinamicamente por página/idioma.
 * Alternativa a react-helmet-async sem dependência externa.
 */
export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  lang = "pt",
  noIndex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    // Title
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Lang attribute
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : lang);

    // Meta description
    setOrCreate('meta[name="description"]', {
      name: "description",
      content: description,
    });

    // Canonical
    if (canonical) {
      setOrCreateLink("canonical", { rel: "canonical", href: canonical });
    }

    // Robots
    setOrCreate('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });

    // Open Graph
    setOrCreate('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    setOrCreate('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    setOrCreate('meta[property="og:type"]', {
      property: "og:type",
      content: ogType,
    });
    setOrCreate('meta[property="og:image"]', {
      property: "og:image",
      content: ogImage,
    });
    setOrCreate('meta[property="og:locale"]', {
      property: "og:locale",
      content: lang === "pt" ? "pt_BR" : lang === "en" ? "en_US" : "es_ES",
    });

    // Twitter Card
    setOrCreate('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });
    setOrCreate('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    setOrCreate('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: ogImage,
    });

    // Schema.org
    if (schema) {
      injectSchema(schema);
    } else {
      removeSchemas();
    }
  }, [title, description, canonical, ogImage, ogType, lang, noIndex, schema]);
}
