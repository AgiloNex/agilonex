import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Contato</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              Vamos conversar?
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Preencha o formulário ou fale diretamente pelo WhatsApp. Respondemos em até 24 horas.
            </p>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-whatsapp px-5 py-2.5 text-sm font-semibold text-whatsapp-foreground hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-[20px] shadow-card p-8 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Mensagem</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                placeholder="Como podemos ajudar?"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
