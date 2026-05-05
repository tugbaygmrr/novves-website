"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import {
  COOKIE_CONSENT_EVENT,
  isConsentRestrictedMinimal,
  parseStoredConsentJson,
  readCookieConsentRaw,
} from "@/lib/cookie-consent-storage";

export function TechnicalCenterGate({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useLayoutEffect(() => {
    const check = () => {
      const restricted = isConsentRestrictedMinimal(parseStoredConsentJson(readCookieConsentRaw()));
      if (restricted) router.replace(`/${locale}`);
    };

    check();
    window.addEventListener(COOKIE_CONSENT_EVENT, check as EventListener);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, check as EventListener);
  }, [locale, router]);

  return <>{children}</>;
}
