"use client";

import * as React from "react";
import { Search, UploadCloud, FileText, ImageIcon, Check, X } from "lucide-react";
import { apiGet } from "@/lib/panel/api";
import { readCsrf } from "@/lib/panel/csrf";
import { formatBytes } from "@/lib/panel/format";
import { toast } from "@/lib/panel/stores/toast-store";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export interface MediaItem {
  id: number;
  kind: "IMAGE" | "DOCUMENT";
  fileName: string;
  path: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
  createdAt?: string;
}

export interface MediaRef {
  id: number;
  path: string;
  fileName?: string;
}

export function MediaPickerDialog({
  open,
  onClose,
  onSelect,
  kind = "IMAGE",
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
  kind?: "IMAGE" | "DOCUMENT";
}) {
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const json = await apiGet<{ items: MediaItem[] }>(
        `/api/admin/media?kind=${kind}&q=${encodeURIComponent(q)}`,
      );
      setItems(json.items);
    } catch {
      toast.error("Medya yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [kind, q]);

  React.useEffect(() => {
    if (open) load();
  }, [open, load]);

  async function upload(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        headers: { "x-csrf-token": readCsrf() },
        body: form,
      });
      const json = await res.json();
      if (!res.ok || !json.media) {
        toast.error(json.error || "Yükleme başarısız");
        return;
      }
      onSelect(json.media as MediaItem);
      onClose();
    } catch {
      toast.error("Sunucu hatası");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const accept =
    kind === "IMAGE"
      ? "image/png,image/webp,image/avif,image/jpeg,image/gif"
      : ".pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar";

  return (
    <Dialog open={open} onClose={onClose} size="xl" title="Medya Seç" hideClose>
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panel-fg-subtle" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Dosya ara…"
            className="pl-9"
          />
        </div>
        <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()} loading={uploading}>
          {!uploading && <UploadCloud className="h-4 w-4" />}
          Yükle
        </Button>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-surface-2"
          aria-label="Kapat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="panel-scroll max-h-[55vh] overflow-y-auto">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Spinner className="h-6 w-6 text-panel-accent" />
          </div>
        ) : items.length === 0 ? (
          <p className="py-12 text-center text-[13px] text-panel-fg-muted">Sonuç yok.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
            {items.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  onSelect(m);
                  onClose();
                }}
                className="group flex flex-col overflow-hidden rounded-xl border border-panel-border bg-panel-surface text-left transition-all hover:border-panel-accent"
              >
                <div className="flex aspect-square items-center justify-center bg-panel-surface-2">
                  {m.kind === "IMAGE" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.path} alt={m.alt ?? ""} className="h-full w-full object-contain" />
                  ) : (
                    <FileText className="h-8 w-8 text-panel-fg-subtle" />
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-[11.5px] font-medium text-panel-fg">{m.fileName}</p>
                  <p className="text-[10.5px] text-panel-fg-subtle">{formatBytes(m.size)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}

/** ID tabanlı medya alanı (cover/photo/logo/file) — değer {id, path} tutar. */
export function MediaPickerField({
  value,
  onChange,
  kind = "IMAGE",
  placeholder = "Görsel seçilmedi",
}: {
  value: MediaRef | null;
  onChange: (v: MediaRef | null) => void;
  kind?: "IMAGE" | "DOCUMENT";
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-panel-border bg-panel-surface-2">
        {value ? (
          kind === "IMAGE" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.path} alt="" className="h-full w-full object-contain" />
          ) : (
            <FileText className="h-7 w-7 text-panel-fg-subtle" />
          )
        ) : kind === "IMAGE" ? (
          <ImageIcon className="h-6 w-6 text-panel-fg-subtle" />
        ) : (
          <FileText className="h-6 w-6 text-panel-fg-subtle" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        {value ? (
          <p className="flex items-center gap-1.5 truncate text-[13px] font-medium text-panel-fg">
            <Check className="h-3.5 w-3.5 text-panel-success" />
            {value.fileName ?? value.path}
          </p>
        ) : (
          <p className="text-[13px] text-panel-fg-subtle">{placeholder}</p>
        )}
        <div className="mt-1.5 flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            {value ? "Değiştir" : "Seç"}
          </Button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-[12.5px] font-medium text-panel-fg-muted transition-colors hover:text-panel-danger"
            >
              Kaldır
            </button>
          )}
        </div>
      </div>
      <MediaPickerDialog
        open={open}
        onClose={() => setOpen(false)}
        kind={kind}
        onSelect={(m) => onChange({ id: m.id, path: m.path, fileName: m.fileName })}
      />
    </div>
  );
}
