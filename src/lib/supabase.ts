import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

// Initialize Supabase client
export const supabase = createClient(env.supabase.url, env.supabase.anonKey);

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return env.supabase.url && env.supabase.anonKey;
};
