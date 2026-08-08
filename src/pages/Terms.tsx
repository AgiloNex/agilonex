import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import { legalPageSchema, breadcrumbSchema, BASE_URL } from "@/lib/seoSchemas";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Terms = () => {
  const { t, language, languagePath } = useLanguage();
  useSEO({
    title: t.terms.title,
    description: t.terms.subtitle,
    canonical: `${BASE_URL}${languagePath("termos-de-uso")}`,
    lang: language,
    schema: [
      legalPageSchema(language, "termos-de-uso", t.terms.title),
      breadcrumbSchema(language, [{ name: t.terms.title, path: languagePath("termos-de-uso") }]),
    ],
  });
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="container max-w-4xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
              {t.terms.tag}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground normal-case">
              {t.terms.title}
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
                  <BreadcrumbPage>{t.terms.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="mt-4 text-muted-foreground text-pretty">
              {t.terms.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {t.terms.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[20px] border border-border/70 bg-card/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
              >
                <h2 className="text-xl font-bold tracking-tight text-foreground normal-case">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            {t.terms.disclaimer}
          </p>

          <Link
            to={languagePath()}
            className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            {t.footer.backHome}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
