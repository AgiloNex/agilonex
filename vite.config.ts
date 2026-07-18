import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-oxc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

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
    sitemap({
      hostname: SITE_URL,
      dynamicRoutes: generateSitemapRoutes(),
      exclude: ["/404"],
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
