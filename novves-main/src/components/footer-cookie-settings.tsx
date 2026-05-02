"use client";

import { resetCookieConsent } from "@/lib/cookie-consent-storage";

export function FooterCookieSettings({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => resetCookieConsent()}
      className="text-[11px] tracking-wide text-white/88 transition-colors duration-300 hover:text-white"
    >
      {label}
    </button>
  );
}
