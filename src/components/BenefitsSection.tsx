import { motion , useReducedMotion } from "framer-motion";
import { Clock, Ban, FolderKanban, Lock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Clock, Ban, FolderKanban, Lock];

const BenefitsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t.benefits.tag}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.benefits.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.benefits.items.map((b, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card p-6 rounded-[20px] shadow-card text-center"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{b.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
