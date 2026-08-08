import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ChatDemo from "./ChatDemo";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgDefault)}`;
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-dots opacity-50" />
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-balance text-foreground">
              {t.hero.title1}{" "}
              <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-[55ch] text-pretty">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-lg transition-all duration-200"
              >
                {t.hero.ctaWhats}
                <ArrowRight size={16} />
              </a>
              <Link
                to={{ hash: "#servicos" }}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors duration-200"
              >
                {t.hero.ctaServices}
              </Link>
            </div>
          </motion.div>

          <div className="hidden md:block relative">
            <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            
            <ChatDemo />
            
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground/80 max-w-[320px] mx-auto text-pretty">
                Experimente na prática nossa <strong className="font-medium text-foreground">automação com IA</strong> simulada. Transforme seu <strong>WhatsApp</strong> em uma máquina de <strong>marketing digital</strong> e descubra como nossas <strong>soluções digitais</strong> podem escalar suas vendas.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
