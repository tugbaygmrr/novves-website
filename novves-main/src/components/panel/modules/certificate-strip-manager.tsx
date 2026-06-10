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
interface CCard {
  href: string;
  icon: string;
  iconImage: string;
  image: string;
  title: LMap;
  description: LMap;
}

export function CertificateStripManager({ onBack }: { onBack?: () => void }) {
  const [cards, setCards] = React.useState<CCard[]>([]);
  const [locale, setLocale] = React.useState("tr");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    apiGet<{ cards: CCard[] }>("/api/admin/certificate-strip")
      .then((j) => setCards(j.cards ?? []))
      .catch(() => toast.error("Sertifikalar yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  function patch(i: number, p: Partial<CCard>) {
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, ...p } : c)));
  }
  function setLoc(i: number, field: "title" | "description", val: string) {
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, [field]: { ...c[field], [locale]: val } } : c)));
  }
  function move(i: number, to: number) {
    if (to < 0 || to >= cards.length) return;
    setCards((cs) => {
      const arr = [...cs];
      const [m] = arr.splice(i, 1);
      arr.splice(to, 0, m);
      return arr;
    });
  }
  function add() {
    setCards((cs) => [
      ...cs,
      { href: "/teknik-merkez/dokuman-kutuphanesi", icon: "certificate", iconImage: "", image: "", title: {}, description: {} },
    ]);
  }

  async function save() {
    if (cards.some((c) => !c.href.trim())) return toast.error("Tüm kartların bağlantısı (href) dolu olmalı");
    setSaving(true);
    try {
      await apiPut("/api/admin/certificate-strip", { cards });
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
        title="Sertifika Kartları"
        description="İkon, görsel, başlık ve açıklama — kart ekle/çıkar."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-[13px] text-panel-fg-muted">Metin dili:</span>
        <LocalePicker value={locale} onChange={setLocale} />
      </div>

      <div className="space-y-4">
        {cards.map((card, i) => (
          <Card key={i}>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 shrink-0 text-panel-fg-subtle" />
                <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-panel-surface-2 px-1.5 text-[12px] font-bold text-panel-fg-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Input
                  value={card.href}
                  onChange={(e) => patch(i, { href: e.target.value })}
                  placeholder="/teknik-merkez/dokuman-kutuphanesi"
                  className="flex-1 font-mono text-[12px]"
                />
                <div className="flex shrink-0 items-center gap-0.5">
                  <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30" aria-label="Yukarı">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => move(i, i + 1)} disabled={i === cards.length - 1} className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30" aria-label="Aşağı">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setCards((cs) => cs.filter((_, j) => j !== i))} className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-danger-soft hover:text-panel-danger" aria-label="Sil">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Field label={`Başlık (${locale.toUpperCase()})`}>
                <Input value={card.title[locale] ?? ""} onChange={(e) => setLoc(i, "title", e.target.value)} />
              </Field>

              <Field label={`Açıklama (${locale.toUpperCase()})`}>
                <Textarea value={card.description[locale] ?? ""} onChange={(e) => setLoc(i, "description", e.target.value)} rows={2} />
              </Field>

              <Field label="İkon">
                <IconField
                  value={card.icon}
                  onChange={(v) => patch(i, { icon: v })}
                  imageValue={card.iconImage}
                  onImageChange={(v) => patch(i, { iconImage: v })}
                  showCustomImage
                />
              </Field>

              <Field label="Kart görseli (sertifika)">
                <ImageSetField value={card.image} onChange={(v) => patch(i, { image: v })} />
              </Field>
            </CardContent>
          </Card>
        ))}

        <Button variant="subtle" onClick={add} className="w-full">
          <Plus className="h-4 w-4" />
          Sertifika kartı ekle
        </Button>
      </div>

      <FormFooter onCancel={() => onBack?.()} onSave={save} saving={saving} />
    </div>
  );
}
