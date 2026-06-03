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

const getInitialLanguage = (): Language => {
  return "pt";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG_MAP[language];
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const languagePath = (path = "") => `${path.startsWith("/") ? path : path ? `/${path}` : ""}`;

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
