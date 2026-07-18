import { useMemo, useState } from "react";
import { AnimatePresence, motion , useReducedMotion } from "framer-motion";
import { Check, Crown, Headphones, Lock, ShieldCheck, Sparkles, Star, Calendar, Gem, Globe } from "lucide-react";
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

const sitePlans = [
  {
    key: "simple",
    icon: <Globe className="text-primary w-5 h-5" />,
    featuresKey: "simple" as const,
  },
  {
    key: "features",
    icon: <Calendar className="text-primary w-5 h-5" />,
    featured: true,
    featuresKey: "features" as const,
  },
  {
    key: "premium",
    icon: <Gem className="text-primary w-5 h-5" />,
    featuresKey: "premium" as const,
  },
];

const PricingSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ai" | "sites" | "robust">("ai");
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
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
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

        {/* Tab Selector */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full p-1 bg-secondary/60 backdrop-blur-sm border border-border/80 shadow-lg">
            {(["ai", "sites", "robust"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t.pricing.tabs[tab]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {activeTab === "ai" && (
              <motion.div
                key="ai-plans"
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 8 }}
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
                            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: -8, scale: 0.95 }}
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

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto w-full">
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
                        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className={cn(
                          "relative rounded-2xl border bg-card p-7 flex flex-col justify-between",
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

                        <div>
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
                                  initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 8 }}
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
                                        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 10 }}
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

                          <ul className="mt-6 space-y-3">
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
                        </div>

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
              </motion.div>
            )}

            {activeTab === "sites" && (
              <motion.div
                key="sites-plans"
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto w-full"
              >
                {sitePlans.map((plan) => {
                  const name = t.pricing.sitePlans[plan.featuresKey].name;
                  const subtitle = t.pricing.sitePlans[plan.featuresKey].subtitle;
                  const price = t.pricing.sitePlans[plan.featuresKey].price;
                  const features = t.pricing.sitePlans[plan.featuresKey].features;

                  const whatsappText = t.whatsapp.msgSiteBuy.replace("{planName}", name);
                  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(whatsappText)}`;

                  return (
                    <motion.article
                      key={plan.key}
                      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                      className={cn(
                        "relative rounded-2xl border bg-card p-7 flex flex-col justify-between",
                        plan.featured
                          ? "border-primary/60 shadow-[0_20px_70px_rgba(59,130,246,0.18)] md:scale-[1.03]"
                          : "border-border",
                      )}
                    >
                      {plan.featured && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold tracking-wide uppercase text-primary-foreground shadow-lg">
                            <Star size={12} className="fill-current" /> {t.pricing.bestValue}
                          </span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl flex items-center justify-center">{plan.icon}</span>
                          <h3 className="text-xl font-bold text-foreground">{name}</h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

                        <div className="mt-6 min-h-[70px]">
                          <div className="space-y-1">
                            <div className="flex items-end gap-1.5">
                              <span className="text-5xl font-extrabold tracking-tight text-foreground">
                                {formatBRL(Number(price))}
                              </span>
                            </div>
                            <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                              {t.pricing.oneTimePayment}
                            </div>
                          </div>
                        </div>

                        <ul className="mt-6 space-y-3">
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
                      </div>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "mt-8 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-all",
                          plan.featured
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
                            : "border border-border text-foreground hover:bg-secondary",
                        )}
                      >
                        {t.pricing.startNow}
                      </a>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}

            {activeTab === "robust" && (
              <motion.div
                key="robust-plans"
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="max-w-4xl mx-auto rounded-3xl border border-primary/25 bg-gradient-to-br from-card to-secondary/35 p-8 md:p-12 shadow-[0_20px_50px_rgba(59,130,246,0.08)] flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4 text-left">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <Sparkles size={14} /> {t.pricing.robustSection.title}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      {t.pricing.robustSection.subtitle}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                      {t.pricing.robustSection.description}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-primary" /> LGPD/GDPR
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Headphones size={14} className="text-primary" /> Suporte 24/7
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Crown size={14} className="text-primary" /> Squad Dedicado
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 w-full md:w-auto flex flex-col items-stretch md:items-center justify-center">
                    <a
                      href={`https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgRobust)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-4 text-base font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all hover:scale-[1.02] text-center"
                    >
                      {t.pricing.robustSection.cta}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
