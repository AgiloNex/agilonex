import { motion } from "framer-motion";
import { Clock, Ban, FolderKanban, Lock } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Economia de Tempo", text: "Automatize tarefas repetitivas e libere sua equipe para o que importa." },
  { icon: Ban, title: "Redução de Erros", text: "Processos digitais eliminam falhas humanas e aumentam a precisão." },
  { icon: FolderKanban, title: "Mais Organização", text: "Sistemas integrados trazem clareza e controle para toda sua operação." },
  { icon: Lock, title: "Segurança de Dados", text: "Proteja as informações do seu negócio e dos seus clientes com as melhores práticas." },
];

const BenefitsSection = () => (
  <section className="py-20 md:py-28 bg-secondary/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Benefícios</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
          Resultados reais para o seu negócio
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card p-6 rounded-[20px] shadow-card text-center"
          >
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <b.icon size={24} />
            </div>
            <h3 className="text-base font-semibold text-foreground">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
