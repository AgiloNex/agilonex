import { motion } from "framer-motion";
import { ShieldCheck, BrainCircuit, BarChart3, Code, Play, ExternalLink } from "lucide-react";

const projects = [
  {
    icon: ShieldCheck,
    name: "Zenith ID",
    title: "Governança de Identidades & Sustentabilidade Digital",
    description:
      "Auditoria automatizada de identidades em nuvem com cálculo de pegada de carbono usando Python e Pandas.",
    cta: { label: "Ver Código", icon: Code },
    accent: "from-primary to-accent",
  },
  {
    icon: BrainCircuit,
    name: "Hybrid Architect",
    title: "Middleware de IA para Gestão de Prioridades",
    description:
      "Sistema inteligente que categoriza urgência e impacto de tarefas usando LLMs e integração com Supabase.",
    cta: { label: "Demo Interativa", icon: Play },
    accent: "from-accent to-primary",
  },
  {
    icon: BarChart3,
    name: "Wave Flow Tracker",
    title: "Gestão de Rotina & eCommerce",
    description:
      "Plataforma de acompanhamento de rotina para grooming (waves) com integração de vendas.",
    cta: { label: "Saiba Mais", icon: ExternalLink },
    accent: "from-primary to-[hsl(var(--whatsapp))]",
  },
];

const PortfolioSection = () => (
  <section id="portfolio" className="py-20 md:py-28 bg-foreground text-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-wider mb-3 text-primary">
          Portfólio & Laboratório
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Projetos que demonstram nosso trabalho
        </h2>
        <p className="mt-4 text-background/60 text-pretty">
          Conheça soluções reais que desenvolvemos para resolver problemas complexos com tecnologia acessível.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="group relative rounded-[20px] border border-background/10 bg-background/5 backdrop-blur-sm p-8 flex flex-col hover:bg-background/10 transition-colors duration-300"
          >
            {/* gradient line */}
            <div
              className={`absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r ${p.accent} opacity-60 group-hover:opacity-100 transition-opacity`}
            />

            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <p.icon size={24} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-2">
              {p.name}
            </span>
            <h3 className="text-lg font-semibold tracking-tight leading-snug">{p.title}</h3>
            <p className="mt-3 text-sm text-background/55 leading-relaxed flex-1">{p.description}</p>

            <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-200 self-start">
              <p.cta.icon size={14} />
              {p.cta.label}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
