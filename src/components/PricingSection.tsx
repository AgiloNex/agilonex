import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Crown, Headphones, Lock, ShieldCheck, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

type BillingCycle = "monthly" | "annual";

const plans = [
  {
    key: "starter",
    icon: "⚡",
    monthly: 250,
    annual: 213,
    annualTotal: 2550,
    annualSavings: 450,
    featuresKey: "basic" as const,
  },
  {
    key: "essential",
    icon: "🚀",
    monthly: 397,
    annual: 318,
    annualTotal: 3816,
    annualSavings: 948,
    featured: true,
    featuresKey: "main" as const,
  },
  {
    key: "enterprise",
    icon: "🏢",
    custom: true,
    featuresKey: "anchor" as const,
  },
];

const PricingSection = () => {
  const { t, language } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const locale = language === "en" ? "en-US" : language === "es" ? "es-ES" : "pt-BR";

  const formatBRL = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  const monthlyLabel = useMemo(
    () => billingCycle === "monthly" ? t.pricing.monthlySelected : t.pricing.monthly,
    [billingCycle, t],
  );

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
            {t.pricing.tag}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              className="text-base"
            >
              🏷️
            </motion.span>
            <span>{t.pricing.saveAnnual}</span>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "text-sm font-medium transition-colors",
                billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {t.pricing.monthly}
            </button>

            <button
              type="button"
              aria-label="Alternar mensal e anual"
              onClick={() => setBillingCycle((current) => (current === "monthly" ? "annual" : "monthly"))}
              className="relative inline-flex h-11 w-20 items-center rounded-full border border-border bg-secondary p-1 shadow-inner"
            >
              <span
                className={cn(
                  "absolute inset-y-1 left-1 w-8 rounded-full bg-primary shadow-md transition-transform duration-300 ease-out",
                  billingCycle === "annual" && "translate-x-9",
                )}
              />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "text-sm font-medium transition-colors",
                  billingCycle === "annual" ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {t.pricing.annual}
              </button>
              <AnimatePresence>
                {billingCycle === "annual" && (
                  <motion.span
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary"
                  >
                    {t.pricing.bestValue}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{monthlyLabel}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isAnnual = billingCycle === "annual";
            const name = t.pricing.plans[plan.featuresKey].name;
            const subtitle = t.pricing.plans[plan.featuresKey].subtitle;
            const badge = t.pricing.plans[plan.featuresKey].badge;
            const features = t.pricing.plans[plan.featuresKey].features;
            const period = t.pricing.plans[plan.featuresKey].period;

            const billingCycleLabel = isAnnual ? t.whatsapp.annual : t.whatsapp.monthly;
            const whatsappText =
              plan.key === "enterprise"
                ? t.whatsapp.msgEnterprise
                : t.whatsapp.msgPlanBuy
                    .replace("{planName}", name)
                    .replace("{billingCycle}", billingCycleLabel);
            const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(whatsappText)}`;

            return (
              <motion.article
                key={plan.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className={cn(
                  "relative rounded-2xl border bg-card p-7 flex flex-col",
                  plan.featured
                    ? "border-primary/60 shadow-[0_20px_70px_rgba(59,130,246,0.18)] md:scale-[1.03]"
                    : "border-border",
                  plan.custom && "bg-secondary/40",
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold tracking-wide uppercase text-primary-foreground shadow-lg">
                      <Star size={12} className="fill-current" /> {badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{plan.icon}</span>
                    <h3 className="text-xl font-bold text-foreground">{name}</h3>
                  </div>
                  {badge && !plan.featured && (
                    <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                      {badge}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

                <div className="mt-6 min-h-[110px]">
                  {plan.custom ? (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-dashed border-border/80 bg-background/40 px-4 py-5 text-sm text-muted-foreground">
                        {t.pricing.customSolution}
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {t.pricing.onDemand}
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billingCycle}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        {isAnnual ? (
                          <div className="space-y-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-semibold text-muted-foreground line-through decoration-destructive/80">
                                {formatBRL(plan.monthly)}
                              </span>
                              <span className="text-sm text-muted-foreground">{period}</span>
                            </div>
                            <div className="flex items-end gap-2">
                              <span className="text-5xl font-extrabold tracking-tight text-emerald-400">
                                {formatBRL(plan.annual)}
                              </span>
                              <span className="pb-1 text-base text-emerald-300/90">{period}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t.pricing.billedYearly.replace("{amount}", formatBRL(plan.annualTotal))}
                            </div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.08 }}
                              className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"
                            >
                              {t.pricing.saveYearly.replace("{amount}", formatBRL(plan.annualSavings))}
                            </motion.div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-end gap-2">
                              <span className="text-5xl font-extrabold tracking-tight text-foreground">
                                {formatBRL(plan.monthly)}
                              </span>
                              <span className="pb-1 text-base text-muted-foreground">{period}</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {features.map((feature, index) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex gap-2 text-sm",
                        index === 0 && "font-medium text-foreground",
                        index !== 0 && "text-muted-foreground",
                      )}
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-7 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-all",
                    plan.featured
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
                      : "border border-border text-foreground hover:bg-secondary",
                  )}
                >
                  {plan.custom ? t.pricing.speakSpecialist : isAnnual ? t.pricing.getDiscount : t.pricing.startNow}
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Lock size={16} className="text-primary" /> {t.pricing.trust.secure}
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" /> {t.pricing.trust.guarantee}
          </span>
          <span className="inline-flex items-center gap-2">
            <Headphones size={16} className="text-primary" /> {t.pricing.trust.support}
          </span>
          <span className="inline-flex items-center gap-2">
            <Crown size={16} className="text-primary" /> {t.pricing.trust.consultive}
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> {t.pricing.trust.guided}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
