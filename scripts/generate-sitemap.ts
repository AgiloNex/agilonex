/**
 * Gera sitemap.xml e robots.txt dinamicamente a partir das fontes de dados
 * do projeto (rotas do React Router + posts em src/data/posts).
 *
 * Executado automaticamente pelo `npm run build` antes do `vite build`.
 * Escreve os arquivos em `public/` para que o Vite os copie para `dist/`.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { posts } from "../src/data/posts";

const SITE_URL = process.env.VITE_SITE_URL || "https://agilonex.com.br";
const LANGUAGES = ["pt", "en", "es"] as const;
const PUBLIC_DIR = resolve(process.cwd(), "public");

type PageDef = {
  /** Segmento da URL após /:lang. "" = home. */
  segment: string;
  /** Frequência de mudança esperada. */
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Prioridade relativa 0..1 (apenas um sinal, não peso oficial). */
  priority: number;
};

const STATIC_PAGES: PageDef[] = [
  { segment: "", changefreq: "weekly", priority: 1.0 },
  { segment: "sobre", changefreq: "monthly", priority: 0.8 },
  { segment: "contato", changefreq: "monthly", priority: 0.8 },
  { segment: "cases", changefreq: "weekly", priority: 0.8 },
  { segment: "cases/barbershop", changefreq: "monthly", priority: 0.6 },
  { segment: "blog", changefreq: "weekly", priority: 0.9 },
  { segment: "privacidade", changefreq: "yearly", priority: 0.3 },
  { segment: "lgpd", changefreq: "yearly", priority: 0.3 },
  { segment: "termos-de-uso", changefreq: "yearly", priority: 0.3 },
  { segment: "politica-de-cookies", changefreq: "yearly", priority: 0.3 },
];

const HREFLANG_BY_LANG: Record<(typeof LANGUAGES)[number], string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

const lastMod = () => new Date().toISOString().slice(0, 10);

const generateSitemap = () => {
  const urlBlocks: string[] = [];

  for (const lang of LANGUAGES) {
    for (const page of STATIC_PAGES) {
      const isHome = page.segment === "";
      const loc = `${SITE_URL}/${lang}${isHome ? "" : "/" + page.segment}`;
      const lines: string[] = [
        `  <url>`,
        `    <loc>${loc}</loc>`,
      ];
      if (isHome) {
        lines.push(`    <lastmod>${lastMod()}</lastmod>`);
      }
      lines.push(
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${lang === "pt" ? page.priority : Math.max(0, +(page.priority - 0.1).toFixed(1))}</priority>`
      );
      if (isHome) {
        for (const l of LANGUAGES) {
          lines.push(
            `    <xhtml:link rel="alternate" hreflang="${HREFLANG_BY_LANG[l]}" href="${SITE_URL}/${l}" />`
          );
        }
      }
      lines.push(`  </url>`);
      urlBlocks.push(lines.join("\n"));
    }

    for (const post of posts) {
      const loc = `${SITE_URL}/${lang}/blog/${post.slug}`;
      urlBlocks.push(
        [
          `  <url>`,
          `    <loc>${loc}</loc>`,
          `    <lastmod>${post.publishedAt}</lastmod>`,
          `    <changefreq>yearly</changefreq>`,
          `    <priority>${lang === "pt" ? 0.7 : 0.6}</priority>`,
          `  </url>`,
        ].join("\n")
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlBlocks.join("\n")}
</urlset>
`;
};

const generateRobots = () => `User-agent: Googlebot
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const safeWrite = (relPath: string, content: string) => {
  const abs = resolve(PUBLIC_DIR, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content, "utf-8");
  process.stdout.write(`[sitemap] gerado: ${relPath} (${content.length} bytes)\n`);
};

export const main = () => {
  safeWrite("sitemap.xml", generateSitemap());
  safeWrite("robots.txt", generateRobots());
};

main();
