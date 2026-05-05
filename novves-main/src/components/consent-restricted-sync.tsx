"use client";

import { useEffect } from "react";
import {
  COOKIE_CONSENT_EVENT,
  syncConsentRestrictedCookieFromStorage,
} from "@/lib/cookie-consent-storage";

/** İlk yüklemede ve çerez tercihi değişince localStorage → tarayıcı çerezi senkronu (proxy ile uyum). */
export function ConsentRestrictedCookieSync() {
  useEffect(() => {
    syncConsentRestrictedCookieFromStorage();
    const onUpdate = () => syncConsentRestrictedCookieFromStorage();
    window.addEventListener(COOKIE_CONSENT_EVENT, onUpdate);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onUpdate);
  }, []);

  return null;
}
