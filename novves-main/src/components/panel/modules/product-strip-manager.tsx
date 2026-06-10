"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, GripVertical, ArrowLeft, X } from "lucide-react";
import { apiGet, apiPut } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { ProductCategoryIcon, PRODUCT_CATEGORY_ICONS } from "@/components/product-category-icon";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Textarea } from "@/components/panel/ui/textarea";
import { Select } from "@/components/panel/ui/select";
import { Button } from "@/components/panel/ui/button";
import { Spinner } from "@/components/panel/ui/spinner";
import { Field, FieldGrid } from "@/components/panel/form/field";
import { LocalePicker } from "@/components/panel/form/locale-picker";
import { ImageSetField } from "@/components/panel/media/image-set-picker";
import { FormFooter } from "@/components/panel/form/form-footer";

interface PCard {
  slug: string;
  href: string;
  icon: string;
  image: string;
  title: Record<string, string>;
  description: Record<string, string>;
  features: Record<string, string[]>;
}

export function ProductStripManager({ onBack }: { onBack?: () => void }) {
  const [cards, setCards] = React.useState<PCard[]>([]);
  const [locale, setLocale] = React.useState("tr");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    apiGet<{ cards: PCard[] }>("/api/admin/product-strip")
      .then((j) => setCards(j.cards ?? []))
      .catch(() => toast.error("Kategoriler yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  function patch(i: number, p: Partial<PCard>) {
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, ...p } : c)));
  }
  function setLoc(i: number, field: "title" | "description", val: string) {
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, [field]: { ...c[field], [locale]: val } } : c)));
  }
  function setFeatures(i: number, arr: string[]) {
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, features: { ...c.features, [locale]: arr } } : c)));
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
      { slug: "", href: "/urunler/", icon: "wind", image: "", title: {}, description: {}, features: {} },
    ]);
  }

  async function save() {
    if (cards.some((c) => !c.href.trim())) return toast.error("Tüm kategorilerin bağlantısı (href) dolu olmalı");
    setSaving(true);
    try {
      await apiPut("/api/admin/product-strip", { cards });
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
        title="Ürün Kategorileri Şeridi"
        description="İkon, görsel, başlık/açıklama, ürün grupları — kategori ekle/çıkar (numara otomatik)."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-[13px] text-panel-fg-muted">Metin dili:</span>
        <LocalePicker value={locale} onChange={setLocale} />
        <span className="text-[12px] text-panel-fg-subtle">
          İkon/görsel/sıra tüm dillerde ortak; başlık/açıklama/gruplar seçili dile aittir.
        </span>
      </div>

      <div className="space-y-4">
        {cards.map((card, i) => {
          const feats = card.features[locale] ?? [];
          return (
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
                    placeholder="/urunler/…"
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
                  <Field label="İkon">
                    <div className="flex items-center gap-3 rounded-lg border border-panel-border bg-panel-surface-2 px-3 py-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-panel-surface text-panel-accent panel-shadow-sm [&_svg]:h-5 [&_svg]:w-5">
                        <ProductCategoryIcon name={card.icon} />
                      </span>
                      <Select value={card.icon} onChange={(e) => patch(i, { icon: e.target.value })}>
                        {PRODUCT_CATEGORY_ICONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </Field>
                  <Field label={`Başlık (${locale.toUpperCase()})`}>
                    <Input value={card.title[locale] ?? ""} onChange={(e) => setLoc(i, "title", e.target.value)} />
                  </Field>
                </FieldGrid>

                <Field label="Kart görseli">
                  <ImageSetField value={card.image} onChange={(v) => patch(i, { image: v })} />
                </Field>

                <Field label={`Açıklama (${locale.toUpperCase()})`}>
                  <Textarea value={card.description[locale] ?? ""} onChange={(e) => setLoc(i, "description", e.target.value)} rows={2} />
                </Field>

                <Field label={`Ürün grupları (${locale.toUpperCase()})`}>
                  <div className="space-y-2">
                    {feats.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2">
                        <Input
                          value={f}
                          onChange={(e) => setFeatures(i, feats.map((x, k) => (k === fi ? e.target.value : x)))}
                          placeholder="Ürün grubu adı"
                        />
                        <button
                          type="button"
                          onClick={() => setFeatures(i, feats.filter((_, k) => k !== fi))}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-danger-soft hover:text-panel-danger"
                          aria-label="Kaldır"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <Button variant="subtle" size="sm" onClick={() => setFeatures(i, [...feats, ""])}>
                      <Plus className="h-4 w-4" />
                      Grup ekle
                    </Button>
                  </div>
                </Field>
              </CardContent>
            </Card>
          );
        })}

        <Button variant="subtle" onClick={add} className="w-full">
          <Plus className="h-4 w-4" />
          Ürün kategorisi ekle
        </Button>
      </div>

      <FormFooter onCancel={() => onBack?.()} onSave={save} saving={saving} />
    </div>
  );
}
