import { motion } from "framer-motion";
import { ShieldCheck, BrainCircuit, BarChart3, Code, Play, ExternalLink, Plane, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [ShieldCheck, BrainCircuit, BarChart3];
const ctaIcons = [Code, Play, ExternalLink];
const accents = [
  "from-primary to-accent",
  "from-accent to-primary",
  "from-primary to-[hsl(var(--whatsapp))]",
];

const PortfolioSection = () => {
  const { t } = useLanguage();
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-foreground text-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider mb-3 text-primary">
            {t.portfolio.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            {t.portfolio.title}
          </h2>
          <p className="mt-4 text-background/60 text-pretty">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Featured project: Agilo Milhas */}
        <motion.a
          href="https://agilo-miles.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative block mb-10 rounded-[24px] border border-primary/30 bg-gradient-to-br from-primary/15 via-background/5 to-accent/10 backdrop-blur-sm p-8 md:p-10 overflow-hidden hover:border-primary/60 transition-all duration-300"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="relative grid md:grid-cols-[auto,1fr,auto] items-center gap-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary shrink-0">
              <Plane size={32} />
            </div>

            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                ★ {t.portfolio.featuredLabel}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                {t.portfolio.featured.name}
              </h3>
              <p className="mt-1 text-base text-background/80 font-medium">
                {t.portfolio.featured.title}
              </p>
              <p className="mt-3 text-sm text-background/60 leading-relaxed max-w-2xl">
                {t.portfolio.featured.description}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground group-hover:gap-3 transition-all shrink-0">
              {t.portfolio.featured.cta}
              <ArrowUpRight size={16} />
            </div>
          </div>
        </motion.a>

        <div className="grid md:grid-cols-3 gap-6">
          {t.portfolio.projects.map((p, i) => {
            const Icon = icons[i];
            const CtaIcon = ctaIcons[i];
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="group relative rounded-[20px] border border-background/10 bg-background/5 backdrop-blur-sm p-8 flex flex-col hover:bg-background/10 transition-colors duration-300"
              >
                <div
                  className={`absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r ${accents[i]} opacity-60 group-hover:opacity-100 transition-opacity`}
                />

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon size={24} />
                </div>

                <span className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-2">
                  {p.name}
                </span>
                <h3 className="text-lg font-semibold tracking-tight leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm text-background/55 leading-relaxed flex-1">{p.description}</p>

                <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-200 self-start">
                  <CtaIcon size={14} />
                  {p.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
