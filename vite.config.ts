import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
// Sitemap plugin is lazily required in test mode

const SITE_URL = process.env.VITE_SITE_URL || "https://agilonex.com.br";
const LANGUAGES = ["pt", "en", "es"];
const PAGES = ["", "sobre", "contato", "privacidade", "lgpd", "termos-de-uso", "politica-de-cookies"];

const generateSitemapRoutes = () => {
  const routes: string[] = [];
  for (const lang of LANGUAGES) {
    for (const page of PAGES) {
      routes.push(`/${lang}/${page}`.replace(/\/$/, ""));
    }
  }
  return routes;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
