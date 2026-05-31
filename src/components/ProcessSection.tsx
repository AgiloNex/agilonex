import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: "🎯",
    title: "Diagnóstico gratuito",
    description:
      "Você responde 5 perguntas sobre seu negócio pelo WhatsApp. Em menos de 15 minutos entendemos exatamente o que seu cliente pergunta todo dia.",
  },
  {
    icon: "⚙️",
    title: "A gente configura tudo",
    description:
      "Nossa equipe monta e treina o agente com as informações do seu negócio. Você não precisa instalar nada, mexer em código ou contratar técnico.",
  },
  {
    icon: "🚀",
    title: "Seu agente entra ao vivo",
    description:
      "Em até 7 dias úteis seu WhatsApp já está sendo atendido pela IA. Você acompanha tudo pelo celular e pode ajustar o que quiser.",
  },
  {
    icon: "📈",
    title: "Você foca no que importa",
    description:
      "Menos mensagens repetitivas, menos tempo perdido, mais clientes atendidos fora do horário. Os resultados aparecem na primeira semana.",
  },
];

const WHATSAPP_URL =
  "https://wa.me/5531975469010?text=Ol%C3%A1!%20Quero%20fazer%20o%20diagn%C3%B3stico%20gratuito%20para%20meu%20neg%C3%B3cio.";

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background to-primary/5"
    >
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
            Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground normal-case">
            Do primeiro contato ao agente no ar em 7 dias
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Um processo simples, sem surpresas e sem você precisar entender de tecnologia
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-8 hidden h-[2px] w-[calc(100%-3rem)] overflow-hidden rounded-full bg-white/10 md:block">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: isVisible ? "100%" : "0%" }}
            />
          </div>
          <div className="absolute left-7 top-8 block h-[calc(100%-2rem)] w-[2px] overflow-hidden rounded-full bg-white/10 md:hidden">
            <div
              className="rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ height: isVisible ? "100%" : "0%" }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 md:gap-8">
            {steps.map((step, index) => {
              const delay = index * 150;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ duration: 0.45, delay: isVisible ? delay / 1000 : 0 }}
                  className="relative pl-14 md:pl-0"
                >
                  <div className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-2xl md:left-1/2 md:-translate-x-1/2 md:top-0 md:h-16 md:w-16">
                    <span aria-hidden>{step.icon}</span>
                  </div>

                  <div className="h-full rounded-[24px] border border-border/70 bg-card/85 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_22px_60px_rgba(37,99,235,0.16)]">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-4xl font-bold tracking-tighter text-primary/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Passo {index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-foreground normal-case">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:gap-3 hover:opacity-95"
          >
            Começar meu diagnóstico gratuito
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
