"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, GripVertical, EyeOff, ExternalLink } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Select } from "@/components/panel/ui/select";
import { Switch } from "@/components/panel/ui/switch";
import { Button } from "@/components/panel/ui/button";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { Dialog } from "@/components/panel/ui/dialog";
import { ConfirmDialog } from "@/components/panel/ui/confirm-dialog";
import { Field, FieldGrid } from "@/components/panel/form/field";
import { TranslationsTabs, type Translation } from "@/components/panel/form/translations-tabs";

interface MenuRow {
  id: number;
  location: string;
  href: string;
  icon: string | null;
  order: number;
  visible: boolean;
  external: boolean;
  label: string;
}

const LOCATIONS = [
  { value: "header", label: "Üst Menü" },
  { value: "footer_quick", label: "Footer · Hızlı Erişim" },
  { value: "footer_legal", label: "Footer · Yasal" },
];

export function MenuManager() {
  const [items, setItems] = React.useState<MenuRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState<{ id?: number; location: string } | null>(null);
  const [del, setDel] = React.useState<MenuRow | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const json = await apiGet<{ items: MenuRow[] }>("/api/admin/menu");
      setItems(json.items);
    } catch {
      toast.error("Menü yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <PageHeader title="Menü Yönetimi" description="Navigasyon ve footer bağlantıları." />

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {LOCATIONS.map((loc) => {
            const rows = items
              .filter((i) => i.location === loc.value)
              .sort((a, b) => a.order - b.order);
            return (
              <Card key={loc.value}>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>{loc.label}</CardTitle>
                  <Button variant="secondary" size="sm" onClick={() => setEditing({ location: loc.value })}>
                    <Plus className="h-4 w-4" />
                    Ekle
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  {rows.length === 0 ? (
                    <p className="px-5 py-6 text-center text-[13px] text-panel-fg-muted">Öğe yok.</p>
                  ) : (
                    <div className="divide-y divide-panel-border">
                      {rows.map((r) => (
                        <div key={r.id} className="flex items-center gap-3 px-5 py-3">
                          <GripVertical className="h-4 w-4 shrink-0 text-panel-fg-subtle" />
                          <div className="min-w-0 flex-1">
                            <p className="flex items-center gap-1.5 truncate text-[13.5px] font-medium text-panel-fg">
                              {r.label}
                              {!r.visible && <EyeOff className="h-3.5 w-3.5 text-panel-fg-subtle" />}
                              {r.external && <ExternalLink className="h-3.5 w-3.5 text-panel-fg-subtle" />}
                            </p>
                            <p className="truncate font-mono text-[11.5px] text-panel-fg-subtle">{r.href}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditing({ id: r.id, location: r.location })}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-surface-2 hover:text-panel-fg"
                            aria-label="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDel(r)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-danger-soft hover:text-panel-danger"
                            aria-label="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {editing && (
        <MenuItemDialog
          id={editing.id}
          defaultLocation={editing.location}
          onClose={() => setEditing(null)}
          onDone={() => {
            setEditing(null);
            load();
          }}
        />
      )}
      <ConfirmDialog
        open={!!del}
        onClose={() => setDel(null)}
        onConfirm={async () => {
          if (!del) return;
          await apiDelete(`/api/admin/menu/${del.id}`);
          toast.success("Silindi");
          load();
        }}
        title="Menü öğesini sil"
        description={del ? `"${del.label}" silinecek.` : ""}
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

function MenuItemDialog({
  id,
  defaultLocation,
  onClose,
  onDone,
}: {
  id?: number;
  defaultLocation: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const editing = typeof id === "number";
  const [loading, setLoading] = React.useState(editing);
  const [saving, setSaving] = React.useState(false);
  const [location, setLocation] = React.useState(defaultLocation);
  const [href, setHref] = React.useState("");
  const [order, setOrder] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const [external, setExternal] = React.useState(false);
  const [translations, setTranslations] = React.useState<Translation[]>([{ locale: "tr" }]);

  React.useEffect(() => {
    if (!editing) return;
    apiGet<{ item: Record<string, unknown> }>(`/api/admin/menu/${id}`)
      .then(({ item }) => {
        const it = item as {
          location: string;
          href: string;
          order: number;
          visible: boolean;
          external: boolean;
          translations: Translation[];
        };
        setLocation(it.location);
        setHref(it.href);
        setOrder(it.order);
        setVisible(it.visible);
        setExternal(it.external);
        setTranslations(it.translations.length ? it.translations : [{ locale: "tr" }]);
      })
      .catch(() => toast.error("Öğe yüklenemedi"))
      .finally(() => setLoading(false));
  }, [editing, id]);

  async function save() {
    const tr = translations.find((t) => t.locale === "tr");
    if (!tr?.label || !String(tr.label).trim()) return toast.error("Türkçe etiket zorunlu");
    if (!href.trim()) return toast.error("Bağlantı (href) zorunlu");
    setSaving(true);
    try {
      const body = { location, href, order, visible, external, translations };
      if (editing) await apiPut(`/api/admin/menu/${id}`, body);
      else await apiPost("/api/admin/menu", body);
      toast.success(editing ? "Güncellendi" : "Eklendi");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Kaydedilemedi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open
      onClose={onClose}
      title={editing ? "Menü Öğesi Düzenle" : "Yeni Menü Öğesi"}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Vazgeç
          </Button>
          <Button size="sm" onClick={save} loading={saving} disabled={loading}>
            Kaydet
          </Button>
        </>
      }
    >
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : (
        <div className="space-y-4">
          <TranslationsTabs
            value={translations}
            onChange={setTranslations}
            fields={[{ key: "label", label: "Etiket", required: true }]}
          />
          <Field label="Bağlantı (href)" required>
            <Input value={href} onChange={(e) => setHref(e.target.value)} placeholder="/urunler veya https://..." className="font-mono text-[12px]" />
          </Field>
          <FieldGrid>
            <Field label="Konum">
              <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                {LOCATIONS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Sıra">
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value) || 0)} />
            </Field>
          </FieldGrid>
          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2.5 text-[13px] text-panel-fg-muted">
              <Switch checked={visible} onCheckedChange={setVisible} />
              Görünür
            </label>
            <label className="flex items-center gap-2.5 text-[13px] text-panel-fg-muted">
              <Switch checked={external} onCheckedChange={setExternal} />
              Dış bağlantı (yeni sekme)
            </label>
          </div>
        </div>
      )}
    </Dialog>
  );
}
