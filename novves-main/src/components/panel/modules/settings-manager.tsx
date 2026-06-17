"use client";

import * as React from "react";
import { BarChart3, Share2, Phone } from "lucide-react";
import { apiGet, apiPut } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Spinner } from "@/components/panel/ui/spinner";
import { Field, FieldGrid } from "@/components/panel/form/field";
import { FormFooter } from "@/components/panel/form/form-footer";
import { useRouter } from "next/navigation";

type Settings = Record<string, string | null>;

const KEYS = [
  "ga_id",
  "gtm_id",
  "search_console",
  "social_linkedin",
  "social_instagram",
  "social_youtube",
  "instagram_access_token",
  "instagram_user_id",
  "contact_email",
  "contact_phone",
  "contact_address",
];

export function SettingsManager() {
  const router = useRouter();
  const [s, setS] = React.useState<Settings>({});
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    apiGet<{ settings: Settings }>("/api/admin/settings")
      .then((j) => setS(j.settings ?? {}))
      .catch(() => toast.error("Ayarlar yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const set = (k: string, v: string) => setS((p) => ({ ...p, [k]: v }));
  const val = (k: string) => s[k] ?? "";

  async function save() {
    setSaving(true);
    try {
      const body: Settings = {};
      for (const k of KEYS) body[k] = val(k);
      await apiPut("/api/admin/settings", body);
      toast.success("Ayarlar kaydedildi");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Kaydedilemedi");
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
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Ayarlar" description="Site geneli yapılandırma." />

      <div className="space-y-5">
        <Card>
          <CardHeader className="flex-row items-center gap-2.5">
            <BarChart3 className="h-4 w-4 text-panel-accent" />
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGrid>
              <Field label="Google Analytics ID" hint="G-XXXXXXX">
                <Input value={val("ga_id")} onChange={(e) => set("ga_id", e.target.value)} />
              </Field>
              <Field label="Google Tag Manager ID" hint="GTM-XXXXX">
                <Input value={val("gtm_id")} onChange={(e) => set("gtm_id", e.target.value)} />
              </Field>
              <Field label="Search Console doğrulama">
                <Input value={val("search_console")} onChange={(e) => set("search_console", e.target.value)} />
              </Field>
            </FieldGrid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2.5">
            <Share2 className="h-4 w-4 text-panel-accent" />
            <CardTitle>Sosyal Medya</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGrid>
              <Field label="LinkedIn">
                <Input value={val("social_linkedin")} onChange={(e) => set("social_linkedin", e.target.value)} placeholder="https://..." />
              </Field>
              <Field label="Instagram">
                <Input value={val("social_instagram")} onChange={(e) => set("social_instagram", e.target.value)} placeholder="https://..." />
              </Field>
              <Field label="YouTube">
                <Input value={val("social_youtube")} onChange={(e) => set("social_youtube", e.target.value)} placeholder="https://..." />
              </Field>
            </FieldGrid>
            <div className="mt-4 border-t border-panel-border pt-4">
              <FieldGrid>
                <Field
                  label="Instagram erişim jetonu"
                  hint="Meta Graph API — sosyal medya sayfası akışı için. INSTAGRAM_ACCESS_TOKEN ile aynı."
                >
                  <Input
                    type="password"
                    autoComplete="off"
                    value={val("instagram_access_token")}
                    onChange={(e) => set("instagram_access_token", e.target.value)}
                    placeholder="EAA..."
                  />
                </Field>
                <Field
                  label="Instagram kullanıcı / işletme hesabı ID"
                  hint="Business API için. Boş bırakılırsa Basic Display /me/media denenir."
                >
                  <Input
                    value={val("instagram_user_id")}
                    onChange={(e) => set("instagram_user_id", e.target.value)}
                    placeholder="178414..."
                  />
                </Field>
              </FieldGrid>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2.5">
            <Phone className="h-4 w-4 text-panel-accent" />
            <CardTitle>İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGrid>
              <Field label="E-posta">
                <Input value={val("contact_email")} onChange={(e) => set("contact_email", e.target.value)} />
              </Field>
              <Field label="Telefon">
                <Input value={val("contact_phone")} onChange={(e) => set("contact_phone", e.target.value)} />
              </Field>
            </FieldGrid>
            <Field label="Adres">
              <Input value={val("contact_address")} onChange={(e) => set("contact_address", e.target.value)} />
            </Field>
          </CardContent>
        </Card>
      </div>

      <FormFooter onCancel={() => router.push("/novves-panel/dashboard")} onSave={save} saving={saving} />
    </div>
  );
}
