import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Lgpd = () => {
  const { t, languagePath } = useLanguage();
  return (
    <main className="min-h-screen bg-background py-20 md:py-28">
      <div className="container max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
            {t.lgpd.tag}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground normal-case">
            {t.lgpd.title}
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.lgpd.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.lgpd.sections.map((section) => (
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
          {t.lgpd.disclaimer}
        </p>

        <Link
          to={languagePath()}
          className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          {t.footer.backHome}
        </Link>
      </div>
    </main>
  );
};

export default Lgpd;
