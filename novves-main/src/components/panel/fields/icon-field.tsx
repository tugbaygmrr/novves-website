"use client";

import { ADMIN_ICON_PRESETS } from "@/lib/admin/icon-presets";
import { HomeContentIcon } from "@/components/home-content-icon";
import { Select } from "../ui/select";
import { ImageField } from "./image-field";

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
  const hasCustomImage = Boolean(imageValue && imageValue.trim());

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-panel-border bg-panel-surface-2 px-3 py-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-panel-surface text-panel-accent panel-shadow-sm">
          <HomeContentIcon name={value} image={imageValue} className="h-6 w-6" />
        </span>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={hasCustomImage}
        >
          <option value="">İkon seçin…</option>
          {ADMIN_ICON_PRESETS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>

      {showCustomImage && onImageChange && (
        <div>
          <p className="mb-1.5 text-[12px] font-medium text-panel-fg-muted">
            {hasCustomImage
              ? "Özel ikon görseli kullanılıyor (kaldırınca ikon listesi aktifleşir)"
              : "Veya kendi ikon görselinizi yükleyin (opsiyonel)"}
          </p>
          <ImageField value={imageValue ?? ""} onChange={onImageChange} />
        </div>
      )}
    </div>
  );
}
