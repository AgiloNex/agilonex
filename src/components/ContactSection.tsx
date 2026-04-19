import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t.contact.success);
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
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t.contact.tag}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              {t.contact.subtitle}
            </p>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-whatsapp px-5 py-2.5 text-sm font-semibold text-whatsapp-foreground hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              {t.contact.whats}
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
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">{t.contact.name}</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder={t.contact.namePh}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">{t.contact.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder={t.contact.emailPh}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">{t.contact.message}</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                placeholder={t.contact.messagePh}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? t.contact.sending : t.contact.send}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
