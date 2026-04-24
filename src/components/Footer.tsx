import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground tracking-tight">
          Agilo<span className="text-primary">Nex</span>
        </p>
        <p>© {new Date().getFullYear()} {t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
