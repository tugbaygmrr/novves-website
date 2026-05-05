"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () => import("./cookie-consent").then((m) => m.CookieConsent),
  { ssr: false, loading: () => null },
);

export function CookieConsentLoader({ locale }: { locale: string }) {
  return <CookieConsent locale={locale} />;
}
