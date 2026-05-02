"use client";

import dynamic from "next/dynamic";

/** localStorage sadece tarayıcıda; SSR ile hidrasyon gecikmesi olmasın */
export const CookieConsentLoader = dynamic(
  () => import("./cookie-consent").then((m) => m.CookieConsent),
  { ssr: false, loading: () => null },
);
