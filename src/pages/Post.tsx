import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { type Language } from "@/i18n/translations";
import { useSEO } from "@/hooks/useSEO";
import { blogPostingSchema, breadcrumbSchema, BASE_URL } from "@/lib/seoSchemas";
import { formatDate, getPostBySlug, type PostBlock } from "@/data/posts";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const renderBlock = (block: PostBlock, key: number) => {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 key={key} className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground">
          {block.text}
        </h2>
      ) : (
        <h3 key={key} className="mt-7 mb-3 text-lg font-semibold tracking-tight text-foreground">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p key={key} className="mb-5 text-base leading-relaxed text-muted-foreground text-pretty">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={key} className="mb-6 space-y-2 pl-5 list-disc text-base leading-relaxed text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={key} className="my-7 border-l-4 border-primary pl-5 italic text-foreground">
          <p className="text-lg">{block.text}</p>
          {block.cite && (
            <footer className="mt-2 text-sm not-italic text-muted-foreground">— {block.cite}</footer>
          )}
        </blockquote>
      );
    default:
      return null;
  }
};

const Post = () => {
  const { slug } = useParams();
  const { t, language, languagePath } = useLanguage();
  const lang = language as Language;
  const post = slug ? getPostBySlug(slug) : undefined;

  useSEO({
    title: post ? post.title[lang] : "Post não encontrado",
    description: post ? post.excerpt[lang] : t.blog.subtitle,
    canonical: post ? `${BASE_URL}${languagePath(`blog/${post.slug}`)}` : undefined,
    lang: language,
    ogType: "article",
    noIndex: !post,
    schema: post
      ? [
          blogPostingSchema(lang, post),
          breadcrumbSchema(lang, [
            { name: t.blog.title, path: "/blog" },
            { name: post.title[lang], path: `/blog/${post.slug}` },
          ]),
        ]
      : undefined,
  });

  useEffect(() => {
    if (post) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-24 pb-20">
          <div className="container max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-foreground">404</h1>
            <p className="mt-3 text-muted-foreground">Post não encontrado.</p>
            <Link
              to={languagePath("blog")}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <ArrowLeft size={16} />
              {t.blog.backToList}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(
    `${t.whatsapp.msgDefault} — ${post.title[lang]}`
  )}`;
  const shareUrl = `${BASE_URL}${languagePath(`blog/${post.slug}`)}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareTitle = encodeURIComponent(post.title[lang]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <article className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to={languagePath("blog")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              {t.blog.backToList}
            </Link>

            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} {t.blog.minutesRead}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground text-pretty">
              {post.title[lang]}
            </h1>
            <Breadcrumb className="mt-3">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={languagePath()}>AgiloNex</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={languagePath("blog")}>{t.nav.blog}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{post.title[lang]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="mt-3 text-sm text-muted-foreground">
              {t.blog.by} <span className="font-medium text-foreground">{post.author.name}</span>
            </p>
          </motion.div>

          <div className="mt-8 mb-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="space-y-0">
            {post.content[lang].map((block, i) => renderBlock(block, i))}
          </div>

          <footer className="mt-12 rounded-[20px] border border-border/70 bg-card/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
            <div className="mb-5">
              <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                {post.author.bio[lang]}
              </p>
              {post.author.url && (
                <a
                  href={post.author.url}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {t.nav.about}
                  <ArrowRight size={14} />
                </a>
              )}
            </div>

            <div className="border-t border-border/70 pt-5">
              <p className="mb-2 text-sm font-medium text-foreground">{t.blog.shareTitle}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href={`https://wa.me/?text=${encodedShareTitle}%20${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedShareTitle}&url=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  X / Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            {t.blog.ctaWhats}
          </a>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Post;
