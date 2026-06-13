import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const FAQSection = () => {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgDefault)}`;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
            {t.faq.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-[20px] border border-border/70 bg-card/80 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.02] md:px-6"
                >
                  <span className="text-base font-semibold tracking-tight text-foreground">
                    {item.question}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-transform duration-200">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6">
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground shadow-lg shadow-[#25D366]/15 transition-all duration-200 hover:opacity-90"
          >
            {t.faq.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
