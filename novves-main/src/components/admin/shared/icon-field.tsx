"use client";

import { ADMIN_ICON_PRESETS } from "@/lib/admin/icon-presets";
import { HomeContentIcon } from "@/components/home-content-icon";

const inputClass =
  "w-full min-h-[44px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

export function IconField({
  value,
  onChange,
  imageValue,
  onImageChange,
  showCustomImage = true,
}: {
  value: string;
  onChange: (v: string) => void;
  imageValue?: string;
  onImageChange?: (v: string) => void;
  showCustomImage?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
          <HomeContentIcon name={value} image={imageValue} className="h-6 w-6" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">İkon seçin</option>
          {ADMIN_ICON_PRESETS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      {showCustomImage && onImageChange && (
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-gray-500">
            Özel ikon görseli (opsiyonel, /images/...)
          </label>
          <input
            type="text"
            value={imageValue ?? ""}
            onChange={(e) => onImageChange(e.target.value)}
            className={inputClass}
            placeholder="/images/icons/..."
          />
        </div>
      )}
    </div>
  );
}
