"use client";

import { useEffect } from "react";

export function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dataset.theme = "light";
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
  }, [locale]);

  return null;
}
