import { useState, useCallback } from "react";
import { callAI, AIMessage, AIResponse, getConfiguredProviders } from "@/lib/ai";

interface UseAIOptions {
  provider?: "openai" | "anthropic";
}

export const useAI = (options: UseAIOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const providers = getConfiguredProviders();
  const defaultProvider = options.provider || providers[0] || "openai";

  const chat = useCallback(
    async (messages: AIMessage[]) => {
      if (providers.length === 0) {
        setError("No AI provider configured. Please add an API key to your .env file.");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await callAI(messages, defaultProvider as any);
        setResponse(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("AI Error:", errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [defaultProvider, providers.length]
  );

  return {
    chat,
    loading,
    error,
    response,
    configuredProviders: providers,
  };
};
