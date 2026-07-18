import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const attractImg = "https://via.placeholder.com/300?text=Atrair+Mais+Clientes";
const automateImg = "https://via.placeholder.com/300?text=Automatizar+Atendimento";
const digitalImg = "https://via.placeholder.com/300?text=Criar+Solucao+Digital";

interface DemoItem {
  title: string;
  description: string;
  img: string;
  cta: string;
  link: string;
}

const demoItems: DemoItem[] = [
  {
    title: "Atrair mais clientes",
    description: "IA que cria campanhas segmentadas e atrai leads qualificados para seu negócio.",
    img: attractImg,
    cta: "Ver demo",
    link: "#",
  },
  {
    title: "Automatizar atendimento",
    description: "Chatbots com IA atendendo 24/7, qualificando leads e agendando reuniões.",
    img: automateImg,
    cta: "Testar demo",
    link: "#",
  },
  {
    title: "Criar solução digital",
    description: "Plataformas sob medida para escalar suas vendas e processos.",
    img: digitalImg,
    cta: "Explorar demo",
    link: "#",
  },
];

export const ServiceDemo = () => {
  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
        Conheça outras soluções da AgiloNex
      </h3>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {demoItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-card/90 backdrop-blur-md rounded-[20px] border border-border/70 shadow-[0_12px_40px_rgba(0,0,0,0.2)] p-4 w-full md:w-[300px]"
          >
            <div className="mb-3 h-48 bg-muted rounded-md overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            <a
              href={item.link}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {item.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
