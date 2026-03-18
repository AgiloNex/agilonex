import { motion } from "framer-motion";
import { Target, Lightbulb, Handshake } from "lucide-react";

const items = [
  { icon: Target, title: "Foco em PMEs", text: "Entendemos os desafios de pequenas e médias empresas e criamos soluções que cabem na sua realidade." },
  { icon: Lightbulb, title: "Soluções Acessíveis", text: "Tecnologia de ponta sem custos exorbitantes. Resultados reais com investimento justo." },
  { icon: Handshake, title: "Abordagem Prática", text: "Sem complicação. Trabalhamos lado a lado com você para entregar o que realmente importa." },
];

const AboutSection = () => (
  <section id="sobre" className="py-20 md:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Sobre Nós</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
          Tecnologia que resolve, não que complica
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          A Nexus Tech Solutions nasceu para tornar a tecnologia acessível e prática para empresas que querem crescer sem dor de cabeça.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon size={28} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-muted-foreground text-pretty">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
