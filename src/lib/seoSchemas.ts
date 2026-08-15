/**
 * Builders de Schema.org (JSON-LD) por tipo de página.
 *
 * São funções puras que retornam o objeto do schema — centralizam
 * identidade da marca (nome, URL, contatos, fundador) para que todas
 * as páginas emitam dados consistentes sem duplicação.
 */
import type { Post } from "@/data/posts";
import type { Review } from "@/data/reviews";
import { BEST_RATING, WORST_RATING, averageRating, reviewCount, reviews } from "@/data/reviews";
import type { Language } from "@/i18n/translations";
import { founder } from "@/lib/identity";

export const BASE_URL = "https://agilonex.com.br";
export const SITE_NAME = "AgiloNex";

const HOME_PATH: Record<Language, string> = {
  pt: "/pt",
  en: "/en",
  es: "/es",
};

const LOCALE: Record<Language, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

export const organizationSchema = () => ({
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "AgiloNex Tecnologia LTDA",
  url: BASE_URL,
  founder: {
    "@type": "Person",
    name: founder.fullName,
    jobTitle: founder.jobTitle,
    url: `${BASE_URL}/sobre`,
    sameAs: [founder.links.linkedin, founder.links.github],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: founder.location.city,
    addressRegion: founder.location.state,
    addressCountry: founder.location.country,
  },
  email: founder.email,
  sameAs: ["https://agilonex.com.br/sobre", founder.links.linkedin],
});

export const websiteSchema = (lang: Language) => ({
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website-${lang}`,
  url: `${BASE_URL}${HOME_PATH[lang]}`,
  name: `${SITE_NAME} (${LOCALE[lang]})`,
  inLanguage: LOCALE[lang],
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}${HOME_PATH[lang]}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const serviceSchema = (lang: Language) => ({
  "@type": "Service",
  serviceType: "Tecnologia, automação e desenvolvimento de apps",
  name: `${SITE_NAME} Soluções Digitais`,
  url: `${BASE_URL}${HOME_PATH[lang]}`,
  inLanguage: LOCALE[lang],
  provider: { "@id": `${BASE_URL}/#organization` },
  areaServed: ["BR"],
});

export const aboutPageSchema = (lang: Language) => ({
  "@type": "AboutPage",
  "@id": `${BASE_URL}${HOME_PATH[lang]}/sobre`,
  url: `${BASE_URL}${HOME_PATH[lang]}/sobre`,
  inLanguage: LOCALE[lang],
  mainEntity: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
  },
});

export const contactPageSchema = (lang: Language) => ({
  "@type": "ContactPage",
  "@id": `${BASE_URL}${HOME_PATH[lang]}/contato`,
  url: `${BASE_URL}${HOME_PATH[lang]}/contato`,
  inLanguage: LOCALE[lang],
  mainEntity: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    email: "contato@agilonex.com.br",
  },
});

export const collectionPageSchema = (lang: Language, slug: string, name: string) => ({
  "@type": "CollectionPage",
  "@id": `${BASE_URL}${HOME_PATH[lang]}/cases${slug ? `/${slug}` : ""}`,
  url: `${BASE_URL}${HOME_PATH[lang]}/cases${slug ? `/${slug}` : ""}`,
  name,
  inLanguage: LOCALE[lang],
  isPartOf: { "@id": `${BASE_URL}/#website-${lang}` },
});

export const blogSchema = (lang: Language) => ({
  "@type": "Blog",
  "@id": `${BASE_URL}${HOME_PATH[lang]}/blog`,
  url: `${BASE_URL}${HOME_PATH[lang]}/blog`,
  inLanguage: LOCALE[lang],
  publisher: { "@id": `${BASE_URL}/#organization` },
});

export const itemListSchema = (lang: Language, posts: Post[]) => ({
  "@type": "ItemList",
  itemListElement: posts.map((post, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE_URL}${HOME_PATH[lang]}/blog/${post.slug}`,
    name: post.title[lang],
  })),
});

export const blogPostingSchema = (lang: Language, post: Post) => ({
  "@type": "BlogPosting",
  "@id": `${BASE_URL}${HOME_PATH[lang]}/blog/${post.slug}`,
  url: `${BASE_URL}${HOME_PATH[lang]}/blog/${post.slug}`,
  headline: post.title[lang],
  description: post.excerpt[lang],
  datePublished: `${post.publishedAt}T00:00:00-03:00`,
  dateModified: `${post.publishedAt}T00:00:00-03:00`,
  inLanguage: LOCALE[lang],
  author: {
    "@type": "Person",
    name: post.author.name,
    url: post.author.url ?? `${BASE_URL}/sobre`,
    sameAs: [founder.links.linkedin, founder.links.github],
  },
  publisher: { "@id": `${BASE_URL}/#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}${HOME_PATH[lang]}/blog/${post.slug}`,
  },
  keywords: post.tags.join(", "),
  wordCount: post.content[lang].reduce((acc, b) => {
    if (b.type === "paragraph" || b.type === "heading") return acc + b.text.split(/\s+/).length;
    if (b.type === "list") return acc + b.items.reduce((s, i) => s + i.split(/\s+/).length, 0);
    if (b.type === "quote") return acc + b.text.split(/\s+/).length;
    return acc;
  }, 0),
});

export const breadcrumbSchema = (
  lang: Language,
  items: { name: string; path: string }[]
) => {
  const list = [{ name: SITE_NAME, path: HOME_PATH[lang] }, ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
};

export const faqSchema = (
  lang: Language,
  items: { question: string; answer: string }[]
) => ({
  "@type": "FAQPage",
  "@id": `${BASE_URL}${HOME_PATH[lang]}#faq`,
  inLanguage: LOCALE[lang],
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const legalPageSchema = (lang: Language, slug: string, name: string) => ({
  "@type": "WebPage",
  "@id": `${BASE_URL}${HOME_PATH[lang]}/${slug}`,
  url: `${BASE_URL}${HOME_PATH[lang]}/${slug}`,
  name,
  inLanguage: LOCALE[lang],
  publisher: { "@id": `${BASE_URL}/#organization` },
});

/**
 * Schema `AggregateRating` referente aos depoimentos exibidos na home.
 *
 * Segundo as diretrizes do Google, o `AggregateRating` só gera rich
 * snippet (estrelas na SERP) quando o item avaliado (`itemReviewed`)
 * é um `Service`, `Product`, `Organization` etc. válido e quando as
 * avaliações individuais também estão marcadas com `Review`. Por isso
 * este builder é sempre acompanhado de `reviewsSchema()` na mesma
 * página (ver `Index.tsx`).
 */
export const aggregateRatingSchema = () => ({
  "@type": "AggregateRating",
  "@id": `${BASE_URL}/#aggregate-rating`,
  ratingValue: averageRating(),
  reviewCount: reviewCount(),
  bestRating: BEST_RATING,
  worstRating: WORST_RATING,
  itemReviewed: { "@id": `${BASE_URL}/#organization` },
});

/**
 * Schema `Review` individual — um por depoimento exibido na página.
 *
 * O `author` é a `Person` citada no depoimento (nome + cargo), e o
 * `itemReviewed` aponta para a `Organization` avaliada. Os campos
 * `reviewBody`, `datePublished`, `reviewRating` e `inLanguage` são os
 * que o Google lê para Validar o rich snippet.
 */
export const reviewSchema = (lang: Language, review: Review) => ({
  "@type": "Review",
  "@id": `${BASE_URL}/#review-${review.id}`,
  inLanguage: LOCALE[lang],
  author: {
    "@type": "Person",
    name: review.author[lang],
    description: review.role[lang],
  },
  itemReviewed: { "@id": `${BASE_URL}/#organization` },
  reviewRating: {
    "@type": "Rating",
    ratingValue: review.ratingValue,
    bestRating: BEST_RATING,
    worstRating: WORST_RATING,
  },
  datePublished: review.datePublished,
  reviewBody: review.text[lang],
});

/**
 * Conjunto de esquemas `Review` para todos os depoimentos. Inclui o
 * `aggregateRatingSchema()` ao final, já que ambos devem coexistir na
 * mesma página para gerar as estrelas na SERP.
 */
export const reviewsSchema = (lang: Language) => [
  ...reviews.map((review) => reviewSchema(lang, review)),
  aggregateRatingSchema(),
];
