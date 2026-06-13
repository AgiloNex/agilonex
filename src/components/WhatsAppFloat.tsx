import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WhatsAppFloat = () => {
  const { t } = useLanguage();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgDefault)}`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateMatch = () => setIsDesktop(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  useEffect(() => {
    if (!isDesktop || isTooltipDismissed) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (isDesktop && !isTooltipDismissed) {
        setIsTooltipOpen(true);
      }
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [isDesktop, isTooltipDismissed]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false);
        setIsTooltipDismissed(true);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-[60] md:bottom-6 md:right-6">
      <AnimatePresence>
        {isTooltipOpen && isDesktop && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 hidden md:block"
          >
            <div className="whitespace-nowrap rounded-2xl border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-2xl shadow-black/30">
              {t.whatsappFloat.tooltip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsappFloat.ariaLabel}
        onClick={() => {
          setIsTooltipOpen(false);
          setIsTooltipDismissed(true);
        }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-pulse" />
        <MessageCircle size={28} className="relative z-10" />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
