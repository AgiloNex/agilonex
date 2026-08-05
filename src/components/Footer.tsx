import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import logoMark from "@/assets/agilonex-logo-full.png";

const Footer = () => {
  const { t, languagePath } = useLanguage();
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <img src={logoMark} alt="AgiloNex" className="h-20 w-auto object-contain" width="586" height="586" />
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="flex items-center gap-4">
              <Link to={languagePath("sobre")} className="hover:text-foreground transition-colors">
                {t.nav.about}
              </Link>
              <Link to={languagePath("contato")} className="hover:text-foreground transition-colors">
                {t.nav.contact}
              </Link>
              <Link to={languagePath("privacidade")} className="hover:text-foreground transition-colors">
                {t.privacyPolicy.title}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to={languagePath("lgpd")} className="hover:text-foreground transition-colors">
                {t.footer.lgpd}
              </Link>
              <Link to={languagePath("termos-de-uso")} className="hover:text-foreground transition-colors">
                {t.footer.terms}
              </Link>
              <Link to={languagePath("politica-de-cookies")} className="hover:text-foreground transition-colors">
                {t.footer.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
