"use client";

import { CookieConsent } from "./cookie-consent";

export function CookieConsentLoader({ locale }: { locale: string }) {
  return <CookieConsent locale={locale} />;
}
