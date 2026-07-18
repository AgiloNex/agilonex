import { motion } from "framer-motion";
import { Target, Lightbulb, Handshake } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Target, Lightbulb, Handshake];

const About = () => {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-background py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {t.about.tag}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.about.title}
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.about.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-pretty">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default About;