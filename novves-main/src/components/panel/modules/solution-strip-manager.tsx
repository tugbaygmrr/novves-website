"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, GripVertical, ArrowLeft } from "lucide-react";
import { apiGet, apiPut } from "@/lib/panel/api";
import { readCsrf } from "@/lib/panel/csrf";
import { toast } from "@/lib/panel/stores/toast-store";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Textarea } from "@/components/panel/ui/textarea";
import { Button } from "@/components/panel/ui/button";
import { Spinner } from "@/components/panel/ui/spinner";
import { Field } from "@/components/panel/form/field";
import { LocalePicker } from "@/components/panel/form/locale-picker";
import { ImageSetField, ImageSetList } from "@/components/panel/media/image-set-picker";
import { FormFooter } from "@/components/panel/form/form-footer";

interface StripCard {
  href: string;
  hero: string;
  thumbnails: string[];
}
type TextEntry = { title?: string; description?: string };
type TextMap = Record<string, TextEntry>;

export function SolutionStripManager({ onBack }: { onBack?: () => void }) {
  const [cards, setCards] = React.useState<StripCard[]>([]);
  const [texts, setTexts] = React.useState<TextMap>({});
  const [locale, setLocale] = React.useState("tr");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const loadTexts = React.useCallback(async (loc: string) => {
    try {
      const json = await apiGet<{ data?: { solutionCarouselByHref?: TextMap } }>(
        `/api/admin/content/home?locale=${loc}`,
      );
      setTexts(json.data?.solutionCarouselByHref ?? {});
    } catch {
      toast.error("Metinler yüklenemedi");
      setTexts({});
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const json = await apiGet<{ cards: StripCard[] }>("/api/admin/solution-strip");
        setCards(json.cards ?? []);
      } catch {
        toast.error("Kartlar yüklenemedi");
      }
      await loadTexts("tr");
      setLoading(false);
    })();
  }, [loadTexts]);

  function changeLocale(loc: string) {
    setLocale(loc);
    loadTexts(loc);
  }

  function patchCard(i: number, patch: Partial<StripCard>) {
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, ...patch } : c)));
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
  function remove(i: number) {
    setCards((cs) => cs.filter((_, j) => j !== i));
  }
  function add() {
    setCards((cs) => [...cs, { href: "", hero: "", thumbnails: [] }]);
  }
  function setText(href: string, patch: TextEntry) {
    setTexts((t) => ({ ...t, [href]: { ...t[href], ...patch } }));
  }

  async function save() {
    if (cards.some((c) => !c.href.trim())) return toast.error("Tüm kartların bağlantısı (href) dolu olmalı");
    setSaving(true);
    try {
      // 1) Sıra + görseller
      await apiPut("/api/admin/solution-strip", { cards });
      // 2) Aktif dil metinleri (yalnızca mevcut kartların href'leri)
      const cleanTexts: TextMap = {};
      for (const c of cards) if (texts[c.href]) cleanTexts[c.href] = texts[c.href];
      await fetch("/api/admin/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-csrf-token": readCsrf() },
        body: JSON.stringify({ locale, section: "solutionCarouselByHref", data: cleanTexts }),
      });
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
        title="Çözüm Kartları Şeridi"
        description="Sıra, görseller (hero + ürün) ve başlık/açıklama — kart ekle/çıkar."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-[13px] text-panel-fg-muted">Metin dili:</span>
        <LocalePicker value={locale} onChange={changeLocale} />
        <span className="text-[12px] text-panel-fg-subtle">
          Görseller/sıra tüm dillerde ortak; başlık/açıklama seçili dile aittir.
        </span>
      </div>

      <div className="space-y-4">
        {cards.map((card, i) => {
          const t = texts[card.href] ?? {};
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
                    onChange={(e) => patchCard(i, { href: e.target.value })}
                    placeholder="/cozumler/…"
                    className="flex-1 font-mono text-[12px]"
                  />
                  <div className="flex shrink-0 items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => move(i, i - 1)}
                      disabled={i === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30"
                      aria-label="Yukarı"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, i + 1)}
                      disabled={i === cards.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-surface-2 hover:text-panel-fg disabled:opacity-30"
                      aria-label="Aşağı"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-danger-soft hover:text-panel-danger"
                      aria-label="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <Field label={`Başlık (${locale.toUpperCase()})`}>
                    <Input value={t.title ?? ""} onChange={(e) => setText(card.href, { title: e.target.value })} />
                  </Field>
                  <Field label={`Açıklama (${locale.toUpperCase()})`}>
                    <Textarea
                      value={t.description ?? ""}
                      onChange={(e) => setText(card.href, { description: e.target.value })}
                      rows={2}
                    />
                  </Field>
                </div>

                <Field label="Kart üstü görsel (hero)">
                  <ImageSetField value={card.hero} onChange={(v) => patchCard(i, { hero: v })} />
                </Field>
                <Field label="Ürün görselleri (ilk 3 kartta görünür)">
                  <ImageSetList value={card.thumbnails} onChange={(v) => patchCard(i, { thumbnails: v })} />
                </Field>
              </CardContent>
            </Card>
          );
        })}

        <Button variant="subtle" onClick={add} className="w-full">
          <Plus className="h-4 w-4" />
          Çözüm kartı ekle
        </Button>
      </div>

      <FormFooter onCancel={() => onBack?.()} onSave={save} saving={saving} />
    </div>
  );
}
