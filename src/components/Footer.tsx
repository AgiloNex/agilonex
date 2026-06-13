import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import logoMark from "@/assets/agilonex-logo-full.png";

const Footer = () => {
  const { t, languagePath } = useLanguage();
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <img src={logoMark} alt="AgiloNex" className="h-20 w-auto object-contain" />
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link to={languagePath("lgpd")} className="hover:text-foreground transition-colors">
              {t.footer.lgpd}
            </Link>
            <Link to={languagePath("termos-de-uso")} className="hover:text-foreground transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
