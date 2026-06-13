import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type NicheId = "salao" | "clinica" | "restaurante" | "loja";

type Niche = {
  id: NicheId;
  icon: string;
  title: string;
  subtitle: string;
  painPoints: string[];
  solutions: string[];
  impact: string;
  ctaLabel: string;
  whatsappText: string;
  mockupTitle: string;
  mockupSummary: string;
  mockupItems: Array<{ label: string; value: string }>;
};

const NichosSections = () => {
  const { t } = useLanguage();
  const whatsappBaseUrl = `https://wa.me/${t.whatsapp.number}?text=`;
  const [activeId, setActiveId] = useState<NicheId>("salao");

  const niches: Niche[] = useMemo(
    () =>
      (t.nichos.items as Niche[]).map((item) => ({
        ...item,
        id: item.id as NicheId,
      })),
    [t]
  );

  const tabs = useMemo(
    () => [
      { id: "salao" as const, label: "✂️ Salão" },
      { id: "clinica" as const, label: "🦷 Clínica" },
      { id: "restaurante" as const, label: "🍽️ Restaurante" },
      { id: "loja" as const, label: "🛍️ Loja" },
    ],
    []
  );

  useEffect(() => {
    const sections = niches
      .map((niche) => document.getElementById(niche.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id as NicheId);
        }
      },
      {
        threshold: [0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [niches]);

  const handleTabClick = (id: NicheId) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background to-primary/5">
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
            {t.nichos.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground normal-case">
            {t.nichos.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.nichos.subtitle}
          </p>
        </motion.div>

        <div className="sticky top-4 z-20 mb-10 flex justify-center">
          <div className="inline-flex max-w-full gap-2 overflow-x-auto rounded-full border border-border/70 bg-card/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm">
            {tabs.map((tab) => {
              const isActive = activeId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-8 md:space-y-12">
          {niches.map((niche, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={niche.id}
                id={niche.id}
                className="scroll-mt-28 border-t border-border/40 pt-12 md:pt-14 first:border-t-0 first:pt-0"
              >
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                  <motion.div
                    initial={{ opacity: 0, x: reverse ? 18 : -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={reverse ? "lg:order-2" : "lg:order-1"}
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-4xl shadow-[0_12px_30px_rgba(37,99,235,0.12)]">
                      <span aria-hidden>{niche.icon}</span>
                    </div>

                    <h3 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight text-foreground normal-case">
                      {niche.title}
                    </h3>
                    <p className="mt-3 text-base text-foreground text-pretty">
                      {niche.subtitle}
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm font-semibold text-foreground">
                          {t.nichos.labels.painPoints}
                        </p>
                        <ul className="mt-4 space-y-3">
                          {niche.painPoints.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
                                <X size={13} />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-[20px] border border-primary/15 bg-primary/5 p-5">
                        <p className="text-sm font-semibold text-foreground">
                          {t.nichos.labels.solutions}
                        </p>
                        <ul className="mt-4 space-y-3">
                          {niche.solutions.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                                <Check size={13} />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-6 text-lg font-semibold leading-relaxed text-accent normal-case">
                      {niche.impact}
                    </p>

                    <a
                      href={`${whatsappBaseUrl}${encodeURIComponent(niche.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:gap-3 hover:opacity-95"
                    >
                      {niche.ctaLabel}
                      <ArrowRight size={16} />
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: reverse ? -18 : 18, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className={reverse ? "lg:order-1" : "lg:order-2"}
                  >
                    <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm">
                      <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] p-5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{niche.mockupTitle}</p>
                            <p className="text-xs text-muted-foreground">{niche.mockupSummary}</p>
                          </div>
                          <div className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                            {t.nichos.labels.aiActive}
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          {niche.mockupItems.map((item, itemIndex) => (
                            <div
                              key={item.label}
                              className={`rounded-2xl border border-white/10 px-4 py-3 ${
                                itemIndex === 0 ? "bg-white/[0.06]" : "bg-white/[0.03]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                  {item.label}
                                </span>
                                <span className="text-sm font-semibold text-foreground">{item.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-primary/80">
                            {niche.icon} {t.nichos.labels.liveDemo}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                            {t.nichos.labels.demoDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NichosSections;
