"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PANEL_BASE } from "@/lib/panel/nav";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Select } from "@/components/panel/ui/select";
import { Spinner } from "@/components/panel/ui/spinner";
import { Field, FieldGrid } from "@/components/panel/form/field";
import { TranslationsTabs, type Translation } from "@/components/panel/form/translations-tabs";
import { StatusSegmented } from "@/components/panel/form/status-segmented";
import { FormFooter } from "@/components/panel/form/form-footer";
import { MediaPickerField, type MediaRef } from "@/components/panel/media/media-picker";

const LIST = `${PANEL_BASE}/teknik-merkez`;

export function TechnicalDocForm({ id }: { id?: number }) {
  const router = useRouter();
  const editing = typeof id === "number";

  const [loading, setLoading] = React.useState(editing);
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [categories, setCategories] = React.useState<{ id: number; name: string }[]>([]);

  const [translations, setTranslations] = React.useState<Translation[]>([{ locale: "tr" }]);
  const [categoryId, setCategoryId] = React.useState<number | "">("");
  const [file, setFile] = React.useState<MediaRef | null>(null);
  const [cover, setCover] = React.useState<MediaRef | null>(null);
  const [version, setVersion] = React.useState("");
  const [publishDate, setPublishDate] = React.useState("");
  const [productSlug, setProductSlug] = React.useState("");
  const [status, setStatus] = React.useState<"DRAFT" | "PUBLISHED">("DRAFT");

  React.useEffect(() => {
    apiGet<{ items: { id: number; name: string }[] }>("/api/admin/doc-categories")
      .then((j) => setCategories(j.items))
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    if (!editing) return;
    (async () => {
      try {
        const { doc } = await apiGet<{ doc: Record<string, unknown> }>(
          `/api/admin/technical-documents/${id}`,
        );
        const d = doc as {
          translations: Translation[];
          categoryId: number;
          version: string | null;
          publishDate: string | null;
          productSlug: string | null;
          status: "DRAFT" | "PUBLISHED";
          file: { id: number; path: string; fileName: string } | null;
          cover: { id: number; path: string } | null;
        };
        setTranslations(d.translations.length ? d.translations : [{ locale: "tr" }]);
        setCategoryId(d.categoryId);
        setVersion(d.version ?? "");
        setPublishDate(d.publishDate ? String(d.publishDate).slice(0, 10) : "");
        setProductSlug(d.productSlug ?? "");
        setStatus(d.status);
        setFile(d.file ? { id: d.file.id, path: d.file.path, fileName: d.file.fileName } : null);
        setCover(d.cover ? { id: d.cover.id, path: d.cover.path } : null);
      } catch {
        toast.error("Doküman yüklenemedi");
      } finally {
        setLoading(false);
      }
    })();
  }, [editing, id]);

  async function save() {
    const tr = translations.find((t) => t.locale === "tr");
    if (!tr?.title || !String(tr.title).trim()) return toast.error("Türkçe başlık zorunlu");
    if (!categoryId) return toast.error("Kategori seçin");
    if (!file) return toast.error("Dosya seçin");
    setSaving(true);
    try {
      const body = {
        categoryId: Number(categoryId),
        fileId: file.id,
        coverId: cover?.id ?? null,
        version: version || null,
        publishDate: publishDate || null,
        productSlug: productSlug || null,
        status,
        translations,
      };
      if (editing) await apiPut(`/api/admin/technical-documents/${id}`, body);
      else await apiPost(`/api/admin/technical-documents`, body);
      toast.success(editing ? "Güncellendi" : "Doküman oluşturuldu");
      router.push(LIST);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    setDeleting(true);
    try {
      await apiDelete(`/api/admin/technical-documents/${id}`);
      toast.success("Silindi");
      router.push(LIST);
    } catch {
      toast.error("Silme başarısız");
    } finally {
      setDeleting(false);
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
    <div className="mx-auto max-w-3xl">
      <Link href={LIST} className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-panel-accent hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Teknik Merkez
      </Link>
      <h1 className="mb-5 text-[22px] font-bold tracking-tight text-panel-fg">
        {editing ? "Dokümanı Düzenle" : "Yeni Doküman"}
      </h1>

      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Doküman Bilgisi (dil bazlı)</CardTitle>
          </CardHeader>
          <CardContent>
            <TranslationsTabs
              value={translations}
              onChange={setTranslations}
              fields={[
                { key: "title", label: "Başlık", required: true },
                { key: "description", label: "Açıklama", type: "textarea", rows: 3 },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dosyalar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Doküman dosyası" required hint="PDF, DWG, DOCX, XLSX, ZIP…">
              <MediaPickerField value={file} onChange={setFile} kind="DOCUMENT" placeholder="Dosya seçilmedi" />
            </Field>
            <Field label="Kapak görseli">
              <MediaPickerField value={cover} onChange={setCover} kind="IMAGE" placeholder="Kapak seçilmedi" />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sınıflandırma</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGrid>
              <Field label="Kategori" required>
                <Select value={String(categoryId)} onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : "")}>
                  <option value="">Seçin…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Durum">
                <StatusSegmented value={status} onChange={setStatus} />
              </Field>
              <Field label="Sürüm">
                <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="v1.0" />
              </Field>
              <Field label="Yayın tarihi">
                <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
              </Field>
            </FieldGrid>
            <Field label="İlgili ürün slug" hint="İsteğe bağlı — dokümanı bir ürüne bağlar">
              <Input value={productSlug} onChange={(e) => setProductSlug(e.target.value)} />
            </Field>
          </CardContent>
        </Card>
      </div>

      <FormFooter
        onCancel={() => router.push(LIST)}
        onSave={save}
        saving={saving}
        onDelete={editing ? remove : undefined}
        deleting={deleting}
        saveLabel={editing ? "Güncelle" : "Oluştur"}
      />
    </div>
  );
}
