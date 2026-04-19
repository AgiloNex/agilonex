import { Brain, Cpu, LayoutDashboard, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Brain, Cpu, LayoutDashboard, ShieldCheck];

const ServicesSection = () => {
  const { t } = useLanguage();
  return (
    <section id="servicos" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t.services.tag}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.services.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative bg-card p-8 rounded-[20px] shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-pretty">{service.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 flex items-center text-sm font-medium text-primary hover:text-accent transition-colors duration-200">
                  {t.services.learnMore}
                  <ArrowRight size={14} className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
