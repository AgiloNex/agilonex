import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence , useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import logoMark from "@/assets/agilonex-logo-full.png";

const Header = () => {
  const shouldReduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const { t, language, languagePath } = useLanguage();
  const location = useLocation();
  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgDefault)}`;

  const basePath = `/${language}`;
  const isHomePage = location.pathname === basePath || location.pathname === `${basePath}/`;

  interface NavLink {
    label: string;
    to: string;
    isPage: boolean;
  }
  const navLinks: NavLink[] = [
    { label: t.nav.about, to: languagePath("sobre"), isPage: true },
    { label: t.nav.blog, to: languagePath("blog"), isPage: true },
    { label: t.nav.services, to: `${basePath}#servicos`, isPage: false },
    { label: t.nav.how, to: `${basePath}#como-funciona`, isPage: false },
    { label: t.nav.pricing, to: `${basePath}#planos`, isPage: false },
    { label: t.nav.portfolio, to: `${basePath}#portfolio`, isPage: false },
    { label: t.nav.contact, to: languagePath("contato"), isPage: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-24 md:h-28">
        <Link to={languagePath()} className="flex items-center" aria-label="AgiloNex">
          <img src={logoMark} alt="AgiloNex" className="h-20 md:h-24 w-auto object-contain" width="586" height="586" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.isPage) {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.to}
                href={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            );
          })}
          <LanguageSwitcher />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:shadow-lg transition-all duration-200"
          >
            {t.nav.cta}
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center p-2 text-foreground min-h-[44px] min-w-[44px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <nav className="container flex flex-col gap-4 py-6">
              {navLinks.map((link) => {
                if (link.isPage) {
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                );
              })}
              <LanguageSwitcher variant="mobile" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                {t.nav.cta}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
