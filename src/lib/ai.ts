// AI calls are proxied server-side — no API keys are used in the browser bundle.

// Types for AI responses
export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// OpenAI API Call
export const callOpenAI = async (
  messages: AIMessage[],
  model: string = "gpt-4"
): Promise<AIResponse> => {
  const response = await fetch("/api/ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, model }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI proxy error: ${response.statusText}`);
  }

  const data = await response.json();
  return { content: data.content, usage: data.usage };
};

// Anthropic Claude API Call
export const callAnthropic = async (
  messages: AIMessage[],
  model: string = "claude-3-opus-20240229"
): Promise<AIResponse> => {
  // Proxy to server‑side endpoint; API key is handled server‑side.
  const response = await fetch("/api/ai/anthropic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, model }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic proxy error: ${response.statusText}`);
  }

  const data = await response.json();
  return { content: data.content, usage: data.usage };
};

// Generic AI call that uses the configured provider
export const callAI = async (
  messages: AIMessage[],
  provider: "openai" | "anthropic" = "openai"
): Promise<AIResponse> => {
  if (provider === "openai") {
    return callOpenAI(messages);
  } else if (provider === "anthropic") {
    return callAnthropic(messages);
  } else {
    throw new Error(`Unknown AI provider: ${provider}`);
  }
};

// Keys are stored server-side; assume both providers are reachable via proxy.
export const isAIConfigured = () => true;

export const getConfiguredProviders = (): ("openai" | "anthropic")[] =>
  ["openai", "anthropic"];
