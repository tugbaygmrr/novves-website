"use client";

import * as React from "react";
import { UploadCloud, ImageIcon, X, FolderOpen } from "lucide-react";
import { cn } from "@/lib/panel/cn";
import { readCsrf } from "@/lib/panel/csrf";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

export function ImageField({
  value,
  onChange,
  onBrowse,
}: {
  value: string;
  onChange: (v: string) => void;
  /** Faz 5: medya kütüphanesinden seçim. Verilirse "Kütüphane" butonu görünür. */
  onBrowse?: (pick: (path: string) => void) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const str = typeof value === "string" ? value : "";

  async function upload(file: File) {
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-csrf-token": readCsrf() },
        body: form,
      });
      const json = await res.json();
      if (!res.ok || !json.path) {
        setError(json.error || "Yükleme başarısız");
        return;
      }
      onChange(json.path);
    } catch {
      setError("Sunucu hatası");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2.5">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/webp,image/avif,image/jpeg,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
      <div className="flex items-start gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-panel-border bg-panel-surface-2">
          {str ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={str} alt="" className="h-full w-full object-contain" />
          ) : (
            <ImageIcon className="h-7 w-7 text-panel-fg-subtle" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f) upload(f);
            }}
            className={cn(
              "flex flex-wrap items-center gap-2 rounded-lg border border-dashed px-2 py-1.5 transition-colors",
              dragOver ? "border-panel-accent bg-panel-accent-soft" : "border-panel-border",
            )}
          >
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-panel-accent px-3 py-1.5 text-[12.5px] font-semibold text-panel-accent-fg transition hover:brightness-105 disabled:opacity-50"
            >
              {uploading ? <Spinner className="h-3.5 w-3.5" /> : <UploadCloud className="h-4 w-4" />}
              {uploading ? "Yükleniyor…" : "Yükle"}
            </button>
            {onBrowse && (
              <button
                type="button"
                onClick={() => onBrowse(onChange)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-panel-border bg-panel-surface px-3 py-1.5 text-[12.5px] font-medium text-panel-fg transition hover:bg-panel-surface-2"
              >
                <FolderOpen className="h-4 w-4" />
                Kütüphane
              </button>
            )}
            <span className="text-[11px] text-panel-fg-subtle">veya sürükle-bırak</span>
            {str && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[12px] font-medium text-panel-fg-muted transition hover:text-panel-danger"
              >
                <X className="h-3.5 w-3.5" />
                Kaldır
              </button>
            )}
          </div>
          <Input
            value={str}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/… veya tam URL"
          />
        </div>
      </div>
      {error && <p className="text-[12px] font-medium text-panel-danger">{error}</p>}
    </div>
  );
}
