import { env } from "@/config/env";

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
  if (!env.ai.openaiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.ai.openaiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    content: data.choices[0].message.content,
    usage: {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    },
  };
};

// Anthropic Claude API Call
export const callAnthropic = async (
  messages: AIMessage[],
  model: string = "claude-3-opus-20240229"
): Promise<AIResponse> => {
  if (!env.ai.anthropicKey) {
    throw new Error("Anthropic API key not configured");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": env.ai.anthropicKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      messages: messages.map((msg) => ({
        role: msg.role === "system" ? "user" : msg.role,
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    content: data.content[0].text,
    usage: {
      promptTokens: data.usage.input_tokens,
      completionTokens: data.usage.output_tokens,
      totalTokens: data.usage.input_tokens + data.usage.output_tokens,
    },
  };
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

// Check if any AI provider is configured
export const isAIConfigured = () => {
  return env.ai.openaiKey || env.ai.anthropicKey;
};

// Get configured providers
export const getConfiguredProviders = () => {
  const providers: ("openai" | "anthropic")[] = [];
  if (env.ai.openaiKey) providers.push("openai");
  if (env.ai.anthropicKey) providers.push("anthropic");
  return providers;
};
