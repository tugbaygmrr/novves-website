"use client";

import * as React from "react";
import { UploadCloud, FileText, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/panel/cn";
import { readCsrf } from "@/lib/panel/csrf";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const ACCEPT =
  ".pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar," +
  "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Doküman/belge yükleme alanı — /api/admin/upload'a yükler, dosya yolunu döndürür. */
export function FileField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const str = typeof value === "string" ? value : "";
  const fileName = str ? str.split("/").pop() : "";

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
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
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
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-panel-surface-2 text-panel-accent">
          <FileText className="h-4 w-4" />
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-panel-accent px-3 py-1.5 text-[12.5px] font-semibold text-panel-accent-fg transition hover:brightness-105 disabled:opacity-50"
        >
          {uploading ? <Spinner className="h-3.5 w-3.5" /> : <UploadCloud className="h-4 w-4" />}
          {uploading ? "Yükleniyor…" : "Belge yükle"}
        </button>
        {str ? (
          <a
            href={str}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-0 items-center gap-1 text-[12px] font-medium text-panel-fg-muted hover:text-panel-accent"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{fileName}</span>
          </a>
        ) : (
          <span className="text-[11px] text-panel-fg-subtle">veya sürükle-bırak (PDF, DWG, DOCX…)</span>
        )}
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
        placeholder="/documents/… veya tam URL"
      />
      {error && <p className="text-[12px] font-medium text-panel-danger">{error}</p>}
    </div>
  );
}
