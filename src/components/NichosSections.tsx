import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

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

const WHATSAPP_BASE_URL =
  "https://wa.me/553197546901020?text=";

const niches: Niche[] = [
  {
    id: "salao",
    icon: "✂️",
    title: "Chatbot para Salão de Beleza",
    subtitle:
      "Seu salão agendando 24h por dia, sem você precisar parar o atendimento para responder mensagem",
    painPoints: [
      "Clientes mandando mensagem enquanto você está atendendo",
      "Perdendo agendamentos fora do horário comercial",
      "Esquecendo de confirmar horários e tendo faltas",
    ],
    solutions: [
      "Agendamento automático pelo WhatsApp, sem você tocar no celular",
      "Confirmação e lembrete automático 24h antes",
      "Cardápio de serviços e preços respondido na hora",
      "Transferência para você só quando o cliente realmente precisar",
    ],
    impact: "Salões que usam IA da AgiloNex reduzem em até 70% as mensagens manuais no WhatsApp.",
    ctaLabel: "Quero isso no meu salão →",
    whatsappText:
      "Olá! Tenho um salão de beleza e quero saber como funciona o chatbot da AgiloNex.",
    mockupTitle: "Agendamento automático",
    mockupSummary: "Ana - Salão Premium",
    mockupItems: [
      { label: "Novo agendamento", value: "Terça, 14h" },
      { label: "Lembrete enviado", value: "24h antes" },
      { label: "Fila de espera", value: "3 clientes" },
    ],
  },
  {
    id: "clinica",
    icon: "🦷",
    title: "Chatbot para Clínica e Consultório",
    subtitle: "Sua recepção virtual funcionando antes mesmo de você abrir a clínica",
    painPoints: [
      "Pacientes ligando fora do horário sem conseguir agendar",
      "Recepcionista sobrecarregada com perguntas repetitivas",
      "Confirmações de consulta feitas manualmente, uma por uma",
    ],
    solutions: [
      "Agendamento e confirmação automática de consultas",
      "Respostas sobre convênios, valores e procedimentos na hora",
      "Lembretes automáticos para reduzir faltas",
      "Triagem inicial: coleta nome, queixa e plano antes de você ver",
    ],
    impact: "Clínicas economizam até 2h por dia eliminando tarefas repetitivas de recepção.",
    ctaLabel: "Quero isso na minha clínica →",
    whatsappText:
      "Olá! Tenho uma clínica/consultório e quero saber como funciona o chatbot da AgiloNex.",
    mockupTitle: "Recepção digital",
    mockupSummary: "Clínica Sorriso",
    mockupItems: [
      { label: "Consulta marcada", value: "Seg 09:30" },
      { label: "Triagem coletada", value: "Nome + queixa" },
      { label: "Lembrete", value: "Confirmado" },
    ],
  },
  {
    id: "restaurante",
    icon: "🍽️",
    title: "Chatbot para Restaurante e Lanchonete",
    subtitle: "Pedidos, reservas e cardápio no WhatsApp — sem deixar cliente sem resposta na hora do rush",
    painPoints: [
      "WhatsApp lotado de perguntas sobre cardápio e horário de funcionamento",
      "Perdendo pedidos porque não consegue responder todo mundo ao mesmo tempo",
      "Sem controle de reservas, cliente chega e não tem mesa",
    ],
    solutions: [
      "Cardápio completo respondido automaticamente com fotos e preços",
      "Recebimento e confirmação de pedidos pelo WhatsApp",
      "Gestão de reservas sem intervenção manual",
      "Respostas instantâneas sobre horário, endereço e promoções do dia",
    ],
    impact: "No horário de pico, seu agente IA atende dezenas de clientes ao mesmo tempo — você não atende um.",
    ctaLabel: "Quero isso no meu restaurante →",
    whatsappText:
      "Olá! Tenho um restaurante/lanchonete e quero saber como funciona o chatbot da AgiloNex.",
    mockupTitle: "Pedidos em fila",
    mockupSummary: "Bistrô AgiloNex",
    mockupItems: [
      { label: "Pedido recebido", value: "2 combos" },
      { label: "Reserva", value: "Mesa 4" },
      { label: "Promoção do dia", value: "Enviada" },
    ],
  },
  {
    id: "loja",
    icon: "🛍️",
    title: "Chatbot para Loja e Comércio Local",
    subtitle: "Sua loja respondendo clientes e fechando vendas mesmo quando você está ocupado",
    painPoints: [
      "Clientes perguntando preço, tamanho e disponibilidade o dia todo",
      "Perdendo vendas porque demorou para responder",
      "Sem tempo para prospectar porque fica preso no atendimento",
    ],
    solutions: [
      "Catálogo de produtos respondido automaticamente",
      "Qualificação do cliente antes de você entrar na conversa",
      "Follow-up automático para clientes que perguntaram mas não compraram",
      "Integração com link de pagamento PIX direto na conversa",
    ],
    impact: "Cada mensagem não respondida em até 5 minutos tem 80% menos chance de virar venda.",
    ctaLabel: "Quero isso na minha loja →",
    whatsappText:
      "Olá! Tenho uma loja e quero saber como funciona o chatbot da AgiloNex.",
    mockupTitle: "Venda assistida",
    mockupSummary: "Loja Premium Local",
    mockupItems: [
      { label: "Produto visto", value: "Tênis 42" },
      { label: "Follow-up", value: "Automático" },
      { label: "PIX", value: "Enviado" },
    ],
  },
];

const NichosSections = () => {
  const [activeId, setActiveId] = useState<NicheId>("salao");

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
  }, []);

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
            Nichos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground normal-case">
            Sua área de atuação tem solução pronta
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            A AgiloNex já mapeou os principais problemas do seu segmento — e tem IA configurada para resolver
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
                        <p className="text-sm font-semibold text-foreground">Dores comuns</p>
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
                        <p className="text-sm font-semibold text-foreground">Soluções com IA</p>
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
                      href={`${WHATSAPP_BASE_URL}${encodeURIComponent(niche.whatsappText)}`}
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
                            <p className="text-sm font-semibold text-background">{niche.mockupTitle}</p>
                            <p className="text-xs text-background/60">{niche.mockupSummary}</p>
                          </div>
                          <div className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                            IA ativa
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
                                <span className="text-xs uppercase tracking-[0.22em] text-background/55">
                                  {item.label}
                                </span>
                                <span className="text-sm font-semibold text-background">{item.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-primary/80">
                            {niche.icon} Demo ao vivo
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-background/85">
                            Atendimento automático, resposta rápida e transferência humana só quando necessário.
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
