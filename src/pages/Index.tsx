import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ChatDemo from "@/components/ChatDemo";
import ROICalculator from "@/components/ROICalculator";
import NichosSections from "@/components/NichosSections";
import FAQSection from "@/components/FAQSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <ProcessSection />
      <PricingSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PortfolioSection />
      <ChatDemo />
      <ROICalculator />
      <NichosSections />
      <FAQSection />
      <CtaSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Index;
