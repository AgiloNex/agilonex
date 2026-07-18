import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import NichosSections from "@/components/NichosSections";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

const FAQSection = lazy(() => import("@/components/FAQSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => (
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

export default Index;
