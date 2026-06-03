import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Crown, Headphones, Lock, ShieldCheck, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "annual";

const WHATSAPP_NUMBER = "5500000000000";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const createWhatsAppUrl = (message: string) =>
  `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const annualMonthlyEquivalent = (monthlyPrice: number) => Math.round(monthlyPrice * 0.85);
const annualTotal = (monthlyPrice: number) => monthlyPrice * 12 * 0.85;
const annualSavings = (monthlyPrice: number) => monthlyPrice * 12 - annualTotal(monthlyPrice);

const plans = [
  {
    key: "starter",
    icon: "⚡",
    name: "Starter",
    subtitle: "Para começar com atendimento automatizado sem complicação",
    monthly: 250,
    annual: annualMonthlyEquivalent(250),
    annualTotal: 2550,
    annualSavings: 450,
    badge: "Economize R$450 no ano",
    features: [
      "1 agente de atendimento no WhatsApp",
      "Implementação em até 7 dias úteis",
      "Respostas automáticas 24h/dia",
      "Até 500 conversas/mês",
      "Suporte por e-mail",
    ],
  },
  {
    key: "essential",
    icon: "🚀",
    name: "Essencial AgiloNex",
    subtitle: "A automação principal para escalar operação e agendamentos",
    monthly: 397,
    annual: annualMonthlyEquivalent(397),
    annualTotal: 3816,
    annualSavings: 948,
    badge: "Economize R$948 no ano",
    featured: true,
    popularBadge: "Mais popular",
    features: [
      "Tudo do Starter, mais:",
      "IA com personalidade treinada no seu negócio",
      "Integração com Google Calendar (agendamentos)",
      "Dashboard de atendimentos",
      "Conversas ilimitadas",
      "Suporte prioritário via WhatsApp",
    ],
  },
  {
    key: "enterprise",
    icon: "🏢",
    name: "Enterprise",
    subtitle: "Solução personalizada para o seu negócio",
    custom: true,
    badge: "Personalizado",
    features: [
      "Tudo do Essencial, mais:",
      "Múltiplos agentes e canais",
      "Integrações customizadas",
      "SLA garantido",
      "Gerente de conta dedicado",
      "Treinamento da equipe",
    ],
  },
] as const;

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const monthlyLabel = useMemo(
    () => billingCycle === "monthly" ? "Mensal selecionado" : "Mensal",
    [billingCycle],
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
            Planos
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            Escolha o plano ideal para o seu momento
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Comece pequeno, escale quando fizer sentido. Sem fidelidade, sem letra miúda.
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
            <span>Economize pagando anualmente</span>
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
              Mensal
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
                Anual
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
                    Melhor custo-benefício
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
            const whatsappText =
              plan.key === "enterprise"
                ? "Olá! Tenho interesse no plano Enterprise da AgiloNex e quero entender as opções."
                : `Olá! Quero contratar o plano ${plan.name} ${isAnnual ? "Anual" : "Mensal"} da AgiloNex.`;
            const whatsappUrl = createWhatsAppUrl(whatsappText);

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
                      <Star size={12} className="fill-current" /> {plan.popularBadge}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{plan.icon}</span>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>
                  {plan.badge && (
                    <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{plan.subtitle}</p>

                <div className="mt-6 min-h-[110px]">
                  {plan.custom ? (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-dashed border-border/80 bg-background/40 px-4 py-5 text-sm text-muted-foreground">
                        Solução personalizada para o seu negócio
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Sob consulta
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
                              <span className="text-sm text-muted-foreground">/mês</span>
                            </div>
                            <div className="flex items-end gap-2">
                              <span className="text-5xl font-extrabold tracking-tight text-emerald-400">
                                {formatBRL(plan.annual)}
                              </span>
                              <span className="pb-1 text-base text-emerald-300/90">/mês</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Cobrado como {formatBRL(plan.annualTotal)}/ano
                            </div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.08 }}
                              className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"
                            >
                              Economize {formatBRL(annualSavings(plan.monthly))} no ano
                            </motion.div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-end gap-2">
                              <span className="text-5xl font-extrabold tracking-tight text-foreground">
                                {formatBRL(plan.monthly)}
                              </span>
                              <span className="pb-1 text-base text-muted-foreground">/mês</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature, index) => (
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
                  href={plan.custom ? "https://wa.me/5500000000000?text=Olá!%20Tenho%20interesse%20no%20plano%20Enterprise%20da%20AgiloNex%20e%20quero%20entender%20as%20opções." : whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-7 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-all",
                    plan.featured
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
                      : "border border-border text-foreground hover:bg-secondary",
                  )}
                >
                  {plan.custom ? "Falar com especialista →" : isAnnual ? "Garantir desconto →" : "Começar agora →"}
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Lock size={16} className="text-primary" /> Compra segura
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" /> 7 dias de garantia
          </span>
          <span className="inline-flex items-center gap-2">
            <Headphones size={16} className="text-primary" /> Suporte incluso enquanto assinante
          </span>
          <span className="inline-flex items-center gap-2">
            <Crown size={16} className="text-primary" /> Atendimento consultivo
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> Implantação guiada
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
