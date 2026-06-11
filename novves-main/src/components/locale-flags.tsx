import type { Locale } from "@/i18n/config";
import { localeUi } from "@/i18n/config";

/** Yerel SVG bayraklar — dosya adları ülke/bölge kodu (dil kodundan farklı olabilir) */
const FLAG_SRC: Partial<Record<Locale, string>> = {
  tr: "/images/flags/tr.svg",
  en: "/images/flags/gb.svg",
  ru: "/images/flags/ru.svg",
  ar: "/images/flags/sa.svg",
  de: "/images/flags/de.svg",
  it: "/images/flags/it.svg",
  fr: "/images/flags/fr.svg",
  az: "/images/flags/az.svg",
  kk: "/images/flags/kz.svg",
  tg: "/images/flags/tj.svg",
  es: "/images/flags/es.svg",
  zh: "/images/flags/cn.svg",
  ur: "/images/flags/pk.svg",
  lt: "/images/flags/lt.svg",
  pl: "/images/flags/pl.svg",
  ro: "/images/flags/ro.svg",
  hu: "/images/flags/hu.svg",
};

export function LocaleFlag({
  locale,
  className = "",
}: {
  locale: string;
  className?: string;
}) {
  const src = FLAG_SRC[locale as Locale];
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={20}
        height={14}
        decoding="async"
        className={`inline-block shrink-0 rounded-[3px] border border-black/[0.06] object-cover shadow-sm ${className}`}
      />
    );
  }

  const emoji =
    localeUi[locale as Locale]?.flagEmoji ??
    localeUi.tr.flagEmoji;

  return (
    <span
      className={`inline-flex h-[14px] min-w-[20px] shrink-0 items-center justify-center text-[13px] leading-none ${className}`}
      aria-hidden
    >
      {emoji}
    </span>
  );
}
