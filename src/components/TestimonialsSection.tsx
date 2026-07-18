import { motion , useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Proprietária · Clínica Saúde+",
    text: "O chatbot automatizou nosso agendamento e reduziu em 40% as ligações. Agora minha equipe foca no atendimento presencial.",
  },
  {
    name: "Ricardo Almeida",
    role: "Gerente · Distribuidora RA",
    text: "A integração dos nossos sistemas eliminou o retrabalho de planilhas. Ganhamos horas por semana em produtividade.",
  },
  {
    name: "Fernanda Oliveira",
    role: "Diretora · Loja Virtual FO",
    text: "A adequação à LGPD foi rápida e sem dor de cabeça. Me sinto segura sabendo que meus dados estão protegidos.",
  },
];

const TestimonialsSection = () => (
  <section id="depoimentos" className="py-20 md:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Depoimentos</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
          O que nossos clientes dizem
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card p-8 rounded-[20px] shadow-card"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed text-pretty">"{t.text}"</p>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
