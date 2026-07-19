import { describe, it, expect, beforeEach, vi } from "vitest";
import { callAI, callOpenAI, callAnthropic, getConfiguredProviders, isAIConfigured } from "@/lib/ai";
import type { AIMessage } from "@/lib/ai";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const messages: AIMessage[] = [{ role: "user", content: "Hello" }];

const mockFetch = (status: number, body: object) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Internal Server Error",
    json: async () => body,
  });
};

// ---------------------------------------------------------------------------
// callOpenAI
// ---------------------------------------------------------------------------

describe("callOpenAI", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("should return content and usage on a successful proxy response", async () => {
    mockFetch(200, { content: "Hello there!", usage: { promptTokens: 5, completionTokens: 3, totalTokens: 8 } });

    const result = await callOpenAI(messages);

    expect(result.content).toBe("Hello there!");
    expect(result.usage?.totalTokens).toBe(8);
  });

  it("should POST to /api/ai/openai with the correct body", async () => {
    mockFetch(200, { content: "ok" });

    await callOpenAI(messages, "gpt-4o");

    expect(fetch).toHaveBeenCalledWith(
      "/api/ai/openai",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, model: "gpt-4o" }),
      })
    );
  });

  it("should throw when the proxy returns a non-2xx status", async () => {
    mockFetch(500, {});

    await expect(callOpenAI(messages)).rejects.toThrow("OpenAI proxy error");
  });

  it("should throw when fetch itself rejects (network error)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

    await expect(callOpenAI(messages)).rejects.toThrow("Network failure");
  });
});

// ---------------------------------------------------------------------------
// callAnthropic
// ---------------------------------------------------------------------------

describe("callAnthropic", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("should return content on a successful proxy response", async () => {
    mockFetch(200, { content: "Claude says hi" });

    const result = await callAnthropic(messages);

    expect(result.content).toBe("Claude says hi");
  });

  it("should POST to /api/ai/anthropic", async () => {
    mockFetch(200, { content: "ok" });

    await callAnthropic(messages);

    expect(fetch).toHaveBeenCalledWith("/api/ai/anthropic", expect.any(Object));
  });

  it("should throw when the proxy returns a non-2xx status", async () => {
    mockFetch(401, {});

    await expect(callAnthropic(messages)).rejects.toThrow("Anthropic proxy error");
  });
});

// ---------------------------------------------------------------------------
// callAI — dispatcher
// ---------------------------------------------------------------------------

describe("callAI", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("should route to OpenAI when provider is 'openai'", async () => {
    mockFetch(200, { content: "from openai" });

    const result = await callAI(messages, "openai");

    expect(result.content).toBe("from openai");
    expect(fetch).toHaveBeenCalledWith("/api/ai/openai", expect.any(Object));
  });

  it("should route to Anthropic when provider is 'anthropic'", async () => {
    mockFetch(200, { content: "from anthropic" });

    const result = await callAI(messages, "anthropic");

    expect(fetch).toHaveBeenCalledWith("/api/ai/anthropic", expect.any(Object));
  });

  it("should default to openai when no provider is specified", async () => {
    mockFetch(200, { content: "default" });

    await callAI(messages);

    expect(fetch).toHaveBeenCalledWith("/api/ai/openai", expect.any(Object));
  });

  it("should throw an error for an unknown provider", async () => {
    // @ts-expect-error — intentionally passing invalid value to test runtime guard
    await expect(callAI(messages, "gemini")).rejects.toThrow("Unknown AI provider");
  });
});

// ---------------------------------------------------------------------------
// getConfiguredProviders / isAIConfigured
// ---------------------------------------------------------------------------

describe("getConfiguredProviders", () => {
  it("should return both openai and anthropic", () => {
    const providers = getConfiguredProviders();
    expect(providers).toContain("openai");
    expect(providers).toContain("anthropic");
  });

  it("should always return an array (never null or undefined)", () => {
    expect(Array.isArray(getConfiguredProviders())).toBe(true);
  });
});

describe("isAIConfigured", () => {
  it("should return true (keys are server-side)", () => {
    expect(isAIConfigured()).toBe(true);
  });
});
