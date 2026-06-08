"use client";

import { localeUi, locales } from "@/i18n/config";

const LOCALE_OPTIONS = locales.map((code) => ({
  code,
  label: localeUi[code].label,
  flag: localeUi[code].flagEmoji,
}));

export function LocalePicker({
  locale,
  onChange,
  onCopyFromTr,
  copying,
  disabled,
}: {
  locale: string;
  onChange: (locale: string) => void;
  onCopyFromTr?: () => void;
  copying?: boolean;
  disabled?: boolean;
}) {
  if (disabled) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="locale-select" className="text-[14px] font-semibold text-gray-600">
          Dil:
        </label>
        <select
          id="locale-select"
          value={locale}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[44px] rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[15px] font-medium text-gray-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          {LOCALE_OPTIONS.map((l) => (
            <option key={l.code} value={l.code}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>
      {onCopyFromTr && locale !== "tr" && (
        <button
          type="button"
          onClick={onCopyFromTr}
          disabled={copying}
          className="min-h-[44px] rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-[14px] font-semibold text-orange-600 transition-colors hover:bg-orange-100 disabled:opacity-50"
        >
          {copying ? "Kopyalanıyor..." : "Türkçe'den kopyala"}
        </button>
      )}
    </div>
  );
}
