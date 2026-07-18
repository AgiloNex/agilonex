export const COOKIE_CONSENT_NAME = "agilonex_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type CookieConsentCategories = {
  necessary: true;
  functionality: boolean;
  analytics: boolean;
  advertising: boolean;
};

export type CookieConsentState = CookieConsentCategories & {
  updatedAt: number;
};

const defaultConsent = (): CookieConsentState => ({
  necessary: true,
  functionality: false,
  analytics: false,
  advertising: false,
  updatedAt: Date.now(),
});

export const readCookieConsent = (): CookieConsentState | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT_NAME}=`));

  if (!match) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(match.split("=")[1])) as CookieConsentState;
    if (typeof parsed.analytics !== "boolean") return null;
    return { ...defaultConsent(), ...parsed, necessary: true };
  } catch {
    return null;
  }
};

export const writeCookieConsent = (consent: CookieConsentCategories) => {
  const value: CookieConsentState = {
    ...consent,
    necessary: true,
    updatedAt: Date.now(),
  };

  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(JSON.stringify(value))}; path=/; max-age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: value }));
  return value;
};

export const acceptAllConsent = () =>
  writeCookieConsent({ necessary: true, functionality: true, analytics: true, advertising: true });

export const rejectNonEssentialConsent = () => writeCookieConsent(defaultConsent());
