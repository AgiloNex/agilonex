import { motion } from "framer-motion";
import { Target, Lightbulb, Handshake, MapPin, Linkedin, Github, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import { aboutPageSchema, breadcrumbSchema, BASE_URL } from "@/lib/seoSchemas";
import { founder } from "@/lib/identity";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const beliefIcons = [Target, Lightbulb, Handshake];
const itemIcons = [Target, Lightbulb, Handshake];

const About = () => {
  const { t, language, languagePath } = useLanguage();
  useSEO({
    title: t.about.title,
    description: t.about.subtitle,
    canonical: `${BASE_URL}${languagePath("sobre")}`,
    lang: language,
    schema: [
      aboutPageSchema(language),
      breadcrumbSchema(language, [{ name: t.about.title, path: languagePath("sobre") }]),
    ],
  });
  const whatsappUrl = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.whatsapp.msgDefault)}`;

  return (
    <>
    <Header />
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {t.about.tag}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.about.title}
          </h1>
          <Breadcrumb className="mt-3 flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={languagePath()}>AgiloNex</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t.nav.about}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.about.subtitle}
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
            {t.about.missionTitle}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground text-pretty">
            {t.about.missionBody}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-3">
            {t.about.beliefsTitle}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground text-pretty mb-6">
            {t.about.beliefsBody}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {t.about.beliefsItems.map((belief, i) => {
              const Icon = beliefIcons[i] ?? Target;
              return (
                <div
                  key={belief.title}
                  className="rounded-[20px] border border-border/70 bg-card/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
                >
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-center">
                    {belief.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {belief.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
            {t.about.founderTitle}
          </h2>
          <div className="rounded-[20px] border border-border/70 bg-card/90 p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="md:w-1/3">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                  GL
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">{founder.fullName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.about.founderRole}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={14} />
                  {t.about.founderLocation}
                </p>
              </div>
              <div className="md:w-2/3">
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {t.about.founderBio}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={founder.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    <Linkedin size={16} />
                    {t.about.founderLinks.linkedin}
                  </a>
                  <a
                    href={founder.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    <Github size={16} />
                    {t.about.founderLinks.github}
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    <Mail size={16} />
                    {t.about.founderLinks.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {t.about.items.map((item, i) => {
              const Icon = itemIcons[i] ?? Target;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-pretty">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[20px] border border-primary/20 bg-primary/5 p-8 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-3">
            {t.about.ctaTitle}
          </h2>
          <p className="text-base text-muted-foreground text-pretty max-w-xl mx-auto mb-6">
            {t.about.ctaBody}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            <CheckCircle2 size={18} />
            {t.about.ctaWhatsapp}
          </a>
        </motion.section>

        <div className="mt-10 text-center">
          <Link
            to={languagePath()}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.footer.backHome}
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default About;
