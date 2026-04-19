import { motion } from "framer-motion";
import { Search, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Search, Code2, Rocket];
const nums = ["01", "02", "03"];

const HowItWorksSection = () => {
  const { t } = useLanguage();
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t.how.tag}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.how.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] border-t-2 border-dashed border-border" />

          {t.how.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={nums[i]}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-6 relative z-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={32} />
                  <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {nums[i]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground text-pretty max-w-xs mx-auto">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
