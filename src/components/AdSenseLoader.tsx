import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { readCookieConsent } from "@/lib/cookieConsent";

const AdSenseLoader = () => {
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      const consent = readCookieConsent();
      setAdvertising(consent?.advertising ?? false);
    };

    updateConsent();

    window.addEventListener("cookie-consent-updated", updateConsent);
    return () => window.removeEventListener("cookie-consent-updated", updateConsent);
  }, []);

  useEffect(() => {
    const SCRIPT_SRC = "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    const existing = document.querySelector(`script[src*="${SCRIPT_SRC}"]`);

    if (!advertising && existing) {
      existing.remove();
    }

    if (advertising && !existing && env.adsense.clientId) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://${SCRIPT_SRC}?client=${env.adsense.clientId}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [advertising]);

  return null;
};

export default AdSenseLoader;