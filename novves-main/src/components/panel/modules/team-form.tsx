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
import { Spinner } from "@/components/panel/ui/spinner";
import { Field, FieldGrid } from "@/components/panel/form/field";
import { TranslationsTabs, type Translation } from "@/components/panel/form/translations-tabs";
import { StatusSegmented } from "@/components/panel/form/status-segmented";
import { FormFooter } from "@/components/panel/form/form-footer";
import { MediaPickerField, type MediaRef } from "@/components/panel/media/media-picker";

const LIST = `${PANEL_BASE}/ekip`;

export function TeamForm({ id }: { id?: number }) {
  const router = useRouter();
  const editing = typeof id === "number";

  const [loading, setLoading] = React.useState(editing);
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const [translations, setTranslations] = React.useState<Translation[]>([{ locale: "tr" }]);
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [status, setStatus] = React.useState<"DRAFT" | "PUBLISHED">("PUBLISHED");
  const [photo, setPhoto] = React.useState<MediaRef | null>(null);

  React.useEffect(() => {
    if (!editing) return;
    (async () => {
      try {
        const { member: m } = await apiGet<{ member: Record<string, unknown> }>(
          `/api/admin/team/${id}`,
        );
        const mem = m as {
          translations: Translation[];
          email: string | null;
          phone: string | null;
          linkedin: string | null;
          department: string | null;
          status: "DRAFT" | "PUBLISHED";
          photo: { id: number; path: string } | null;
        };
        setTranslations(mem.translations.length ? mem.translations : [{ locale: "tr" }]);
        setEmail(mem.email ?? "");
        setPhone(mem.phone ?? "");
        setLinkedin(mem.linkedin ?? "");
        setDepartment(mem.department ?? "");
        setStatus(mem.status);
        setPhoto(mem.photo ? { id: mem.photo.id, path: mem.photo.path } : null);
      } catch {
        toast.error("Üye yüklenemedi");
      } finally {
        setLoading(false);
      }
    })();
  }, [editing, id]);

  async function save() {
    const tr = translations.find((t) => t.locale === "tr");
    if (!tr?.name || !String(tr.name).trim()) return toast.error("Türkçe ad zorunlu");
    setSaving(true);
    try {
      const body = {
        photoId: photo?.id ?? null,
        email: email || null,
        phone: phone || null,
        linkedin: linkedin || null,
        department: department || null,
        status,
        translations,
      };
      if (editing) await apiPut(`/api/admin/team/${id}`, body);
      else await apiPost(`/api/admin/team`, body);
      toast.success(editing ? "Güncellendi" : "Üye eklendi");
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
      await apiDelete(`/api/admin/team/${id}`);
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
        Ekip
      </Link>
      <h1 className="mb-5 text-[22px] font-bold tracking-tight text-panel-fg">
        {editing ? "Üyeyi Düzenle" : "Yeni Üye"}
      </h1>

      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Fotoğraf</CardTitle>
          </CardHeader>
          <CardContent>
            <MediaPickerField value={photo} onChange={setPhoto} kind="IMAGE" placeholder="Fotoğraf seçilmedi" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kimlik (dil bazlı)</CardTitle>
          </CardHeader>
          <CardContent>
            <TranslationsTabs
              value={translations}
              onChange={setTranslations}
              fields={[
                { key: "name", label: "Ad Soyad", required: true },
                { key: "title", label: "Ünvan" },
                { key: "bio", label: "Biyografi", type: "textarea", rows: 4 },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>İletişim & Durum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGrid>
              <Field label="E-posta">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <Field label="Telefon">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Field>
              <Field label="LinkedIn">
                <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://..." />
              </Field>
              <Field label="Departman">
                <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
              </Field>
            </FieldGrid>
            <Field label="Durum">
              <StatusSegmented value={status} onChange={setStatus} />
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
