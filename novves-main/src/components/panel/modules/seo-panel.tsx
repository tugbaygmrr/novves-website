"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, TrendingUp, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { apiGet, apiPut, apiPost, apiDelete } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { scoreMeta, type SeoScore } from "@/lib/panel/seo-score";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/panel/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/panel/ui/table";
import { Input } from "@/components/panel/ui/input";
import { Textarea } from "@/components/panel/ui/textarea";
import { Select } from "@/components/panel/ui/select";
import { Switch } from "@/components/panel/ui/switch";
import { Button } from "@/components/panel/ui/button";
import { Badge } from "@/components/panel/ui/badge";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { Dialog } from "@/components/panel/ui/dialog";
import { ConfirmDialog } from "@/components/panel/ui/confirm-dialog";
import { Field, FieldGrid } from "@/components/panel/form/field";
import { TagInput } from "@/components/panel/form/tag-input";
import { ImageField } from "@/components/panel/fields/image-field";

interface SeoMeta {
  id: number;
  path: string;
  locale: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  ogImage: string | null;
  keywords: string[];
  noindex: boolean;
}

interface Redirect {
  id: number;
  source: string;
  target: string;
  permanent: boolean;
}

const SCORE_COLOR: Record<SeoScore["level"], string> = {
  good: "text-panel-success",
  ok: "text-panel-warning",
  bad: "text-panel-danger",
};

function ScoreDot({ s }: { s: SeoScore }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12.5px] font-semibold ${SCORE_COLOR[s.level]}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {s.score}
    </span>
  );
}

const EMPTY: SeoMeta = {
  id: 0,
  path: "",
  locale: "tr",
  title: "",
  description: "",
  canonical: "",
  ogImage: "",
  keywords: [],
  noindex: false,
};

export function SeoPanel() {
  const [metas, setMetas] = React.useState<SeoMeta[]>([]);
  const [redirects, setRedirects] = React.useState<Redirect[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState<SeoMeta | null>(null);
  const [delMeta, setDelMeta] = React.useState<SeoMeta | null>(null);
  const [newRedirect, setNewRedirect] = React.useState({ source: "", target: "", permanent: true });

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const [m, r] = await Promise.all([
        apiGet<{ items: SeoMeta[] }>("/api/admin/seo-meta"),
        apiGet<{ items: Redirect[] }>("/api/admin/redirects"),
      ]);
      setMetas(m.items);
      setRedirects(r.items);
    } catch {
      toast.error("SEO verisi yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function saveMeta(m: SeoMeta) {
    try {
      await apiPut("/api/admin/seo-meta", {
        path: m.path,
        locale: m.locale,
        title: m.title || null,
        description: m.description || null,
        canonical: m.canonical || null,
        ogImage: m.ogImage || null,
        keywords: m.keywords,
        noindex: m.noindex,
      });
      toast.success("SEO kaydedildi");
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Kaydedilemedi");
    }
  }

  async function addRedirect() {
    if (!newRedirect.source.startsWith("/")) return toast.error("Kaynak / ile başlamalı");
    if (!newRedirect.target) return toast.error("Hedef gerekli");
    try {
      await apiPost("/api/admin/redirects", newRedirect);
      toast.success("Yönlendirme eklendi");
      setNewRedirect({ source: "", target: "", permanent: true });
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Eklenemedi");
    }
  }

  const summary = React.useMemo(() => {
    let good = 0,
      bad = 0;
    for (const m of metas) {
      const s = scoreMeta(m);
      if (s.level === "good") good++;
      else if (s.level === "bad") bad++;
    }
    return { good, bad, total: metas.length };
  }, [metas]);

  return (
    <div>
      <PageHeader
        title="SEO Yönetimi"
        description="Sayfa meta etiketleri, sosyal kartlar ve yönlendirmeler."
        actions={
          <Button size="sm" onClick={() => setEditing({ ...EMPTY })}>
            <Plus className="h-4 w-4" />
            Yeni Meta
          </Button>
        }
      />

      {/* Özet */}
      <div className="mb-5 grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-[12px] text-panel-fg-muted">Tanımlı sayfa</p>
            <p className="mt-1 text-[24px] font-bold text-panel-fg">{summary.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <CheckCircle2 className="h-7 w-7 text-panel-success" />
            <div>
              <p className="text-[12px] text-panel-fg-muted">İyi durumda</p>
              <p className="text-[20px] font-bold text-panel-fg">{summary.good}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="h-7 w-7 text-panel-danger" />
            <div>
              <p className="text-[12px] text-panel-fg-muted">Eksikli</p>
              <p className="text-[20px] font-bold text-panel-fg">{summary.bad}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meta tablosu */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sayfa Meta Etiketleri</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : metas.length === 0 ? (
            <p className="px-5 py-10 text-center text-[13px] text-panel-fg-muted">
              Henüz meta tanımı yok. &quot;Yeni Meta&quot; ile başlayın.
            </p>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Yol</TH>
                  <TH>Dil</TH>
                  <TH>Başlık</TH>
                  <TH>Skor</TH>
                  <TH className="w-24 text-right">İşlem</TH>
                </TR>
              </THead>
              <TBody>
                {metas.map((m) => {
                  const s = scoreMeta(m);
                  return (
                    <TR key={m.id}>
                      <TD className="font-mono text-[12px] text-panel-fg">{m.path}</TD>
                      <TD className="uppercase text-panel-fg-muted">{m.locale}</TD>
                      <TD className="max-w-xs truncate text-panel-fg-muted">{m.title ?? "—"}</TD>
                      <TD>
                        <ScoreDot s={s} />
                      </TD>
                      <TD>
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setEditing(m)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-surface-2 hover:text-panel-fg"
                            aria-label="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDelMeta(m)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-danger-soft hover:text-panel-danger"
                            aria-label="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Yönlendirmeler */}
      <Card>
        <CardHeader>
          <CardTitle>Yönlendirmeler (Redirects)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={newRedirect.source}
              onChange={(e) => setNewRedirect({ ...newRedirect, source: e.target.value })}
              placeholder="/eski-yol"
              className="min-w-[160px] flex-1 font-mono text-[12px]"
            />
            <ArrowRight className="h-4 w-4 shrink-0 text-panel-fg-subtle" />
            <Input
              value={newRedirect.target}
              onChange={(e) => setNewRedirect({ ...newRedirect, target: e.target.value })}
              placeholder="/yeni-yol"
              className="min-w-[160px] flex-1 font-mono text-[12px]"
            />
            <Select
              value={newRedirect.permanent ? "301" : "302"}
              onChange={(e) => setNewRedirect({ ...newRedirect, permanent: e.target.value === "301" })}
              className="w-24"
            >
              <option value="301">301</option>
              <option value="302">302</option>
            </Select>
            <Button size="sm" onClick={addRedirect}>
              <Plus className="h-4 w-4" />
              Ekle
            </Button>
          </div>
          {redirects.length > 0 && (
            <div className="divide-y divide-panel-border rounded-xl border border-panel-border">
              {redirects.map((r) => (
                <div key={r.id} className="flex items-center gap-3 px-3 py-2 text-[12.5px]">
                  <span className="font-mono text-panel-fg">{r.source}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-panel-fg-subtle" />
                  <span className="truncate font-mono text-panel-fg-muted">{r.target}</span>
                  <Badge variant={r.permanent ? "neutral" : "info"} className="ml-auto">
                    {r.permanent ? "301" : "302"}
                  </Badge>
                  <button
                    type="button"
                    onClick={async () => {
                      await apiDelete(`/api/admin/redirects/${r.id}`);
                      toast.success("Silindi");
                      load();
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-panel-fg-subtle hover:bg-panel-danger-soft hover:text-panel-danger"
                    aria-label="Sil"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {editing && <MetaEditor meta={editing} onClose={() => setEditing(null)} onSave={saveMeta} />}

      <ConfirmDialog
        open={!!delMeta}
        onClose={() => setDelMeta(null)}
        onConfirm={async () => {
          if (delMeta) {
            await apiDelete(`/api/admin/seo-meta?id=${delMeta.id}`);
            toast.success("Silindi");
            load();
          }
        }}
        title="Meta sil"
        description={delMeta ? `${delMeta.path} (${delMeta.locale}) silinecek.` : ""}
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

function MetaEditor({
  meta,
  onClose,
  onSave,
}: {
  meta: SeoMeta;
  onClose: () => void;
  onSave: (m: SeoMeta) => void;
}) {
  const [m, setM] = React.useState<SeoMeta>(meta);
  const s = scoreMeta(m);
  const set = (patch: Partial<SeoMeta>) => setM((p) => ({ ...p, ...patch }));

  return (
    <Dialog open onClose={onClose} size="xl" title={meta.id ? "Meta Düzenle" : "Yeni Meta"}>
      <div className="space-y-4">
        <FieldGrid>
          <Field label="Sayfa yolu" required hint="locale öneksiz, ör. /urunler">
            <Input value={m.path} onChange={(e) => set({ path: e.target.value })} className="font-mono text-[12px]" />
          </Field>
          <Field label="Dil">
            <Select value={m.locale} onChange={(e) => set({ locale: e.target.value })}>
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </Select>
          </Field>
        </FieldGrid>

        <Field label={`SEO başlığı — ${(m.title ?? "").length}/60`}>
          <Input value={m.title ?? ""} onChange={(e) => set({ title: e.target.value })} />
        </Field>
        <Field label={`Meta açıklama — ${(m.description ?? "").length}/160`}>
          <Textarea value={m.description ?? ""} onChange={(e) => set({ description: e.target.value })} rows={3} />
        </Field>
        <FieldGrid>
          <Field label="Canonical URL">
            <Input value={m.canonical ?? ""} onChange={(e) => set({ canonical: e.target.value })} />
          </Field>
          <Field label="Robots">
            <label className="flex h-9 items-center gap-2.5 text-[13px] text-panel-fg-muted">
              <Switch checked={m.noindex} onCheckedChange={(v) => set({ noindex: v })} />
              noindex (arama motorlarından gizle)
            </label>
          </Field>
        </FieldGrid>
        <Field label="OG / Sosyal görsel">
          <ImageField value={m.ogImage ?? ""} onChange={(v) => set({ ogImage: v })} />
        </Field>
        <Field label="Anahtar kelimeler">
          <TagInput value={m.keywords} onChange={(v) => set({ keywords: v })} />
        </Field>

        {/* Skor */}
        <div className="rounded-xl border border-panel-border bg-panel-surface-2 p-3">
          <div className="mb-2 flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${SCORE_COLOR[s.level]}`} />
            <span className="text-[13px] font-semibold text-panel-fg">SEO Skoru: {s.score}/100</span>
          </div>
          {s.issues.length === 0 ? (
            <p className="text-[12px] text-panel-success">Tüm kontroller başarılı.</p>
          ) : (
            <ul className="space-y-1">
              {s.issues.map((iss, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-1.5 text-[12px] ${
                    iss.level === "error"
                      ? "text-panel-danger"
                      : iss.level === "warn"
                        ? "text-panel-warning"
                        : "text-panel-fg-muted"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {iss.msg}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-panel-border pt-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Vazgeç
          </Button>
          <Button size="sm" onClick={() => onSave(m)} disabled={!m.path.trim()}>
            Kaydet
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
