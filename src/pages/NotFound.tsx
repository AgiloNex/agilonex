import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useSEO({
    title: "404 — Página não encontrada",
    description: "A página que você procurou não foi encontrada.",
    lang: language,
    noIndex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t.notFound.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.notFound.subtitle}</p>
        <Link to={languagePath()} className="text-primary underline hover:text-primary/90">
          {t.notFound.link}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
