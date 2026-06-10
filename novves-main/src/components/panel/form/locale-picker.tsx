"use client";

import { locales, localeUi } from "@/i18n/config";
import { Select } from "../ui/select";

/** Tüm site dilleri için dil seçici (15 dil). filled: içeriği dolu diller (✓ ile işaretlenir). */
export function LocalePicker({
  value,
  onChange,
  filled,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  filled?: string[];
  className?: string;
}) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className ?? "w-auto min-w-[170px]"}
    >
      {locales.map((code) => {
        const ui = localeUi[code];
        const has = filled?.includes(code);
        return (
          <option key={code} value={code}>
            {ui.flagEmoji} {ui.label}
            {has ? "  ✓" : ""}
          </option>
        );
      })}
    </Select>
  );
}

export { locales as PANEL_LOCALES };
