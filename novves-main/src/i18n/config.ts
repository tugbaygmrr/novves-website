/**
 * Site dilleri — URL segmenti ISO 639-1 (Çince: zh, Tacikçe: tg, Pakistan / Urduca: ur).
 * Çeviri dosyaları: src/app/[locale]/dictionaries/<kod>/*.json
 */
export const locales = [
  "tr",
  "en",
  "ru",
  "ar",
  "de",
  "it",
  "fr",
  "az",
  "kk",
  "tg",
  "es",
  "zh",
  "ur",
  "lt",
  "pl",
  "ro",
  "hu",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export function hasLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

/** Dil seçici + emoji bayrak (yerel SVG olmayan diller için) */
export const localeUi: Record<
  Locale,
  { label: string; short: string; flagEmoji: string }
> = {
  tr: { label: "Türkçe", short: "TR", flagEmoji: "🇹🇷" },
  en: { label: "English", short: "EN", flagEmoji: "🇬🇧" },
  ru: { label: "Русский", short: "RU", flagEmoji: "🇷🇺" },
  ar: { label: "العربية", short: "AR", flagEmoji: "🇸🇦" },
  de: { label: "Deutsch", short: "DE", flagEmoji: "🇩🇪" },
  it: { label: "Italiano", short: "IT", flagEmoji: "🇮🇹" },
  fr: { label: "Français", short: "FR", flagEmoji: "🇫🇷" },
  az: { label: "Azərbaycan", short: "AZ", flagEmoji: "🇦🇿" },
  kk: { label: "Қазақша", short: "KK", flagEmoji: "🇰🇿" },
  tg: { label: "Тоҷикӣ", short: "TG", flagEmoji: "🇹🇯" },
  es: { label: "Español", short: "ES", flagEmoji: "🇪🇸" },
  zh: { label: "中文", short: "ZH", flagEmoji: "🇨🇳" },
  ur: { label: "اردو", short: "UR", flagEmoji: "🇵🇰" },
  lt: { label: "Lietuvių", short: "LT", flagEmoji: "🇱🇹" },
  pl: { label: "Polski", short: "PL", flagEmoji: "🇵🇱" },
  ro: { label: "Română", short: "RO", flagEmoji: "🇷🇴" },
  hu: { label: "Magyar", short: "HU", flagEmoji: "🇭🇺" },
};

/** Accept-Language ana etiketi → locale (bilinmeyen → tr) */
const ACCEPT_PRIMARY_TO_LOCALE: Record<string, Locale> = {
  tr: "tr",
  en: "en",
  ru: "ru",
  ar: "ar",
  de: "de",
  it: "it",
  fr: "fr",
  az: "az",
  kk: "kk",
  tg: "tg",
  es: "es",
  zh: "zh",
  ur: "ur",
  lt: "lt",
  pl: "pl",
  ro: "ro",
  hu: "hu",
};

export function pickLocaleFromAcceptLanguage(header: string | null): Locale {
  const first = (header ?? "").split(",")[0]?.trim().toLowerCase() ?? "";
  const tag = first.split(";")[0]?.trim() ?? "";
  const primary = tag.split("-")[0];
  return ACCEPT_PRIMARY_TO_LOCALE[primary] ?? defaultLocale;
}

/** <html lang="…"> — Çince için BCP 47 */
export const htmlLangOverride: Partial<Record<Locale, string>> = {
  zh: "zh-Hans",
};
