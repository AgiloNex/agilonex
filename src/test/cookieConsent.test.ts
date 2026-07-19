import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  COOKIE_CONSENT_NAME,
  COOKIE_CONSENT_MAX_AGE,
  readCookieConsent,
  writeCookieConsent,
  acceptAllConsent,
  rejectNonEssentialConsent,
  type CookieConsentCategories,
} from "@/lib/cookieConsent";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const buildCookieString = (value: object) =>
  `${COOKIE_CONSENT_NAME}=${encodeURIComponent(JSON.stringify(value))}`;

const setCookie = (value: object) => {
  Object.defineProperty(document, "cookie", {
    writable: true,
    configurable: true,
    value: buildCookieString(value),
  });
};

const clearCookie = () => {
  Object.defineProperty(document, "cookie", {
    writable: true,
    configurable: true,
    value: "",
  });
};

// ---------------------------------------------------------------------------
// readCookieConsent
// ---------------------------------------------------------------------------

describe("readCookieConsent", () => {
  afterEach(clearCookie);

  it("should return null when no consent cookie is set", () => {
    clearCookie();
    expect(readCookieConsent()).toBeNull();
  });

  it("should return a valid CookieConsentState when a well-formed cookie exists", () => {
    const stored = {
      necessary: true,
      functionality: true,
      analytics: false,
      advertising: false,
      updatedAt: 1700000000000,
    };
    setCookie(stored);

    const result = readCookieConsent();

    expect(result).not.toBeNull();
    expect(result?.necessary).toBe(true);
    expect(result?.functionality).toBe(true);
    expect(result?.analytics).toBe(false);
    expect(result?.advertising).toBe(false);
  });

  it("should always enforce necessary: true even if the stored cookie has necessary: false", () => {
    // A tampered or old cookie with necessary=false must be sanitized
    setCookie({ necessary: false, functionality: true, analytics: true, advertising: true, updatedAt: 1 });
    const result = readCookieConsent();
    expect(result?.necessary).toBe(true);
  });

  it("should return null when the analytics field is missing (invalid schema)", () => {
    // Guards against incomplete cookie data going undetected
    setCookie({ necessary: true, functionality: true, updatedAt: 1 });
    expect(readCookieConsent()).toBeNull();
  });

  it("should return null when the cookie value is malformed JSON", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      configurable: true,
      value: `${COOKIE_CONSENT_NAME}=not-valid-json`,
    });
    expect(readCookieConsent()).toBeNull();
  });

  it("should ignore other cookies and only read the consent cookie", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      configurable: true,
      value: `other_cookie=somevalue; ${buildCookieString({
        necessary: true,
        functionality: false,
        analytics: true,
        advertising: false,
        updatedAt: 1,
      })}`,
    });
    const result = readCookieConsent();
    expect(result?.analytics).toBe(true);
  });

  // @security — XSS payload in cookie value must not throw or execute
  it("should return null when the cookie contains an XSS payload", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      configurable: true,
      value: `${COOKIE_CONSENT_NAME}=${encodeURIComponent("<script>alert(1)</script>")}`,
    });
    expect(readCookieConsent()).toBeNull();
  });

  // @security — extremely large cookie value must not cause issues
  it("should return null when the cookie value is excessively large", () => {
    const huge = "A".repeat(1_000_000);
    Object.defineProperty(document, "cookie", {
      writable: true,
      configurable: true,
      value: `${COOKIE_CONSENT_NAME}=${encodeURIComponent(huge)}`,
    });
    expect(readCookieConsent()).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// writeCookieConsent
// ---------------------------------------------------------------------------

describe("writeCookieConsent", () => {
  let dispatchedEvent: CustomEvent | null = null;

  beforeEach(() => {
    dispatchedEvent = null;
    window.addEventListener("cookie-consent-updated", (e) => {
      dispatchedEvent = e as CustomEvent;
    });
  });

  afterEach(() => {
    clearCookie();
    window.removeEventListener("cookie-consent-updated", () => {});
  });

  it("should write a cookie string containing the consent data", () => {
    const consent: CookieConsentCategories = {
      necessary: true,
      functionality: true,
      analytics: false,
      advertising: true,
    };

    writeCookieConsent(consent);

    expect(document.cookie).toContain(COOKIE_CONSENT_NAME);
    expect(document.cookie).toContain(encodeURIComponent('"analytics":false'));
  });

  it("should always enforce necessary: true in the written value", () => {
    // TypeScript types prevent this, but the runtime must also guard it
    writeCookieConsent({ necessary: true, functionality: false, analytics: false, advertising: false });
    // Re-read and confirm
    const result = readCookieConsent();
    expect(result?.necessary).toBe(true);
  });

  it("should set the correct max-age in the cookie string", () => {
    writeCookieConsent({ necessary: true, functionality: false, analytics: false, advertising: false });
    expect(document.cookie).toContain(`max-age=${COOKIE_CONSENT_MAX_AGE}`);
  });

  it("should dispatch a 'cookie-consent-updated' CustomEvent on the window", () => {
    writeCookieConsent({ necessary: true, functionality: true, analytics: true, advertising: true });
    expect(dispatchedEvent).not.toBeNull();
    expect(dispatchedEvent?.detail.analytics).toBe(true);
  });

  it("should return the full CookieConsentState with an updatedAt timestamp", () => {
    const before = Date.now();
    const result = writeCookieConsent({ necessary: true, functionality: false, analytics: false, advertising: false });
    const after = Date.now();

    expect(result.updatedAt).toBeGreaterThanOrEqual(before);
    expect(result.updatedAt).toBeLessThanOrEqual(after);
  });

  it("should be idempotent — calling twice with same args produces equivalent state", () => {
    const consent: CookieConsentCategories = { necessary: true, functionality: true, analytics: false, advertising: false };
    const first = writeCookieConsent(consent);
    const second = writeCookieConsent(consent);

    expect(first.analytics).toBe(second.analytics);
    expect(first.functionality).toBe(second.functionality);
    expect(first.necessary).toBe(second.necessary);
  });
});

// ---------------------------------------------------------------------------
// acceptAllConsent
// ---------------------------------------------------------------------------

describe("acceptAllConsent", () => {
  afterEach(clearCookie);

  it("should set all consent categories to true", () => {
    const result = acceptAllConsent();

    expect(result.necessary).toBe(true);
    expect(result.functionality).toBe(true);
    expect(result.analytics).toBe(true);
    expect(result.advertising).toBe(true);
  });

  it("should persist the all-accepted state so readCookieConsent returns it", () => {
    acceptAllConsent();
    const saved = readCookieConsent();

    expect(saved?.analytics).toBe(true);
    expect(saved?.advertising).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// rejectNonEssentialConsent
// ---------------------------------------------------------------------------

describe("rejectNonEssentialConsent", () => {
  afterEach(clearCookie);

  it("should keep necessary true and set all other categories to false", () => {
    const result = rejectNonEssentialConsent();

    expect(result.necessary).toBe(true);
    expect(result.functionality).toBe(false);
    expect(result.analytics).toBe(false);
    expect(result.advertising).toBe(false);
  });

  it("should overwrite a previously accepted consent", () => {
    acceptAllConsent();
    rejectNonEssentialConsent();

    const saved = readCookieConsent();
    expect(saved?.analytics).toBe(false);
    expect(saved?.advertising).toBe(false);
  });

  it("should be idempotent — calling twice does not change the outcome", () => {
    rejectNonEssentialConsent();
    const first = readCookieConsent();

    rejectNonEssentialConsent();
    const second = readCookieConsent();

    expect(first?.analytics).toBe(second?.analytics);
    expect(first?.functionality).toBe(second?.functionality);
  });
});

// ---------------------------------------------------------------------------
// Constants — guard against accidental changes
// ---------------------------------------------------------------------------

describe("COOKIE_CONSENT constants", () => {
  it("should have the correct cookie name to avoid collisions", () => {
    expect(COOKIE_CONSENT_NAME).toBe("agilonex_cookie_consent");
  });

  it("should have a max-age of 180 days (15_552_000 seconds)", () => {
    expect(COOKIE_CONSENT_MAX_AGE).toBe(60 * 60 * 24 * 180);
  });
});
