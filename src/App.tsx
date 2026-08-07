import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieConsent from "@/components/CookieConsent";
import AdSenseLoader from "@/components/AdSenseLoader";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Lgpd from "./pages/Lgpd.tsx";
import Terms from "./pages/Terms.tsx";
import Cookies from "./pages/Cookies.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cases from "./pages/Cases.tsx";
import BarbershopCase from "./pages/cases/Barbershop.tsx";
import Blog from "./pages/Blog.tsx";
import Post from "./pages/Post.tsx";

const queryClient = new QueryClient();

const LanguageRouteSync = () => {
  const { lang } = useParams();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (lang === "pt" || lang === "en" || lang === "es") {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);

  return <Outlet />;
};

const LanguageRouteGuard = () => {
  const { lang } = useParams();
  if (lang !== "pt" && lang !== "en" && lang !== "es") {
    return <Navigate to="/pt" replace />;
  }

  return <LanguageRouteSync />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <WhatsAppFloat />
          <CookieConsent />
          <AdSenseLoader />
          <Routes>
            <Route path="/" element={<Navigate to="/pt" replace />} />
            <Route path="/:lang" element={<LanguageRouteGuard />}>
              <Route index element={<Index />} />
              <Route path="sobre" element={<About />} />
              <Route path="contato" element={<Contact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<Post />} />
              <Route path="privacidade" element={<PrivacyPolicy />} />
              <Route path="lgpd" element={<Lgpd />} />
              <Route path="termos-de-uso" element={<Terms />} />
              <Route path="politica-de-cookies" element={<Cookies />} />
              <Route path="cases">
                <Route index element={<Cases />} />
                <Route path="barbershop" element={<BarbershopCase />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
