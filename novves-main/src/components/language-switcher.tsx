"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LocaleFlag } from "@/components/locale-flags";

const localeConfig = {
  tr: { label: "Türkçe", short: "TR" },
  en: { label: "English", short: "GB" },
  ru: { label: "Русский", short: "RU" },
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
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all duration-150 md:min-h-[44px] md:px-4 md:py-2 ${
          inverted
            ? "border-white/10 bg-white/[0.03] text-white/72 hover:border-white/20 hover:text-white"
            : "border-secondary/15 text-secondary/60 hover:border-primary/30 hover:text-dark"
        }`}
      >
        <LocaleFlag locale={locale} className="h-3.5 w-[1.25rem] md:h-4 md:w-5" />
        <span className="font-mono-eng tabular-nums tracking-wide">{current.short}</span>
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
        <div className="absolute right-0 top-full z-50 mt-2 w-[11rem] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg sm:w-44">
          {Object.entries(localeConfig).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              onClick={() => switchLocale(key)}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] transition-colors duration-150 sm:gap-2.5 sm:px-4 ${
                locale === key
                  ? "bg-primary/5 font-semibold text-primary"
                  : "text-secondary/70 hover:bg-gray-50 hover:text-dark"
              }`}
            >
              <LocaleFlag locale={key} className="h-3.5 w-[1.25rem] sm:h-4 sm:w-5" />
              <span
                className={`w-7 shrink-0 font-mono-eng text-[11px] tabular-nums tracking-wide ${
                  locale === key ? "text-primary/90" : "text-secondary/50"
                }`}
              >
                {cfg.short}
              </span>
              <span className="min-w-0 flex-1">{cfg.label}</span>
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
