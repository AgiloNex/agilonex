import { motion , useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const CtaSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgDefault)}`;
  return (
    <section className="py-20 md:py-28 bg-foreground">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-background">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-background/70 text-pretty">
            {t.cta.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground hover:opacity-90 transition-opacity duration-200"
            >
              <MessageCircle size={18} />
              {t.cta.whats}
            </a>
            <Link
              to={{ hash: "#contato" }}
              className="inline-flex items-center gap-2 rounded-md border border-background/20 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10 transition-colors duration-200"
            >
              {t.cta.quote}
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
