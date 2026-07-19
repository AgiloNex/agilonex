import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getLanguageFromPath } from "@/i18n/LanguageContext";

// ---------------------------------------------------------------------------
// getLanguageFromPath — exported pure-ish function (depends only on arg)
// ---------------------------------------------------------------------------

describe("getLanguageFromPath", () => {
  it("should return 'pt' when pathname starts with /pt", () => {
    expect(getLanguageFromPath("/pt")).toBe("pt");
  });

  it("should return 'en' when pathname starts with /en", () => {
    expect(getLanguageFromPath("/en")).toBe("en");
  });

  it("should return 'es' when pathname starts with /es", () => {
    expect(getLanguageFromPath("/es")).toBe("es");
  });

  it("should return 'en' for a deep path like /en/about/team", () => {
    expect(getLanguageFromPath("/en/about/team")).toBe("en");
  });

  it("should return null for an unknown language segment like /fr/page", () => {
    expect(getLanguageFromPath("/fr/page")).toBeNull();
  });

  it("should return null for the root path /", () => {
    expect(getLanguageFromPath("/")).toBeNull();
  });

  it("should return null for an empty string", () => {
    expect(getLanguageFromPath("")).toBeNull();
  });

  it("should return null for a path with no language prefix like /about", () => {
    expect(getLanguageFromPath("/about")).toBeNull();
  });

  it("should return null when the segment is a partial match like /english", () => {
    // 'english' starts with 'en' but is not a valid language code
    expect(getLanguageFromPath("/english")).toBeNull();
  });

  it("should return null for path traversal attempts", () => {
    // @security — ensure path traversal strings do not accidentally match
    expect(getLanguageFromPath("/../../etc/passwd")).toBeNull();
    expect(getLanguageFromPath("/../en")).toBeNull();
  });

  it("should handle paths with query strings gracefully (first segment check)", () => {
    // getLanguageFromPath receives pathname only — but defensive test
    expect(getLanguageFromPath("/pt?ref=google")).toBeNull(); // '?ref=google' is not 'pt'
    // Note: this confirms the function only matches exact segment values
  });
});
