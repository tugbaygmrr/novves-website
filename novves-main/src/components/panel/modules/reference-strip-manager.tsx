"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, GripVertical, ArrowLeft } from "lucide-react";
import { apiGet, apiPut } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import {
  ReferenceSectorIcon,
  REFERENCE_SECTOR_THEMES,
  type ReferenceSectorTheme,
} from "@/components/reference-sector-icon";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Select } from "@/components/panel/ui/select";
import { Button } from "@/components/panel/ui/button";
import { Spinner } from "@/components/panel/ui/spinner";
import { Field, FieldGrid } from "@/components/panel/form/field";
import { LocalePicker } from "@/components/panel/form/locale-picker";
import { ImageSetField } from "@/components/panel/media/image-set-picker";
import { FormFooter } from "@/components/panel/form/form-footer";

type LMap = Record<string, string>;
interface RCard {
  href: string;
  theme: string;
  image: string;
  sector: LMap;
  example: LMap;
  projectCount: LMap;
}

export function ReferenceStripManager({ onBack }: { onBack?: () => void }) {
  const [button, setButton] = React.useState<LMap>({});
  const [cards, setCards] = React.useState<RCard[]>([]);
  const [locale, setLocale] = React.useState("tr");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    apiGet<{ button: LMap; cards: RCard[] }>("/api/admin/reference-strip")
      .then((j) => {
        setButton(j.button ?? {});
        setCards(j.cards ?? []);
      })
      .catch(() => toast.error("Referanslar yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  function patch(i: number, p: Partial<RCard>) {
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, ...p } : c)));
  }
  function setLoc(i: number, field: "sector" | "example" | "projectCount", val: string) {
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
      { href: "/kurumsal/referanslar", theme: "orange", image: "", sector: {}, example: {}, projectCount: {} },
    ]);
  }

  async function save() {
    if (cards.some((c) => !c.href.trim())) return toast.error("Tüm kartların bağlantısı (href) dolu olmalı");
    setSaving(true);
    try {
      await apiPut("/api/admin/reference-strip", { button, cards });
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
        title="Referans Proje Kartları"
        description="Sektör (ikon + grup adı), örnek proje, proje sayısı ve buton — kart ekle/çıkar."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-[13px] text-panel-fg-muted">Metin dili:</span>
        <LocalePicker value={locale} onChange={setLocale} />
      </div>

      <Card className="mb-4">
        <CardContent className="p-5">
          <Field label={`Buton metni (${locale.toUpperCase()})`} hint="Tüm referans kartlarındaki “Keşfet” butonu">
            <Input
              value={button[locale] ?? ""}
              onChange={(e) => setButton((b) => ({ ...b, [locale]: e.target.value }))}
            />
          </Field>
        </CardContent>
      </Card>

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
                  placeholder="/kurumsal/referanslar"
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

              <FieldGrid>
                <Field label="Tema / İkon">
                  <div className="flex items-center gap-3 rounded-lg border border-panel-border bg-panel-surface-2 px-3 py-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-panel-accent">
                      <ReferenceSectorIcon theme={card.theme as ReferenceSectorTheme} className="h-5 w-5 text-white" />
                    </span>
                    <Select value={card.theme} onChange={(e) => patch(i, { theme: e.target.value })}>
                      {REFERENCE_SECTOR_THEMES.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </Field>
                <Field label={`Proje sayısı (${locale.toUpperCase()})`} hint="Sayı kategori verisinden otomatik gelir; yalnızca otomatik karşılığı olmayan ekstra kartlar için elle girin.">
                  <Input value={card.projectCount[locale] ?? ""} onChange={(e) => setLoc(i, "projectCount", e.target.value)} placeholder="otomatik" />
                </Field>
              </FieldGrid>

              <FieldGrid>
                <Field label={`Grup / Sektör adı (${locale.toUpperCase()})`}>
                  <Input value={card.sector[locale] ?? ""} onChange={(e) => setLoc(i, "sector", e.target.value)} />
                </Field>
                <Field label={`Örnek proje adı (${locale.toUpperCase()})`}>
                  <Input value={card.example[locale] ?? ""} onChange={(e) => setLoc(i, "example", e.target.value)} />
                </Field>
              </FieldGrid>

              <Field label="Kart görseli">
                <ImageSetField value={card.image} onChange={(v) => patch(i, { image: v })} />
              </Field>
            </CardContent>
          </Card>
        ))}

        <Button variant="subtle" onClick={add} className="w-full">
          <Plus className="h-4 w-4" />
          Referans kartı ekle
        </Button>
      </div>

      <FormFooter onCancel={() => onBack?.()} onSave={save} saving={saving} />
    </div>
  );
}
