import { motion } from "framer-motion";
import { ArrowRight, Megaphone, Bot, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

interface DemoItem {
  title: string;
  description: string;
  Icon: typeof Megaphone;
}

const demoItems: DemoItem[] = [
  {
    title: "Atrair mais clientes",
    description: "IA que cria campanhas segmentadas e atrai leads qualificados para seu negócio.",
    Icon: Megaphone,
  },
  {
    title: "Automatizar atendimento",
    description: "Chatbots com IA atendendo 24/7, qualificando leads e agendando reuniões.",
    Icon: Bot,
  },
  {
    title: "Criar solução digital",
    description: "Plataformas sob medida para escalar suas vendas e processos.",
    Icon: MonitorSmartphone,
  },
];

export const ServiceDemo = () => {
  const { languagePath } = useLanguage();
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
        Conheça outras soluções da AgiloNex
      </h3>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {demoItems.map((item, idx) => {
          const { Icon } = item;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card/90 backdrop-blur-md rounded-[20px] border border-border/70 shadow-[0_12px_40px_rgba(0,0,0,0.2)] p-4 w-full md:w-[300px]"
            >
              <div className="mb-3 h-48 rounded-md overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500/15 to-cyan-400/10">
                <Icon className="h-16 w-16 text-blue-400/80" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <Link
                to={languagePath("contato")}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Fale com a gente
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
