import { useEffect, useRef, useState } from "react";
import { motion , useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type NodeId =
  | "start"
  | "attract_clients"
  | "automate_service"
  | "digital_solution"
  | "end";

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

const getFlowForLanguage = (lang: "pt" | "en" | "es"): Record<NodeId, Node> => {
  const flows: Record<"pt" | "en" | "es", Record<NodeId, Node>> = {
    pt: {
      start: {
        bot: "Olá! 👋 Como a AgiloNex pode ajudar o seu negócio hoje?",
        options: [
          { label: "Atrair mais clientes", next: "attract_clients" },
          { label: "Automatizar atendimento", next: "automate_service" },
          { label: "Criar uma solução digital", next: "digital_solution" },
        ],
      },
      attract_clients: {
        bot: "Excelente! Nossa IA analisa seu público e cria campanhas otimizadas. Quer ver como funciona?",
        options: [{ label: "Ver como funciona", next: "end" }],
      },
      automate_service: {
        bot: "Ótimo! Nossos chatbots com IA atendem 24/7 e qualificam leads. Quer ver um exemplo?",
        options: [{ label: "Testar demonstração", next: "end" }],
      },
      digital_solution: {
        bot: "Perfeito! Desenvolvemos plataformas sob medida para escalar sua operação. Qual o seu objetivo?",
        options: [{ label: "Falar com especialista", next: "end" }],
      },
      end: {
        bot: "Incrível! Nossa equipe está pronta para ajudar. 😊",
        options: [],
      },
    },
    en: {
      start: {
        bot: "Hello! 👋 How can AgiloNex help your business today?",
        options: [
          { label: "Attract more clients", next: "attract_clients" },
          { label: "Automate service", next: "automate_service" },
          { label: "Create a digital solution", next: "digital_solution" },
        ],
      },
      attract_clients: {
        bot: "Excellent! Our AI analyzes your audience and creates optimized campaigns. Want to see how it works?",
        options: [{ label: "See how it works", next: "end" }],
      },
      automate_service: {
        bot: "Great! Our AI chatbots provide 24/7 service and qualify leads. Want to see an example?",
        options: [{ label: "Test demo", next: "end" }],
      },
      digital_solution: {
        bot: "Perfect! We develop custom platforms to scale your operation. What is your goal?",
        options: [{ label: "Speak with a specialist", next: "end" }],
      },
      end: {
        bot: "Awesome! Our team is ready to help. 😊",
        options: [],
      },
    },
    es: {
      start: {
        bot: "¡Hola! 👋 ¿Cómo puede AgiloNex ayudar a tu negocio hoy?",
        options: [
          { label: "Atraer más clientes", next: "attract_clients" },
          { label: "Automatizar la atención", next: "automate_service" },
          { label: "Crear una solución digital", next: "digital_solution" },
        ],
      },
      attract_clients: {
        bot: "¡Excelente! Nuestra IA analiza tu público y crea campañas optimizadas. ¿Quieres ver cómo funciona?",
        options: [{ label: "Ver cómo funciona", next: "end" }],
      },
      automate_service: {
        bot: "¡Genial! Nuestros chatbots con IA atienden 24/7 y califican leads. ¿Quieres ver un ejemplo?",
        options: [{ label: "Probar demo", next: "end" }],
      },
      digital_solution: {
        bot: "¡Perfecto! Desarrollamos plataformas a medida para escalar tu operación. ¿Cuál es tu objetivo?",
        options: [{ label: "Hablar con un especialista", next: "end" }],
      },
      end: {
        bot: "¡Increíble! Nuestro equipo está listo para ayudarte. 😊",
        options: [],
      },
    },
  };

  return flows[lang];
};

const ChatDemo = () => {
  const shouldReduceMotion = useReducedMotion();

  const { language } = useLanguage();
  const t = translations[language];
  const FLOW = getFlowForLanguage(language);
  
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
  }, [language]);

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
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="hidden md:block w-full max-w-[380px] mx-auto"
    >
      <div className="rounded-[28px] border border-border/70 bg-card/90 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 bg-background/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.chatDemo.agentName || "AgiloNex"}</p>
              <p className="text-xs text-muted-foreground">{t.chatDemo.agentStatus || "Especialista em automação"}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Online
          </div>
        </div>

        <div className="flex h-[450px] flex-col bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] px-4 py-4">
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
                        {t.chatDemo.agentName || "AgiloNex"}
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
                      {t.chatDemo.agentName || "AgiloNex"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">{t.chatDemo.typing || "Digitando..."}</span>
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
                    ? (t.chatDemo.completed || "Atendimento iniciado.")
                    : "Aguardando a próxima interação..."}
                </p>
                {isComplete && (
                  <button
                    type="button"
                    onClick={resetDemo}
                    className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                  >
                    {t.chatDemo.restart || "Reiniciar"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatDemo;
