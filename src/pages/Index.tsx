import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ChatDemo from "@/components/ChatDemo";
import FAQSection from "@/components/FAQSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PortfolioSection />
      <ChatDemo />
      <FAQSection />
      <CtaSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Index;
