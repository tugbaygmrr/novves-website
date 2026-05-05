"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { htmlLangOverride } from "@/i18n/config";

const RTL_LOCALES = new Set<Locale>(["ar", "ur"]);

export function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const loc = locale as Locale;
    root.lang = htmlLangOverride[loc] ?? locale;
    root.dir = RTL_LOCALES.has(loc) ? "rtl" : "ltr";
    root.dataset.theme = "light";
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
  }, [locale]);

  return null;
}
