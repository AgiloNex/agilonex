import { describe, it, expect } from "vitest";

// Pure functions extracted from ContactSection for isolated testing.
// These should be moved to a shared utils module in a future refactor.

const formatWhatsapp = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const isValidWhatsapp = (value: string): boolean =>
  /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value);

describe("formatWhatsapp", () => {
  it("should return empty string for empty input", () => {
    expect(formatWhatsapp("")).toBe("");
  });

  it("should return '(1' for a single digit", () => {
    expect(formatWhatsapp("1")).toBe("(1");
  });

  it("should format 7 digits as '(11) 99999'", () => {
    expect(formatWhatsapp("1199999")).toBe("(11) 99999");
  });

  it("should format 10-digit landline as '(11) 3333-4444'", () => {
    expect(formatWhatsapp("1133334444")).toBe("(11) 3333-4444");
  });

  it("should format 11-digit mobile as '(11) 99999-9999'", () => {
    expect(formatWhatsapp("11999999999")).toBe("(11) 99999-9999");
  });

  it("should strip non-digit characters before formatting", () => {
    expect(formatWhatsapp("(11) 99999-9999")).toBe("(11) 99999-9999");
  });

  it("should truncate input exceeding 11 digits", () => {
    expect(formatWhatsapp("123456789012")).toBe("(12) 34567-8901");
  });

  it("should return empty string for string with only spaces", () => {
    expect(formatWhatsapp("   ")).toBe("");
  });

  // @security
  it("should return empty string for XSS payload with no digits", () => {
    expect(formatWhatsapp("<script>alert(1)</script>")).toBe("");
  });

  it("should strip unicode/emoji and format remaining digits", () => {
    expect(formatWhatsapp("📱11999999999")).toBe("(11) 99999-9999");
  });
});

describe("isValidWhatsapp", () => {
  it("should return true for a valid mobile '(11) 99999-9999'", () => {
    expect(isValidWhatsapp("(11) 99999-9999")).toBe(true);
  });

  it("should return true for a valid landline '(11) 3333-4444'", () => {
    expect(isValidWhatsapp("(11) 3333-4444")).toBe(true);
  });

  it("should return false for empty string", () => {
    expect(isValidWhatsapp("")).toBe(false);
  });

  it("should return false for raw unformatted digits", () => {
    expect(isValidWhatsapp("11999999999")).toBe(false);
  });

  it("should return false for an incomplete number '(11) 999'", () => {
    expect(isValidWhatsapp("(11) 999")).toBe(false);
  });

  // @security
  it("should return false for an XSS payload", () => {
    expect(isValidWhatsapp("<script>alert(1)</script>")).toBe(false);
  });

  it("should return false for path traversal", () => {
    expect(isValidWhatsapp("../../etc/passwd")).toBe(false);
  });
});

describe("formatWhatsapp → isValidWhatsapp pipeline", () => {
  it("formatted 11-digit number should pass validation", () => {
    expect(isValidWhatsapp(formatWhatsapp("11999999999"))).toBe(true);
  });

  it("formatted 10-digit number should pass validation", () => {
    expect(isValidWhatsapp(formatWhatsapp("1133334444"))).toBe(true);
  });

  it("7-digit incomplete input should fail validation after formatting", () => {
    expect(isValidWhatsapp(formatWhatsapp("1199999"))).toBe(false);
  });

  it("empty input should fail validation after formatting", () => {
    expect(isValidWhatsapp(formatWhatsapp(""))).toBe(false);
  });
});
