import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language, type TranslationShape } from "./translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationShape;
  languagePath: (path?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const HTML_LANG_MAP: Record<Language, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

const STORAGE_KEY = "agilo-nex-language";

const isLanguage = (value: string): value is Language => ["pt", "en", "es"].includes(value);

export const getLanguageFromPath = (pathname: string): Language | null => {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLanguage(segment) ? segment : null;
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "pt";
  const fromPath = getLanguageFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && isLanguage(stored)) return stored;
  const browser = window.navigator.language.toLowerCase();
  if (browser.startsWith("en")) return "en";
  if (browser.startsWith("es")) return "es";
  return "pt";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG_MAP[language];
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const languagePath = (path = "") => `/${language}${path.startsWith("/") ? path : path ? `/${path}` : ""}`;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], languagePath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
