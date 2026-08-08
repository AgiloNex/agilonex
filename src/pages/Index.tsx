import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import NichosSections from "@/components/NichosSections";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
  faqSchema,
  BASE_URL,
} from "@/lib/seoSchemas";

const FAQSection = lazy(() => import("@/components/FAQSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  const { t, language, languagePath } = useLanguage();
  const title = `${t.hero.title1} ${t.hero.titleHighlight}`;
  const description = t.hero.subtitle;
  const canonical = `${BASE_URL}${languagePath()}`;

  useSEO({
    title,
    description,
    canonical,
    lang: language,
    ogType: "website",
    schema: [
      organizationSchema(),
      websiteSchema(language),
      serviceSchema(language),
      faqSchema(language, t.faq.items),
    ],
  });

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <NichosSections />
        <ProcessSection />
        <Suspense fallback={<div className="h-40" />}>
          <FAQSection />
          <CtaSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Index;
