const FLAG_SRC: Record<"tr" | "en" | "ru", string> = {
  tr: "/images/flags/tr.svg",
  en: "/images/flags/gb.svg",
  ru: "/images/flags/ru.svg",
};

export function LocaleFlag({
  locale,
  className = "",
}: {
  locale: string;
  className?: string;
}) {
  const key = locale === "en" || locale === "tr" || locale === "ru" ? locale : "tr";
  return (
    <img
      src={FLAG_SRC[key]}
      alt=""
      width={20}
      height={14}
      decoding="async"
      className={`inline-block shrink-0 rounded-[3px] border border-black/[0.06] object-cover shadow-sm ${className}`}
    />
  );
}
