import { Globe, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

const options: { code: Language; flag: string; labelKey: "pt" | "en" | "es" }[] = [
  { code: "pt", flag: "🇧🇷", labelKey: "pt" },
  { code: "en", flag: "🇺🇸", labelKey: "en" },
  { code: "es", flag: "🇪🇸", labelKey: "es" },
];

interface Props {
  variant?: "header" | "mobile";
}

const LanguageSwitcher = ({ variant = "header" }: Props) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const triggerClass =
    variant === "header"
      ? "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors duration-200"
      : "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClass} aria-label={t.lang.label}>
        <Globe size={16} />
        <span className="uppercase">{language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.code}
            onClick={() => {
              setLanguage(opt.code);
              navigate(`/${opt.code}`);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-base">{opt.flag}</span>
            <span className="flex-1">{t.lang[opt.labelKey]}</span>
            {language === opt.code && <Check size={14} className="text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
