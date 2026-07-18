// Environment variables configuration
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  },
  ai: {
    openaiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
    anthropicKey: import.meta.env.VITE_ANTHROPIC_API_KEY || "",
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  },
  adsense: {
    clientId: import.meta.env.VITE_ADSENSE_CLIENT_ID || "",
  },
};

// Validation
export const validateEnv = () => {
  const required = {
    "VITE_SUPABASE_URL": env.supabase.url,
    "VITE_SUPABASE_ANON_KEY": env.supabase.anonKey,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.warn(
      `Missing environment variables: ${missing.join(", ")}. Please update your .env file.`
    );
  }

  // At least one AI API key should be present
  const hasAiKey =
    env.ai.openaiKey || env.ai.anthropicKey;
  if (!hasAiKey) {
    console.warn(
      "No AI API key configured. Please add VITE_OPENAI_API_KEY or VITE_ANTHROPIC_API_KEY to your .env file."
    );
  }

  // Warn if AdSense client ID is not configured
  if (!env.adsense.clientId) {
    console.warn(
      "Missing VITE_ADSENSE_CLIENT_ID. Google AdSense script will not be loaded. Add it to your .env file when ready."
    );
  }
};
