"use client";

import * as React from "react";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Save,
  History,
  ExternalLink,
  Eye,
  EyeOff,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { readCsrf } from "@/lib/panel/csrf";
import { relativeTimeTr } from "@/lib/panel/format";
import { toast } from "@/lib/panel/stores/toast-store";
import { useEditorStore, selectDirty } from "@/lib/panel/stores/editor-store";
import { getPreviewUrl } from "@/lib/admin/preview-routes";
import { getSectionPreview, hasSectionPreview } from "@/lib/admin/section-preview-meta";
import { getHiddenFields } from "@/lib/panel/hidden-fields";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";
import { Dropdown, DropdownItem, DropdownLabel } from "../ui/dropdown";
import { LocalePicker } from "../form/locale-picker";
import { FieldRenderer } from "./field-renderer";

export function SectionEditor({
  file,
  section,
  sectionLabel,
  pageLabel,
  locale,
  onLocaleChange,
  onBack,
}: {
  file: string;
  section: string;
  sectionLabel: string;
  pageLabel: string;
  locale: string;
  onLocaleChange: (locale: string) => void;
  onBack: () => void;
}) {
  const present = useEditorStore((s) => s.present);
  const dirty = useEditorStore(selectDirty);
  const canUndo = useEditorStore((s) => s.past.length > 0);
  const canRedo = useEditorStore((s) => s.future.length > 0);
  const setPath = useEditorStore((s) => s.setPath);
  const update = useEditorStore((s) => s.update);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const markSaved = useEditorStore((s) => s.markSaved);
  const restore = useEditorStore((s) => s.restore);
  const revisions = useEditorStore((s) => s.revisions);

  const [saving, setSaving] = React.useState(false);
  const [autosave, setAutosave] = React.useState(true);
  const [showPreview, setShowPreview] = React.useState(true);
  const [copying, setCopying] = React.useState(false);

  const previewUrl = getPreviewUrl(locale, file, section);
  const preview = getSectionPreview(file, section);
  // Önizleme tanımı olmayan bölümlerde (ör. ürünler) sağdaki "Bölüm Görünümü" gösterilmez.
  const hasPreview = hasSectionPreview(file, section);

  const save = React.useCallback(
    async (silent = false) => {
      if (useEditorStore.getState().present == null) return;
      if (!selectDirty(useEditorStore.getState())) return;
      setSaving(true);
      try {
        const res = await fetch(`/api/admin/content/${file}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "x-csrf-token": readCsrf() },
          body: JSON.stringify({
            locale,
            section,
            data: useEditorStore.getState().present,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          toast.error(json.error || "Kaydetme başarısız");
          return;
        }
        markSaved();
        if (!silent) toast.success("Kaydedildi — değişiklik sitede yayınlandı");
      } catch {
        toast.error("Sunucu hatası");
      } finally {
        setSaving(false);
      }
    },
    [file, locale, section, markSaved],
  );

  // Autosave (debounce)
  React.useEffect(() => {
    if (!autosave || !dirty) return;
    const t = setTimeout(() => save(true), 1500);
    return () => clearTimeout(t);
  }, [present, autosave, dirty, save]);

  // Klavye kısayolları
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      if (k === "s") {
        e.preventDefault();
        save(false);
      } else if (k === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((k === "z" && e.shiftKey) || k === "y") {
        e.preventDefault();
        redo();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [save, undo, redo]);

  function guard(action: () => void) {
    if (dirty && !autosave) {
      if (!window.confirm("Kaydedilmemiş değişiklikler var. Yine de devam edilsin mi?")) return;
    }
    action();
  }

  async function copyFromTr() {
    if (locale === "tr") return;
    if (!window.confirm("Bu bölümün Türkçe içeriği bu dile kopyalanacak. Devam?")) return;
    setCopying(true);
    try {
      const res = await fetch(`/api/admin/content/${file}?locale=tr`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      const trData = json.data?.[section];
      if (trData !== undefined) {
        update(trData);
        toast.info("Türkçe içerik kopyalandı — kaydetmeyi unutmayın.");
      }
    } catch {
      toast.error("Kopyalama başarısız");
    } finally {
      setCopying(false);
    }
  }

  const statusLabel = saving
    ? "Kaydediliyor…"
    : dirty
      ? autosave
        ? "Bekliyor…"
        : "Kaydedilmemiş"
      : "Kaydedildi";

  return (
    <div
      className={
        hasPreview
          ? "grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,480px)]"
          : "grid grid-cols-1 gap-5"
      }
    >
      {/* Editör */}
      <div className="overflow-hidden rounded-2xl border border-panel-border bg-panel-surface">
        {/* Başlık çubuğu */}
        <div className="flex flex-wrap items-center gap-3 border-b border-panel-border px-5 py-3.5">
          <button
            type="button"
            onClick={() => guard(onBack)}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-panel-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {pageLabel}
          </button>
          <span className="text-panel-fg-subtle">/</span>
          <h2 className="text-[15px] font-bold text-panel-fg">{sectionLabel}</h2>

          <div className="ml-auto flex items-center gap-1.5">
            <Tooltip content="Geri al (⌘Z)" side="bottom">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted transition-colors hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30"
                aria-label="Geri al"
              >
                <Undo2 className="h-4 w-4" />
              </button>
            </Tooltip>
            <Tooltip content="Yinele (⌘⇧Z)" side="bottom">
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted transition-colors hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30"
                aria-label="Yinele"
              >
                <Redo2 className="h-4 w-4" />
              </button>
            </Tooltip>

            <Dropdown
              align="end"
              widthClassName="w-72"
              trigger={
                <Tooltip content="Sürüm geçmişi (oturum)" side="bottom">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted transition-colors hover:bg-panel-surface-2 hover:text-panel-fg"
                    aria-label="Sürüm geçmişi"
                  >
                    <History className="h-4 w-4" />
                  </button>
                </Tooltip>
              }
            >
              <DropdownLabel>Sürüm geçmişi (bu oturum)</DropdownLabel>
              {revisions.length === 0 ? (
                <p className="px-2.5 py-4 text-center text-[12px] text-panel-fg-muted">
                  Henüz kayıt yok.
                </p>
              ) : (
                revisions.map((r) => (
                  <DropdownItem key={r.id} icon={History} onClick={() => restore(r.snapshot)}>
                    <span className="flex-1">{r.label}</span>
                    <span className="text-[11px] text-panel-fg-subtle">{relativeTimeTr(r.at)}</span>
                  </DropdownItem>
                ))
              )}
            </Dropdown>

            {hasPreview && (
              <Tooltip content={showPreview ? "Görseli gizle" : "Görseli göster"} side="bottom">
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className="hidden h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted transition-colors hover:bg-panel-surface-2 hover:text-panel-fg xl:flex"
                  aria-label="Önizlemeyi aç/kapat"
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Locale + durum */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-panel-border bg-panel-surface-2/40 px-5 py-2.5">
          <LocalePicker value={locale} onChange={(l) => guard(() => onLocaleChange(l))} />
          {locale !== "tr" && (
            <Button variant="ghost" size="sm" onClick={copyFromTr} loading={copying}>
              <Copy className="h-4 w-4" />
              Türkçeden kopyala
            </Button>
          )}
        </div>

        {/* Form */}
        <div className="panel-scroll max-h-[calc(100vh-330px)] overflow-y-auto px-5 py-5">
          {present === null || present === undefined ? (
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-panel-border bg-panel-surface-2 text-[14px] text-panel-fg-muted">
              Bu bölüm için içerik bulunamadı.
            </div>
          ) : (
            <FieldRenderer
              data={present}
              onChange={(p, v) => setPath(p, v)}
              hiddenKeys={getHiddenFields(file, section)}
            />
          )}
        </div>

        {/* Kaydet çubuğu */}
        <div className="flex items-center gap-3 border-t border-panel-border px-5 py-3">
          <span className="flex items-center gap-1.5 text-[12.5px] text-panel-fg-muted">
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-panel-accent" />
            ) : dirty ? (
              <span className="h-2 w-2 rounded-full bg-panel-warning" />
            ) : (
              <Check className="h-3.5 w-3.5 text-panel-success" />
            )}
            {statusLabel}
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-panel-fg-muted">
            <Switch checked={autosave} onCheckedChange={setAutosave} />
            Otomatik kaydet
          </label>
          <div className="ml-auto">
            <Button size="sm" onClick={() => save(false)} loading={saving} disabled={!dirty}>
              <Save className="h-4 w-4" />
              Kaydet
            </Button>
          </div>
        </div>
      </div>

      {/* Bölüm görünümü (ekran görüntüsü) */}
      {showPreview && hasPreview && (
        <div className="hidden xl:block">
          <div className="sticky top-20 overflow-hidden rounded-2xl border border-panel-border bg-panel-surface">
            <div className="flex items-center justify-between border-b border-panel-border px-4 py-2.5">
              <span className="text-[13px] font-semibold text-panel-fg">Bölüm Görünümü</span>
              <Tooltip content="Sitede aç" side="bottom">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-surface-2 hover:text-panel-fg"
                  aria-label="Sitede aç"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Tooltip>
            </div>
            <div className="panel-scroll max-h-[calc(100vh-220px)] overflow-y-auto bg-panel-surface-2 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.image}
                alt={sectionLabel}
                className="w-full rounded-lg border border-panel-border bg-white object-contain"
              />
            </div>
            <p className="border-t border-panel-border px-4 py-2.5 text-[12px] text-panel-fg-muted">
              {preview.hint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
