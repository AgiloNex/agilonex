import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Settings2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  acceptAllConsent,
  readCookieConsent,
  rejectNonEssentialConsent,
  type CookieConsentCategories,
  writeCookieConsent,
} from "@/lib/cookieConsent";

const CookieConsent = () => {
  const { t, languagePath } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [preferences, setPreferences] = useState<Omit<CookieConsentCategories, "necessary">>({
    functionality: false,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const saved = readCookieConsent();
    if (saved) {
      setPreferences({
        functionality: saved.functionality,
        analytics: saved.analytics,
        advertising: saved.advertising,
      });
      return;
    }
    setShowBanner(true);
  }, []);

  const persist = (consent: CookieConsentCategories) => {
    writeCookieConsent(consent);
    setPreferences({
      functionality: consent.functionality,
      analytics: consent.analytics,
      advertising: consent.advertising,
    });
    setShowBanner(false);
    setShowPanel(false);
  };

  const closePanel = () => {
    setShowPanel(false);
    if (!readCookieConsent()) {
      setShowBanner(true);
    }
  };

  const handleAcceptAll = () => {
    const saved = acceptAllConsent();
    setPreferences({
      functionality: saved.functionality,
      analytics: saved.analytics,
      advertising: saved.advertising,
    });
    setShowBanner(false);
    setShowPanel(false);
  };

  const handleRejectAll = () => {
    const saved = rejectNonEssentialConsent();
    setPreferences({
      functionality: saved.functionality,
      analytics: saved.analytics,
      advertising: saved.advertising,
    });
    setShowBanner(false);
    setShowPanel(false);
  };

  const handleSavePreferences = () =>
    persist({
      necessary: true,
      ...preferences,
    });

  const openPanel = () => {
    const saved = readCookieConsent();
    if (saved) {
      setPreferences({
        functionality: saved.functionality,
        analytics: saved.analytics,
        advertising: saved.advertising,
      });
    }
    setShowBanner(false);
    setShowPanel(true);
  };

  const categories = [
    { key: "necessary" as const, locked: true },
    { key: "functionality" as const, locked: false },
    { key: "analytics" as const, locked: false },
    { key: "advertising" as const, locked: false },
  ];

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        aria-label={t.cookieConsent.buttonLabel}
        className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-full border border-border/70 bg-card/95 px-4 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-card md:bottom-6 md:left-6"
      >
        <Cookie size={16} className="text-primary" />
        {t.cookieConsent.buttonLabel}
      </button>

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-[70] p-4 md:p-6"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-card/95 p-5 shadow-2xl backdrop-blur-md md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl space-y-2">
                  <h2 className="text-base font-semibold text-foreground">{t.cookieConsent.bannerTitle}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.cookieConsent.bannerText}{" "}
                    <Link to={languagePath("politica-de-cookies")} className="text-primary hover:underline">
                      {t.cookieConsent.cookiePolicyLink}
                    </Link>{" "}
                    {t.cookieConsent.and}{" "}
                    <Link to={languagePath("lgpd")} className="text-primary hover:underline">
                      {t.cookieConsent.privacyLink}
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
                  <Button onClick={handleAcceptAll} className="w-full sm:w-auto">
                    {t.cookieConsent.acceptAll}
                  </Button>
                  <Button variant="outline" onClick={handleRejectAll} className="w-full sm:w-auto">
                    {t.cookieConsent.rejectAll}
                  </Button>
                  <Button variant="secondary" onClick={openPanel} className="w-full sm:w-auto">
                    <Settings2 size={16} />
                    {t.cookieConsent.customize}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPanel && (
          <>
            <motion.button
              type="button"
              aria-label={t.cookieConsent.close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/60"
              onClick={closePanel}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-h-[85vh] max-w-lg overflow-y-auto rounded-2xl border border-border/70 bg-card p-5 shadow-2xl md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{t.cookieConsent.panelTitle}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{t.cookieConsent.panelSubtitle}</p>
                </div>
                <button
                  type="button"
                  aria-label={t.cookieConsent.close}
                  onClick={closePanel}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {categories.map(({ key, locked }) => {
                  const category = t.cookieConsent.categories[key];
                  const checked = key === "necessary" ? true : preferences[key];

                  return (
                    <div
                      key={key}
                      className="flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-background/60 p-4"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{category.title}</p>
                        <p className="text-xs leading-relaxed text-muted-foreground">{category.description}</p>
                        {locked && (
                          <p className="text-xs font-medium text-primary">{t.cookieConsent.alwaysOn}</p>
                        )}
                      </div>
                      <Switch
                        checked={checked}
                        disabled={locked}
                        onCheckedChange={(value) => {
                          if (key === "necessary") return;
                          setPreferences((current) => ({ ...current, [key]: value }));
                        }}
                        aria-label={category.title}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button onClick={handleSavePreferences} className="flex-1">
                  {t.cookieConsent.save}
                </Button>
                <Button variant="outline" onClick={handleAcceptAll} className="flex-1">
                  {t.cookieConsent.acceptAll}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
