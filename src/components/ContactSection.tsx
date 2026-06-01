import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Loader2, MessageCircle, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageContext";

const WEBHOOK_URL = "[WEBHOOK_URL]";
const WHATSAPP_LINK = "https://wa.me/5531975469010";

const SEGMENTOS = [
  "Salão de beleza",
  "Clínica/Consultório",
  "Restaurante/Lanchonete",
  "Loja/Comércio",
  "Prestador de serviços",
  "Outro",
] as const;

type Segmento = (typeof SEGMENTOS)[number];

const formatWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const isValidWhatsapp = (value: string) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value);

const ContactSection = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [segmento, setSegmento] = useState<Segmento | "">("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [success, setSuccess] = useState(false);

  const whatsappDigits = useMemo(() => whatsapp.replace(/\D/g, ""), [whatsapp]);

  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(formatWhatsapp(e.target.value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedWhatsapp = whatsapp.trim();

    if (!trimmedName || !segmento || !isValidWhatsapp(trimmedWhatsapp) || whatsappDigits.length !== 11) {
      toast.error(t.contactSection.toast, {
        action: {
          label: t.contactSection.toastAction,
          onClick: () => window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer"),
        },
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: trimmedName,
          whatsapp: trimmedWhatsapp,
          segmento,
          mensagem: mensagem.trim(),
          origem: "site_agilonex",
          data: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Webhook returned a non-2xx response");

      setSubmittedName(trimmedName);
      setSuccess(true);
      setName("");
      setWhatsapp("");
      setSegmento("");
      setMensagem("");
    } catch {
      toast.error(t.contactSection.toast, {
        action: {
          label: t.contactSection.toastAction,
          onClick: () => window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer"),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-border/60 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_38%),linear-gradient(180deg,_rgba(2,6,23,0.98),_rgba(8,15,28,0.98))] py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      <div className="container relative">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.25fr_0.85fr] md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
              <Sparkles className="h-4 w-4" />
              {t.contactSection.tag}
            </div>
            <h2 className="max-w-xl text-3xl font-bold tracking-tighter text-foreground md:text-5xl">
              {t.contactSection.title}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              {t.contactSection.subtitle}
            </p>
            <div className="mt-8 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              {t.contactSection.cards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-border/70 bg-card/60 p-4 shadow-lg shadow-black/10 backdrop-blur">
                  <p className="font-medium text-foreground">{card.title}</p>
                  <p className="mt-1">{card.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[28px] border border-border/70 bg-card/95 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8"
          >
            {success ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
                <div className="mb-4 rounded-full bg-emerald-500/15 p-3 text-emerald-300">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <p className="text-xl font-semibold text-foreground">
                  {t.contactSection.success.replace("{name}", submittedName)}
                </p>
                <Button asChild className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 hover:opacity-95">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    {t.contactSection.buttonWhatsapp}
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contactSection.form.name}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder={t.contactSection.form.namePh}
                    className="h-11 border-border/70 bg-background/90 focus-visible:ring-2 focus-visible:ring-blue-500/80 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">{t.contactSection.form.whatsapp}</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={whatsapp}
                    onChange={handleWhatsappChange}
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    maxLength={15}
                    placeholder="(31) 97546-9010"
                    className="h-11 border-border/70 bg-background/90 focus-visible:ring-2 focus-visible:ring-blue-500/80 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="segmento">{t.contactSection.form.segment}</Label>
                  <Select value={segmento} onValueChange={(value) => setSegmento(value as Segmento)}>
                    <SelectTrigger id="segmento" className="h-11 border-border/70 bg-background/90 focus:ring-2 focus:ring-blue-500/80 focus:ring-offset-0">
                      <SelectValue placeholder={t.contactSection.form.segmentPh} />
                    </SelectTrigger>
                    <SelectContent>
                      {SEGMENTOS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">{t.contactSection.form.message}</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    rows={4}
                    placeholder={t.contactSection.form.messagePh}
                    className="border-border/70 bg-background/90 focus-visible:ring-2 focus-visible:ring-blue-500/80 focus-visible:ring-offset-0"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-500 text-slate-950 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? t.contactSection.form.sending : t.contactSection.form.submit}
                </Button>
              </div>
            )}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[28px] border border-border/70 bg-background/70 p-6 shadow-2xl shadow-black/10 backdrop-blur md:p-8"
          >
            <h3 className="text-xl font-semibold text-foreground">{t.contactSection.direct.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.contactSection.direct.subtitle}</p>

            <div className="mt-6 space-y-4 text-sm">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 p-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10"
              >
                <MessageCircle className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-foreground">WhatsApp</p>
                  <p className="text-muted-foreground">+55 (31) 97546-9010</p>
                  <p className="font-medium text-foreground">E-mail</p>
                  <p className="text-muted-foreground">agilonex@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 p-4">
                <Loader2 className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="font-medium text-foreground">Atendimento</p>
                  <p className="text-muted-foreground">Seg–Sex, 8h–18h</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">{t.contactSection.direct.socials}</p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/agilonex"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/agilonex"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
