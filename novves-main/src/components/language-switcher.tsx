"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const localeConfig = {
  tr: { label: "Türkçe", flag: "🇹🇷", short: "TR" },
  en: { label: "English", flag: "🇬🇧", short: "EN" },
  ru: { label: "Русский", flag: "🇷🇺", short: "RU" },
} as const;

export function LanguageSwitcher({
  locale,
  inverted = false,
}: {
  locale: string;
  inverted?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  const current = localeConfig[locale as keyof typeof localeConfig] ?? localeConfig.tr;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all duration-150 ${
          inverted
            ? "border-white/10 bg-white/[0.03] text-white/72 hover:border-white/20 hover:text-white"
            : "border-secondary/15 text-secondary/60 hover:border-primary/30 hover:text-dark"
        }`}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.short}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${
            inverted ? "text-white/38" : "text-secondary/30"
          } ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {Object.entries(localeConfig).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              onClick={() => switchLocale(key)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] transition-colors duration-150 ${
                locale === key
                  ? "bg-primary/5 font-semibold text-primary"
                  : "text-secondary/70 hover:bg-gray-50 hover:text-dark"
              }`}
            >
              <span className="text-lg leading-none">{cfg.flag}</span>
              <span>{cfg.label}</span>
              {locale === key && (
                <svg className="ml-auto h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
