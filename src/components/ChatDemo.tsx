import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type NodeId =
  | "start"
  | "schedule_service"
  | "schedule_time"
  | "schedule_done"
  | "services_offer"
  | "services_end"
  | "human_name"
  | "ana_done";

type Node = {
  bot: string;
  options: Array<{
    label: string;
    next: NodeId;
  }>;
};

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

const FLOW: Record<NodeId, Node> = {
  start: {
    bot: "Olá! 👋 Seja bem-vindo ao Salão da Ana. Como posso te ajudar?",
    options: [
      { label: "Quero agendar um horário", next: "schedule_service" },
      { label: "Ver serviços e preços", next: "services_offer" },
      { label: "Falar com a Ana", next: "human_name" },
    ],
  },
  schedule_service: {
    bot: "Ótimo! Qual serviço você quer agendar?",
    options: [
      { label: "Corte feminino", next: "schedule_time" },
      { label: "Escova progressiva", next: "schedule_time" },
      { label: "Coloração", next: "schedule_time" },
    ],
  },
  schedule_time: {
    bot: "Perfeito! Temos horários na terça e quinta. Qual prefere?",
    options: [
      { label: "Terça às 14h", next: "schedule_done" },
      { label: "Quinta às 10h", next: "schedule_done" },
    ],
  },
  schedule_done: {
    bot: "Agendamento confirmado! ✅ Você receberá uma confirmação no WhatsApp. Até lá!",
    options: [],
  },
  services_offer: {
    bot: "Nossos principais serviços: ✂️ Corte R$60 | 💆 Escova R$80 | 🎨 Coloração a partir de R$150. Quer agendar algum?",
    options: [
      { label: "Sim, quero agendar", next: "schedule_service" },
      { label: "Obrigado, só estava vendo", next: "services_end" },
    ],
  },
  services_end: {
    bot: "Perfeito! Fico à disposição quando quiser agendar. 😊",
    options: [],
  },
  human_name: {
    bot: "A Ana está ocupada no momento, mas vou avisar que você quer falar com ela! Seu nome?",
    options: [{ label: "Pode me chamar de cliente 😄", next: "ana_done" }],
  },
  ana_done: {
    bot: "Anotado! Ela retorna em breve. 😊",
    options: [],
  },
};

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<Node["options"]>([]);
  const [typing, setTyping] = useState(false);
  const timerRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const messageIdRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const nextMessageId = () => {
    messageIdRef.current += 1;
    return messageIdRef.current;
  };

  const pushBotMessage = (text: string) => {
    setMessages((current) => [...current, { id: nextMessageId(), sender: "bot", text }]);
  };

  const pushUserMessage = (text: string) => {
    setMessages((current) => [...current, { id: nextMessageId(), sender: "user", text }]);
  };

  const showNode = (nodeId: NodeId, delay = 800) => {
    clearTimer();
    setTyping(true);
    setOptions([]);

    timerRef.current = window.setTimeout(() => {
      const node = FLOW[nodeId];
      pushBotMessage(node.bot);
      setOptions(node.options);
      setTyping(false);
    }, delay);
  };

  const resetDemo = () => {
    clearTimer();
    setMessages([]);
    setOptions([]);
    setTyping(false);

    timerRef.current = window.setTimeout(() => {
      const node = FLOW.start;
      pushBotMessage(node.bot);
      setOptions(node.options);
    }, 1000);
  };

  useEffect(() => {
    resetDemo();

    return () => {
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, options, typing]);

  const handleOptionClick = (label: string, next: NodeId) => {
    pushUserMessage(label);
    showNode(next);
  };

  const isComplete = options.length === 0 && !typing && messages.length > 0;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
            Veja como funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            Veja seu negócio com IA — ao vivo
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Esse é o mesmo agente que seus clientes vão usar no WhatsApp
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="w-full max-w-[380px]"
          >
            <div className="rounded-[28px] border border-border/70 bg-card/90 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 bg-background/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">AgiloNex IA</p>
                    <p className="text-xs text-muted-foreground">Responde em segundos</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  online
                </div>
              </div>

              <div className="flex h-[520px] flex-col bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] px-4 py-4">
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          message.sender === "user"
                            ? "rounded-br-md bg-primary text-primary-foreground"
                            : "rounded-bl-md bg-white/[0.08] text-slate-100 border border-white/10"
                        }`}
                      >
                        {message.sender === "bot" && (
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                              A
                            </div>
                            <span className="text-[11px] uppercase tracking-[0.2em] text-primary/80">
                              AgiloNex IA
                            </span>
                          </div>
                        )}
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="flex justify-start">
                      <div className="max-w-[82%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-slate-100 shadow-sm">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                            A
                          </div>
                          <span className="text-[11px] uppercase tracking-[0.2em] text-primary/80">
                            AgiloNex IA
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-300">digitando...</span>
                          <div className="flex items-center gap-1">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.2s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.1s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  {options.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleOptionClick(option.label, option.next)}
                          disabled={typing}
                          className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-2 text-left text-xs font-medium text-slate-100 transition-colors hover:border-primary/50 hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-slate-400">
                        {isComplete
                          ? "Fluxo concluído. Você pode reiniciar a demo."
                          : "Aguardando a próxima interação..."}
                      </p>
                      {isComplete && (
                        <button
                          type="button"
                          onClick={resetDemo}
                          className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                        >
                          Reiniciar demo
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:gap-3 hover:shadow-primary/30"
              >
                Quero esse agente no meu negócio
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
