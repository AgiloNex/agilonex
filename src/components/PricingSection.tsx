import { motion } from "framer-motion";
import { Check, Star, ShieldCheck, Lock, Headphones } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WHATSAPP_URL = "https://wa.me/5500000000000";

const PricingSection = () => {
  const { t } = useLanguage();
  const p = t.pricing;

  const anchor = p.plans.anchor;
  const main = p.plans.main;
  const basic = p.plans.basic;

  return (
    <section id="planos" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary">
            {p.tag}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {p.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">{p.subtitle}</p>
          <p
            className="mt-6 text-sm md:text-base text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: p.anchorIntro }}
          />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
          {/* ANCHOR — order 2 on mobile, 1 on desktop */}
          <article className="order-2 md:order-1 relative rounded-2xl border border-border bg-secondary p-7 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">{anchor.name}</h3>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground border border-border rounded-full px-2.5 py-1">
                {anchor.badge}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{anchor.subtitle}</p>
            <div className="mt-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  R$ {anchor.price}
                </span>
                <span className="text-sm text-muted-foreground">{anchor.period}</span>
              </div>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              {anchor.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-background transition-colors"
            >
              {anchor.cta}
            </a>
          </article>

          {/* MAIN — order 1 on mobile, 2 on desktop */}
          <article className="order-1 md:order-2 relative rounded-2xl bg-primary text-primary-foreground p-8 flex flex-col shadow-2xl md:scale-105 md:-my-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-3 py-1 text-[11px] font-bold tracking-wide uppercase shadow-md">
                <Star size={12} className="fill-current" /> {main.badge}
              </span>
            </div>

            <h3 className="text-2xl font-bold">{main.name}</h3>
            <p className="mt-1 text-sm opacity-80">{main.subtitle}</p>

            <div className="mt-6">
              <div className="text-sm line-through opacity-50">
                R$ {main.oldPrice}
                <span className="ml-1">{main.period}</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-5xl font-extrabold">R$ {main.price}</span>
                <span className="text-base opacity-80">{main.period}</span>
              </div>
            </div>

            <div className="mt-4 inline-flex self-start items-center gap-1.5 rounded-full bg-background/15 backdrop-blur px-3 py-1.5 text-xs font-semibold">
              💰 {main.savings}
            </div>

            <ul className="mt-6 space-y-3 flex-1">
              {main.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-md bg-background text-foreground px-4 py-3 text-sm font-bold hover:opacity-90 transition-opacity"
            >
              {main.cta}
            </a>
          </article>

          {/* BASIC */}
          <article className="order-3 relative rounded-2xl border border-border bg-card p-7 flex flex-col">
            <h3 className="text-xl font-bold text-foreground">{basic.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{basic.subtitle}</p>
            <div className="mt-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  R$ {basic.price}
                </span>
                <span className="text-sm text-muted-foreground">{basic.period}</span>
              </div>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              {basic.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              {basic.cta}
            </a>
          </article>
        </div>

        {/* Trust row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Lock size={16} className="text-primary" /> {p.trust.secure}
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" /> {p.trust.guarantee}
          </span>
          <span className="inline-flex items-center gap-2">
            <Headphones size={16} className="text-primary" /> {p.trust.support}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
