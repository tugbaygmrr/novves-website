"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, GripVertical, ArrowLeft } from "lucide-react";
import { apiGet, apiPut } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Textarea } from "@/components/panel/ui/textarea";
import { Button } from "@/components/panel/ui/button";
import { Spinner } from "@/components/panel/ui/spinner";
import { Field } from "@/components/panel/form/field";
import { LocalePicker } from "@/components/panel/form/locale-picker";
import { IconField } from "@/components/panel/fields/icon-field";
import { ImageSetField } from "@/components/panel/media/image-set-picker";
import { FormFooter } from "@/components/panel/form/form-footer";

type LMap = Record<string, string>;

interface Header {
  eyebrow: LMap;
  title: LMap;
  lead: LMap;
  sidebarCardTitle: LMap;
  sidebarCardDesc: LMap;
  cardCta: LMap;
  mainCta: LMap;
}

interface Box {
  href: string;
  icon: string;
  iconImage: string;
  image: string;
  videoSrc: string;
  videoPoster: string;
  title: LMap;
  description: LMap;
}

const EMPTY_HEADER: Header = {
  eyebrow: {},
  title: {},
  lead: {},
  sidebarCardTitle: {},
  sidebarCardDesc: {},
  cardCta: {},
  mainCta: {},
};

export function EngineeringStripManager({ onBack }: { onBack?: () => void }) {
  const [header, setHeader] = React.useState<Header>(EMPTY_HEADER);
  const [boxes, setBoxes] = React.useState<Box[]>([]);
  const [locale, setLocale] = React.useState("tr");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    apiGet<{ header?: Partial<Header>; boxes?: Box[] }>("/api/admin/engineering-strip")
      .then((j) => {
        setHeader({ ...EMPTY_HEADER, ...(j.header ?? {}) });
        setBoxes(j.boxes ?? []);
      })
      .catch(() => toast.error("Bölüm yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  function setHeaderLoc(field: keyof Header, val: string) {
    setHeader((h) => ({ ...h, [field]: { ...h[field], [locale]: val } }));
  }
  function patchBox(i: number, p: Partial<Box>) {
    setBoxes((bs) => bs.map((b, j) => (j === i ? { ...b, ...p } : b)));
  }
  function setBoxLoc(i: number, field: "title" | "description", val: string) {
    setBoxes((bs) => bs.map((b, j) => (j === i ? { ...b, [field]: { ...b[field], [locale]: val } } : b)));
  }
  function move(i: number, to: number) {
    if (to < 0 || to >= boxes.length) return;
    setBoxes((bs) => {
      const arr = [...bs];
      const [m] = arr.splice(i, 1);
      arr.splice(to, 0, m);
      return arr;
    });
  }
  function add() {
    setBoxes((bs) => [
      ...bs,
      { href: "/hizmetler", icon: "monitor", iconImage: "", image: "", videoSrc: "", videoPoster: "", title: {}, description: {} },
    ]);
  }

  async function save() {
    if (boxes.some((b) => !b.href.trim())) return toast.error("Tüm kutuların bağlantısı (link) dolu olmalı");
    setSaving(true);
    try {
      await apiPut("/api/admin/engineering-strip", { header, boxes });
      toast.success("Kaydedildi — sitede yayınlandı");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Spinner className="h-6 w-6 text-panel-accent" />
      </div>
    );
  }

  const L = locale.toUpperCase();

  return (
    <div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-panel-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Ana Sayfa bölümleri
        </button>
      )}
      <PageHeader
        title="Mühendislikten Sahaya"
        description="Başlıklar, sağ kart ve her kutu için video, ikon, açıklama ve bağlantı."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-[13px] text-panel-fg-muted">Metin dili:</span>
        <LocalePicker value={locale} onChange={setLocale} />
      </div>

      {/* Bölüm başlıkları */}
      <Card className="mb-5">
        <CardContent className="space-y-4 p-5">
          <p className="text-[13px] font-semibold text-panel-fg">Bölüm başlıkları</p>
          <Field label={`Küçük başlık (${L})`}>
            <Input value={header.eyebrow[locale] ?? ""} onChange={(e) => setHeaderLoc("eyebrow", e.target.value)} />
          </Field>
          <Field label={`Ana başlık (${L})`}>
            <Input value={header.title[locale] ?? ""} onChange={(e) => setHeaderLoc("title", e.target.value)} />
          </Field>
          <Field label={`Açıklama (${L})`}>
            <Textarea value={header.lead[locale] ?? ""} onChange={(e) => setHeaderLoc("lead", e.target.value)} rows={3} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Sağ kart başlığı (${L})`}>
              <Input value={header.sidebarCardTitle[locale] ?? ""} onChange={(e) => setHeaderLoc("sidebarCardTitle", e.target.value)} />
            </Field>
            <Field label={`Kart butonu metni (${L})`}>
              <Input value={header.cardCta[locale] ?? ""} onChange={(e) => setHeaderLoc("cardCta", e.target.value)} placeholder="Detayları İncele" />
            </Field>
          </div>
          <Field label={`Sağ kart açıklaması (${L})`}>
            <Textarea value={header.sidebarCardDesc[locale] ?? ""} onChange={(e) => setHeaderLoc("sidebarCardDesc", e.target.value)} rows={2} />
          </Field>
        </CardContent>
      </Card>

      {/* Kutular */}
      <p className="mb-3 text-[13px] font-semibold text-panel-fg">Adım kutuları</p>
      <div className="space-y-4">
        {boxes.map((box, i) => (
          <Card key={i}>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 shrink-0 text-panel-fg-subtle" />
                <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-panel-surface-2 px-1.5 text-[12px] font-bold text-panel-fg-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate text-[13px] font-medium text-panel-fg">
                  {box.title[locale] || box.title.tr || "Yeni kutu"}
                </span>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30" aria-label="Yukarı">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => move(i, i + 1)} disabled={i === boxes.length - 1} className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30" aria-label="Aşağı">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setBoxes((bs) => bs.filter((_, j) => j !== i))} className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-danger-soft hover:text-panel-danger" aria-label="Sil">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Field label={`Başlık (${L})`}>
                <Input value={box.title[locale] ?? ""} onChange={(e) => setBoxLoc(i, "title", e.target.value)} />
              </Field>

              <Field label={`Açıklama (${L})`}>
                <Textarea value={box.description[locale] ?? ""} onChange={(e) => setBoxLoc(i, "description", e.target.value)} rows={3} />
              </Field>

              <Field label="İkon">
                <IconField
                  value={box.icon}
                  onChange={(v) => patchBox(i, { icon: v })}
                  imageValue={box.iconImage}
                  onImageChange={(v) => patchBox(i, { iconImage: v })}
                  showCustomImage
                />
              </Field>

              <Field label="Video (mp4 dosya yolu)" hint="Örn: /video/engineering-pillar-01.mp4 — boş bırakılırsa görsel gösterilir.">
                <Input
                  value={box.videoSrc}
                  onChange={(e) => patchBox(i, { videoSrc: e.target.value })}
                  placeholder="/video/engineering-pillar-01.mp4"
                  className="font-mono text-[12px]"
                />
              </Field>

              <Field label="Görsel / video kapağı">
                <ImageSetField
                  value={box.videoPoster || box.image}
                  onChange={(v) => patchBox(i, { videoPoster: v, image: v })}
                />
              </Field>

              <Field label="Bağlantı (link)">
                <Input
                  value={box.href}
                  onChange={(e) => patchBox(i, { href: e.target.value })}
                  placeholder="/hizmetler"
                  className="font-mono text-[12px]"
                />
              </Field>
            </CardContent>
          </Card>
        ))}

        <Button variant="subtle" onClick={add} className="w-full">
          <Plus className="h-4 w-4" />
          Kutu ekle
        </Button>
      </div>

      <FormFooter onCancel={() => onBack?.()} onSave={save} saving={saving} />
    </div>
  );
}
