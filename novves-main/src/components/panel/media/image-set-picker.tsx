"use client";

import * as React from "react";
import { UploadCloud, Check, X, Trash2, Plus, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { apiGet, apiPut } from "@/lib/panel/api";
import { readCsrf } from "@/lib/panel/csrf";
import { toast } from "@/lib/panel/stores/toast-store";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const ENDPOINT = "/api/admin/product-image-set";

/** Küratel "Görsel Seti" diyaloğu: galeriden seç, admin yükle/sil. */
export function ImageSetPickerDialog({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
}) {
  const [images, setImages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [manage, setManage] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const json = await apiGet<{ images: string[] }>(ENDPOINT);
      setImages(json.images ?? []);
    } catch {
      toast.error("Görsel seti yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (open) load();
  }, [open, load]);

  async function upload(files: FileList) {
    setUploading(true);
    const added: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/media/upload", {
          method: "POST",
          headers: { "x-csrf-token": readCsrf() },
          body: form,
        });
        const json = await res.json();
        if (res.ok && json.media?.path) added.push(json.media.path);
      } catch {
        /* sonraki */
      }
    }
    if (added.length) {
      const next = [...added, ...images.filter((i) => !added.includes(i))];
      try {
        const json = await apiPut<{ images: string[] }>(ENDPOINT, { images: next });
        setImages(json.images);
        toast.success(`${added.length} görsel sete eklendi`);
      } catch {
        toast.error("Sete eklenemedi");
      }
    } else {
      toast.error("Yükleme başarısız");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function removeFromSet(path: string) {
    const next = images.filter((i) => i !== path);
    setImages(next);
    try {
      await apiPut(ENDPOINT, { images: next });
    } catch {
      toast.error("Kaldırılamadı");
      load();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} size="xl" title="Görsel Seti" hideClose>
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/png,image/webp,image/avif,image/jpeg"
        className="hidden"
        onChange={(e) => e.target.files && upload(e.target.files)}
      />
      <div className="mb-3 flex items-center gap-2">
        <p className="flex-1 text-[12.5px] text-panel-fg-muted">
          {manage ? "Yönetim: görselleri setten kaldırabilirsin." : "Bir görsele tıklayıp seç."}
        </p>
        <Button variant="secondary" size="sm" onClick={() => setManage((v) => !v)}>
          {manage ? "Bitti" : "Yönet"}
        </Button>
        <Button size="sm" onClick={() => fileRef.current?.click()} loading={uploading}>
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
        ) : images.length === 0 ? (
          <p className="py-12 text-center text-[13px] text-panel-fg-muted">
            Set boş. &quot;Yükle&quot; ile görsel ekleyin.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
            {images.map((path) => (
              <div
                key={path}
                className="group relative overflow-hidden rounded-xl border border-panel-border bg-panel-surface"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (manage) return;
                    onSelect(path);
                    onClose();
                  }}
                  className="flex aspect-square w-full items-center justify-center bg-panel-surface-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={path} alt="" className="h-full w-full object-contain" />
                </button>
                {manage && (
                  <button
                    type="button"
                    onClick={() => removeFromSet(path)}
                    className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-lg bg-black/55 text-white opacity-0 transition-opacity hover:bg-panel-danger group-hover:opacity-100"
                    aria-label="Setten kaldır"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}

/** Tek görsel alanı — setten seçer. */
export function ImageSetField({
  value,
  onChange,
  placeholder = "Görsel seçilmedi",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-panel-border bg-panel-surface-2">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-contain" />
        ) : (
          <ImageIcon className="h-6 w-6 text-panel-fg-subtle" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        {value ? (
          <p className="flex items-center gap-1.5 truncate text-[12.5px] font-medium text-panel-fg">
            <Check className="h-3.5 w-3.5 text-panel-success" />
            {value.split("/").pop()?.split("?")[0]}
          </p>
        ) : (
          <p className="text-[13px] text-panel-fg-subtle">{placeholder}</p>
        )}
        <div className="mt-1.5 flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            {value ? "Değiştir" : "Setten seç"}
          </Button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[12.5px] font-medium text-panel-fg-muted transition-colors hover:text-panel-danger"
            >
              Kaldır
            </button>
          )}
        </div>
      </div>
      <ImageSetPickerDialog open={open} onClose={() => setOpen(false)} onSelect={onChange} />
    </div>
  );
}

/** Çoklu görsel — setten seçilen path listesi (sırala/kaldır/ekle). */
export function ImageSetList({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  function move(from: number, to: number) {
    if (to < 0 || to >= value.length) return;
    const arr = [...value];
    const [m] = arr.splice(from, 1);
    arr.splice(to, 0, m);
    onChange(arr);
  }
  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
        {value.map((path, i) => (
          <div
            key={`${path}-${i}`}
            className="group relative overflow-hidden rounded-xl border border-panel-border bg-panel-surface-2"
          >
            <div className="flex aspect-square items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={path} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/45 px-1 py-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="rounded p-0.5 text-white/80 hover:text-white disabled:opacity-30" aria-label="Sola">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, x) => x !== i))} className="rounded p-0.5 text-white/80 hover:text-panel-danger" aria-label="Kaldır">
                <X className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} className="rounded p-0.5 text-white/80 hover:text-white disabled:opacity-30" aria-label="Sağa">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-panel-border text-panel-fg-subtle transition-colors hover:border-panel-accent hover:text-panel-accent"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
      <ImageSetPickerDialog open={open} onClose={() => setOpen(false)} onSelect={(p) => onChange([...value, p])} />
    </div>
  );
}
