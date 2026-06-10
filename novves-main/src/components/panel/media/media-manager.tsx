"use client";

import * as React from "react";
import { UploadCloud, FileText, Trash2, Copy, Image as ImageIcon, Search } from "lucide-react";
import { apiGet, apiPatch, apiDelete } from "@/lib/panel/api";
import { readCsrf } from "@/lib/panel/csrf";
import { formatBytes, formatDateTr } from "@/lib/panel/format";
import { toast } from "@/lib/panel/stores/toast-store";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Input } from "@/components/panel/ui/input";
import { Select } from "@/components/panel/ui/select";
import { Button } from "@/components/panel/ui/button";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { EmptyState } from "@/components/panel/ui/empty-state";
import { Pagination } from "@/components/panel/ui/pagination";
import { Dialog } from "@/components/panel/ui/dialog";
import { Field } from "@/components/panel/form/field";
import { ConfirmDialog } from "@/components/panel/ui/confirm-dialog";
import type { MediaItem } from "./media-picker";

export function MediaManager() {
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(40);
  const [page, setPage] = React.useState(1);
  const [q, setQ] = React.useState("");
  const [kind, setKind] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const [selected, setSelected] = React.useState<MediaItem | null>(null);
  const [del, setDel] = React.useState<MediaItem | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (kind) params.set("kind", kind);
      params.set("page", String(page));
      const json = await apiGet<{ items: MediaItem[]; total: number; pageSize: number }>(
        `/api/admin/media?${params.toString()}`,
      );
      setItems(json.items);
      setTotal(json.total);
      setPageSize(json.pageSize);
    } catch {
      toast.error("Medya yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [q, kind, page]);

  React.useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  React.useEffect(() => setPage(1), [q, kind]);

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true);
    let ok = 0;
    for (const file of Array.from(files)) {
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/media/upload", {
          method: "POST",
          headers: { "x-csrf-token": readCsrf() },
          body: form,
        });
        if (res.ok) ok++;
      } catch {
        /* sonraki dosya */
      }
    }
    setUploading(false);
    if (ok) {
      toast.success(`${ok} dosya yüklendi`);
      load();
    } else {
      toast.error("Yükleme başarısız");
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  async function saveAlt(item: MediaItem, alt: string) {
    try {
      await apiPatch(`/api/admin/media/${item.id}`, { alt });
      toast.success("Kaydedildi");
      setItems((prev) => prev.map((m) => (m.id === item.id ? { ...m, alt } : m)));
      setSelected((s) => (s && s.id === item.id ? { ...s, alt } : s));
    } catch {
      toast.error("Kaydedilemedi");
    }
  }

  async function remove(item: MediaItem) {
    await apiDelete(`/api/admin/media/${item.id}`);
    toast.success("Silindi");
    setSelected(null);
    load();
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
      }}
      className="relative"
    >
      <input
        ref={fileRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && uploadFiles(e.target.files)}
      />

      <PageHeader
        title="Medya Kütüphanesi"
        description="Görsel ve dokümanları yükleyin, yönetin."
        actions={
          <Button size="sm" onClick={() => fileRef.current?.click()} loading={uploading}>
            {!uploading && <UploadCloud className="h-4 w-4" />}
            Dosya Yükle
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panel-fg-subtle" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Dosya ara…" className="pl-9" />
        </div>
        <Select value={kind} onChange={(e) => setKind(e.target.value)} className="w-auto min-w-[140px]">
          <option value="">Tüm türler</option>
          <option value="IMAGE">Görseller</option>
          <option value="DOCUMENT">Dokümanlar</option>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="Henüz dosya yok"
          description="Buraya sürükleyip bırakın ya da Dosya Yükle ile ekleyin."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {items.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelected(m)}
                className="group overflow-hidden rounded-xl border border-panel-border bg-panel-surface text-left transition-all hover:border-panel-accent hover:panel-shadow-md"
              >
                <div className="flex aspect-square items-center justify-center bg-panel-surface-2">
                  {m.kind === "IMAGE" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.path} alt={m.alt ?? ""} className="h-full w-full object-contain" />
                  ) : (
                    <FileText className="h-9 w-9 text-panel-fg-subtle" />
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-[11.5px] font-medium text-panel-fg">{m.fileName}</p>
                  <p className="text-[10.5px] text-panel-fg-subtle">{formatBytes(m.size)}</p>
                </div>
              </button>
            ))}
          </div>
          <Pagination page={page} total={total} pageSize={pageSize} onPage={setPage} />
        </>
      )}

      {/* Sürükle-bırak örtüsü */}
      {dragOver && (
        <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-panel-accent/10 backdrop-blur-sm">
          <div className="rounded-2xl border-2 border-dashed border-panel-accent bg-panel-surface px-8 py-6 text-[15px] font-semibold text-panel-accent">
            Yüklemek için bırakın
          </div>
        </div>
      )}

      {/* Detay */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} size="lg" title="Dosya Detayı">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-center overflow-hidden rounded-xl border border-panel-border bg-panel-surface-2 p-3">
              {selected.kind === "IMAGE" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selected.path} alt="" className="max-h-60 object-contain" />
              ) : (
                <FileText className="h-16 w-16 text-panel-fg-subtle" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[12.5px]">
              <Info label="Dosya" value={selected.fileName} />
              <Info label="Boyut" value={formatBytes(selected.size)} />
              <Info label="Tür" value={selected.mimeType} />
              {selected.width ? <Info label="Çözünürlük" value={`${selected.width}×${selected.height}`} /> : null}
              {selected.createdAt ? <Info label="Tarih" value={formatDateTr(selected.createdAt)} /> : null}
            </div>
            <Field label="Dosya yolu">
              <div className="flex items-center gap-2">
                <Input value={selected.path} readOnly className="font-mono text-[12px]" />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard?.writeText(selected.path);
                    toast.success("Kopyalandı");
                  }}
                  aria-label="Kopyala"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Field>
            <AltEditor item={selected} onSave={saveAlt} />
            <div className="flex justify-end border-t border-panel-border pt-3">
              <Button variant="danger-soft" size="sm" onClick={() => setDel(selected)}>
                <Trash2 className="h-4 w-4" />
                Sil
              </Button>
            </div>
          </div>
        )}
      </Dialog>

      <ConfirmDialog
        open={!!del}
        onClose={() => setDel(null)}
        onConfirm={async () => {
          if (del) await remove(del);
        }}
        title="Dosyayı sil"
        description={del ? `"${del.fileName}" silinecek. Bu işlem geri alınamaz.` : ""}
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-panel-surface-2 px-3 py-2">
      <p className="text-[10.5px] uppercase tracking-wide text-panel-fg-subtle">{label}</p>
      <p className="mt-0.5 truncate font-medium text-panel-fg">{value}</p>
    </div>
  );
}

function AltEditor({ item, onSave }: { item: MediaItem; onSave: (i: MediaItem, alt: string) => void }) {
  const [alt, setAlt] = React.useState(item.alt ?? "");
  React.useEffect(() => setAlt(item.alt ?? ""), [item]);
  return (
    <Field label="Alternatif metin (alt)" hint="Erişilebilirlik ve SEO için görsel açıklaması">
      <div className="flex items-center gap-2">
        <Input value={alt} onChange={(e) => setAlt(e.target.value)} />
        <Button variant="secondary" size="sm" onClick={() => onSave(item, alt)}>
          Kaydet
        </Button>
      </div>
    </Field>
  );
}
