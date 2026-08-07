import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageContext";
import { type Language } from "@/i18n/translations";
import { useSEO } from "@/hooks/useSEO";
import { blogSchema, itemListSchema, BASE_URL } from "@/lib/seoSchemas";
import { formatDate, getPostsSorted } from "@/data/posts";

const Blog = () => {
  const { t, language, languagePath } = useLanguage();
  const lang = language as Language;
  const sortedPosts = getPostsSorted();
  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgDefault)}`;

  useSEO({
    title: t.blog.title,
    description: t.blog.subtitle,
    canonical: `${BASE_URL}${languagePath("blog")}`,
    lang: language,
    schema: [blogSchema(language), itemListSchema(language, sortedPosts)],
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
              {t.blog.tag}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground normal-case">
              {t.blog.title}
            </h1>
            <p className="mt-4 text-muted-foreground text-pretty max-w-2xl mx-auto">
              {t.blog.subtitle}
            </p>
          </motion.div>

          {sortedPosts.length === 0 ? (
            <div className="rounded-[20px] border border-border/70 bg-card/90 p-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
              <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={28} />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{t.blog.emptyTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto">
                {t.blog.emptyText}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                {t.blog.ctaWhats}
              </a>
            </div>
          ) : (
            <ul className="space-y-6">
              {sortedPosts.map((post, i) => (
                <motion.li
                  key={post.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={languagePath(`blog/${post.slug}`)}
                    className="group block rounded-[20px] border border-border/70 bg-card/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition-all hover:border-primary/50 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readingMinutes} {t.blog.minutesRead}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {post.title[lang]}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {post.excerpt[lang]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t.blog.readMore}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
