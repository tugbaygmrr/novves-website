"use client";

import * as React from "react";
import { ArrowLeft, Info } from "lucide-react";
import type { FooterStrings } from "@/components/footer-i18n";
import { apiGet, apiPut } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/panel/ui/card";
import { Input } from "@/components/panel/ui/input";
import { Textarea } from "@/components/panel/ui/textarea";
import { Spinner } from "@/components/panel/ui/spinner";
import { Field } from "@/components/panel/form/field";
import { LocalePicker } from "@/components/panel/form/locale-picker";
import { FormFooter } from "@/components/panel/form/form-footer";
import { IconField } from "@/components/panel/fields/icon-field";

const FOOTER_SHOTS = [
  { src: "/panel/footer/footer-preview-1.png", alt: "Footer — üst bölüm (CTA, marka, menü sütunları)" },
  { src: "/panel/footer/footer-preview-2.png", alt: "Footer — alt bölüm (iletişim, sertifikalar, bülten, dil)" },
];

const LINK_COLUMNS: { key: keyof FooterStrings["links"]; title: string }[] = [
  { key: "products", title: "Ürünler sütunu" },
  { key: "solutions", title: "Çözümler sütunu" },
  { key: "engineering", title: "Mühendislik Hizmetleri sütunu" },
  { key: "resources", title: "Kaynaklar sütunu" },
  { key: "corporate", title: "Kurumsal sütunu" },
];

export function FooterManager({ onBack }: { onBack?: () => void }) {
  const [data, setData] = React.useState<FooterStrings | null>(null);
  const [locale, setLocale] = React.useState("tr");
  const [filled, setFilled] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback((loc: string) => {
    setLoading(true);
    apiGet<{ data: FooterStrings; overriddenLocales: string[] }>(`/api/admin/footer?locale=${loc}`)
      .then((j) => {
        setData(j.data);
        setFilled(j.overriddenLocales ?? []);
      })
      .catch(() => toast.error("Footer içeriği yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    load(locale);
  }, [locale, load]);

  /** Taslağı immutable olarak güncelle. */
  function update(mut: (draft: FooterStrings) => void) {
    setData((prev) => {
      if (!prev) return prev;
      const draft = structuredClone(prev);
      mut(draft);
      return draft;
    });
  }

  type ContactIconKey = "phone" | "email" | "headOffice" | "factory";
  function contactIconProps(key: ContactIconKey) {
    const ci = data?.contactIcons?.[key];
    return {
      value: ci?.icon ?? "",
      onChange: (v: string) =>
        update((d) => {
          const c = (d.contactIcons ??= {});
          c[key] = { ...(c[key] ?? {}), icon: v };
        }),
      imageValue: ci?.iconImage ?? "",
      onImageChange: (v: string) =>
        update((d) => {
          const c = (d.contactIcons ??= {});
          c[key] = { ...(c[key] ?? {}), iconImage: v };
        }),
    };
  }

  function certIconProps(i: number) {
    const ci = data?.certificates.itemIcons?.[i];
    return {
      value: ci?.icon ?? "",
      onChange: (v: string) =>
        update((d) => {
          const arr = (d.certificates.itemIcons ??= []);
          while (arr.length <= i) arr.push({});
          arr[i] = { ...arr[i], icon: v };
        }),
      imageValue: ci?.iconImage ?? "",
      onImageChange: (v: string) =>
        update((d) => {
          const arr = (d.certificates.itemIcons ??= []);
          while (arr.length <= i) arr.push({});
          arr[i] = { ...arr[i], iconImage: v };
        }),
    };
  }

  const downloadIconProps = {
    value: data?.certificates.downloadIcon?.icon ?? "",
    onChange: (v: string) =>
      update((d) => {
        d.certificates.downloadIcon = { ...(d.certificates.downloadIcon ?? {}), icon: v };
      }),
    imageValue: data?.certificates.downloadIcon?.iconImage ?? "",
    onImageChange: (v: string) =>
      update((d) => {
        d.certificates.downloadIcon = { ...(d.certificates.downloadIcon ?? {}), iconImage: v };
      }),
  };

  async function save() {
    if (!data) return;
    setSaving(true);
    try {
      await apiPut("/api/admin/footer", { locale, data });
      toast.success("Footer kaydedildi");
      setFilled((f) => (f.includes(locale) ? f : [...f, locale]));
    } catch {
      toast.error("Kaydedilemedi");
    } finally {
      setSaving(false);
    }
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
          Genel bölümleri
        </button>
      )}
      <PageHeader
        title="Footer"
        description="Sitenin alt bilgi alanındaki tüm metinleri dile göre düzenleyin. Sağdaki görseller hangi alanın nereye denk geldiğini gösterir."
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="text-[13px] text-panel-fg-muted">Düzenlenen dil:</span>
        <LocalePicker value={locale} onChange={setLocale} filled={filled} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* ── Sol: form ── */}
        <div className="space-y-5">
          {loading || !data ? (
            <div className="flex items-center justify-center rounded-2xl border border-panel-border bg-panel-surface py-20">
              <Spinner />
            </div>
          ) : (
            <>
              {/* 1 — Üst CTA şeridi */}
              <Section title="Üst CTA Şeridi" desc="Footer'ın en üstündeki mavi kart.">
                <Field label="Başlık yanı ikon (yuvarlak)" hint="Boş bırakılırsa varsayılan mikrofon ikonu kullanılır.">
                  <IconField
                    value={data.cta.icon ?? ""}
                    onChange={(v) => update((d) => { d.cta.icon = v; })}
                    imageValue={data.cta.iconImage ?? ""}
                    onImageChange={(v) => update((d) => { d.cta.iconImage = v; })}
                  />
                </Field>
                <Field label="Başlık">
                  <Textarea value={data.cta.title} onChange={(e) => update((d) => { d.cta.title = e.target.value; })} rows={2} />
                </Field>
                <Field label="Açıklama">
                  <Textarea value={data.cta.desc} onChange={(e) => update((d) => { d.cta.desc = e.target.value; })} rows={2} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Buton metni">
                    <Input value={data.cta.button} onChange={(e) => update((d) => { d.cta.button = e.target.value; })} />
                  </Field>
                  <Field label="Buton altı not">
                    <Input value={data.cta.note} onChange={(e) => update((d) => { d.cta.note = e.target.value; })} />
                  </Field>
                </div>
                <p className="pt-1 text-[12px] font-semibold text-panel-fg-muted">Dört ikon (başlık + ikon)</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.pillars.map((p, i) => (
                    <div key={i} className="space-y-2.5 rounded-lg border border-panel-border bg-panel-surface-2 p-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Input value={p.line1} placeholder="Satır 1" onChange={(e) => update((d) => { d.pillars[i].line1 = e.target.value; })} />
                        <Input value={p.line2} placeholder="Satır 2" onChange={(e) => update((d) => { d.pillars[i].line2 = e.target.value; })} />
                      </div>
                      <IconField
                        value={p.icon ?? ""}
                        onChange={(v) => update((d) => { d.pillars[i].icon = v; })}
                        imageValue={p.iconImage ?? ""}
                        onImageChange={(v) => update((d) => { d.pillars[i].iconImage = v; })}
                      />
                    </div>
                  ))}
                </div>
                <Note>İkon boş bırakılırsa o pillar için sitedeki varsayılan ikon kullanılır. Listeden bir ikon seçebilir veya kendi görselinizi yükleyebilirsiniz.</Note>
              </Section>

              {/* 2 — Marka bloğu */}
              <Section title="Marka Bloğu" desc="Logo altındaki açıklama ve büyük slogan.">
                <Field label="Büyük slogan (sağ üst başlık)">
                  <Textarea value={data.brandSlogan} onChange={(e) => update((d) => { d.brandSlogan = e.target.value; })} rows={2} />
                </Field>
                <Field label="Marka açıklaması (logo altı)">
                  <Textarea value={data.brand.desc} onChange={(e) => update((d) => { d.brand.desc = e.target.value; })} rows={3} />
                </Field>
                <Field label="Tanıtım videosu erişilebilirlik başlığı" hint="Ekranda görünmez; ekran okuyucu / iframe başlığı.">
                  <Input value={data.videoTitle} onChange={(e) => update((d) => { d.videoTitle = e.target.value; })} />
                </Field>
              </Section>

              {/* 3 — İletişim */}
              <Section title="İletişim Bloğu" desc="Sosyal ikonların altındaki iletişim kutusu.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Telefon etiketi">
                    <Input value={data.contactLabels.phone} onChange={(e) => update((d) => { d.contactLabels.phone = e.target.value; })} />
                  </Field>
                  <Field label="Telefon numarası">
                    <Input value={data.phone ?? ""} onChange={(e) => update((d) => { d.phone = e.target.value; })} />
                  </Field>
                  <Field label="E-posta etiketi">
                    <Input value={data.contactLabels.email} onChange={(e) => update((d) => { d.contactLabels.email = e.target.value; })} />
                  </Field>
                  <Field label="E-posta adresi">
                    <Input value={data.email ?? ""} onChange={(e) => update((d) => { d.email = e.target.value; })} />
                  </Field>
                  <Field label="Merkez Ofis etiketi">
                    <Input value={data.contact.headOffice} onChange={(e) => update((d) => { d.contact.headOffice = e.target.value; })} />
                  </Field>
                  <Field label="Üretim Tesisi etiketi">
                    <Input value={data.contact.factory} onChange={(e) => update((d) => { d.contact.factory = e.target.value; })} />
                  </Field>
                </div>
                <p className="pt-1 text-[12px] font-semibold text-panel-fg-muted">İkonlar (boş = varsayılan)</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Telefon ikonu"><IconField {...contactIconProps("phone")} /></Field>
                  <Field label="E-posta ikonu"><IconField {...contactIconProps("email")} /></Field>
                  <Field label="Merkez Ofis ikonu"><IconField {...contactIconProps("headOffice")} /></Field>
                  <Field label="Üretim Tesisi ikonu"><IconField {...contactIconProps("factory")} /></Field>
                </div>
                <Note>Adres satırları ve sosyal medya bağlantıları site genelinde ortak ayardan gelir; buradan etiketleri ve ikonları düzenlersiniz.</Note>
              </Section>

              {/* 4 — Menü sütunları */}
              <Section title="Menü Sütunları" desc="Beş sütunun başlıkları ve bağlantı metinleri. Bağlantı adresleri sabittir; yalnızca görünen metin değişir.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Ürünler başlığı"><Input value={data.sections.products} onChange={(e) => update((d) => { d.sections.products = e.target.value; })} /></Field>
                  <Field label="Çözümler başlığı"><Input value={data.sections.solutions} onChange={(e) => update((d) => { d.sections.solutions = e.target.value; })} /></Field>
                  <Field label="Mühendislik başlığı"><Input value={data.sections.engineering} onChange={(e) => update((d) => { d.sections.engineering = e.target.value; })} /></Field>
                  <Field label="Kaynaklar başlığı"><Input value={data.sections.resources} onChange={(e) => update((d) => { d.sections.resources = e.target.value; })} /></Field>
                  <Field label="Kurumsal başlığı"><Input value={data.sections.corporate} onChange={(e) => update((d) => { d.sections.corporate = e.target.value; })} /></Field>
                </div>
                {LINK_COLUMNS.map((col) => (
                  <div key={col.key} className="rounded-lg border border-panel-border bg-panel-surface-2 p-3">
                    <p className="mb-2 text-[12px] font-semibold text-panel-fg-muted">{col.title}</p>
                    <div className="space-y-2">
                      {data.links[col.key].map((label, i) => (
                        <Input
                          key={i}
                          value={label}
                          onChange={(e) => update((d) => { d.links[col.key][i] = e.target.value; })}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </Section>

              {/* 5 — Sertifikalar */}
              <Section title="Sertifikalar & Standartlar" desc="Standart kodları (EN 12101-3, ISO 9001…) sabittir; açıklama ve ikonları düzenlenir.">
                <Field label="Bölüm başlığı"><Input value={data.certificates.title} onChange={(e) => update((d) => { d.certificates.title = e.target.value; })} /></Field>
                <div className="space-y-3">
                  {data.certificates.items.map((item, i) => (
                    <div key={i} className="space-y-2.5 rounded-lg border border-panel-border bg-panel-surface-2 p-3">
                      <Field label={`${i + 1}. sertifika açıklaması`}>
                        <Input value={item} onChange={(e) => update((d) => { d.certificates.items[i] = e.target.value; })} />
                      </Field>
                      <Field label="İkon (boş = varsayılan rozet)">
                        <IconField {...certIconProps(i)} />
                      </Field>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Katalog indir butonu"><Input value={data.certificates.downloadCatalog} onChange={(e) => update((d) => { d.certificates.downloadCatalog = e.target.value; })} /></Field>
                  <Field label="Katalog indir açıklaması"><Input value={data.certificates.downloadCatalogDesc} onChange={(e) => update((d) => { d.certificates.downloadCatalogDesc = e.target.value; })} /></Field>
                </div>
                <Field label="Katalog indir ikonu (boş = varsayılan)">
                  <IconField {...downloadIconProps} />
                </Field>
              </Section>

              {/* 6 — Bülten */}
              <Section title="Bülten (Newsletter)" desc="“Yeniliklerden haberdar olun” bloğu.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Başlık"><Input value={data.newsletter.title} onChange={(e) => update((d) => { d.newsletter.title = e.target.value; })} /></Field>
                  <Field label="Giriş alanı yer tutucu"><Input value={data.newsletter.placeholder} onChange={(e) => update((d) => { d.newsletter.placeholder = e.target.value; })} /></Field>
                </div>
                <Field label="Açıklama"><Textarea value={data.newsletter.desc} onChange={(e) => update((d) => { d.newsletter.desc = e.target.value; })} rows={2} /></Field>
                <Field label="Başarı mesajı"><Input value={data.newsletter.success} onChange={(e) => update((d) => { d.newsletter.success = e.target.value; })} /></Field>
                <Field label="Bülten ikonu (yuvarlak, boş = varsayılan zarf)">
                  <IconField
                    value={data.newsletter.icon ?? ""}
                    onChange={(v) => update((d) => { d.newsletter.icon = v; })}
                    imageValue={data.newsletter.iconImage ?? ""}
                    onImageChange={(v) => update((d) => { d.newsletter.iconImage = v; })}
                  />
                </Field>
              </Section>

              {/* 7 — Uygulama alanları */}
              <Section title="Uygulama Alanları" desc="Altı ikonun başlıkları (kısa, iki satıra bölünebilir).">
                <Field label="Bölüm başlığı"><Input value={data.applicationAreas.title} onChange={(e) => update((d) => { d.applicationAreas.title = e.target.value; })} /></Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  {data.applicationAreas.items.map((a, i) => (
                    <div key={i} className="space-y-2.5 rounded-lg border border-panel-border bg-panel-surface-2 p-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <Input value={a.line1} placeholder="Satır 1" onChange={(e) => update((d) => { d.applicationAreas.items[i].line1 = e.target.value; })} />
                        <Input value={a.line2 ?? ""} placeholder="Satır 2 (ops.)" onChange={(e) => update((d) => { d.applicationAreas.items[i].line2 = e.target.value; })} />
                      </div>
                      <IconField
                        value={a.icon ?? ""}
                        onChange={(v) => update((d) => { d.applicationAreas.items[i].icon = v; })}
                        imageValue={a.iconImage ?? ""}
                        onImageChange={(v) => update((d) => { d.applicationAreas.items[i].iconImage = v; })}
                      />
                    </div>
                  ))}
                </div>
                <Note>İkon boş bırakılırsa o alan için sitedeki varsayılan ikon kullanılır.</Note>
              </Section>

              {/* 8 — Global + Dil */}
              <Section title="Global Başlık & Dil" desc="Dünya haritası yanındaki yazı ve dil seçimi başlığı.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Global yazı — satır 1"><Input value={data.globalCaption.line1} onChange={(e) => update((d) => { d.globalCaption.line1 = e.target.value; })} /></Field>
                  <Field label="Global yazı — satır 2"><Input value={data.globalCaption.line2} onChange={(e) => update((d) => { d.globalCaption.line2 = e.target.value; })} /></Field>
                </div>
                <Field label="Dil seçimi başlığı"><Input value={data.langTitle} onChange={(e) => update((d) => { d.langTitle = e.target.value; })} /></Field>
              </Section>

              {/* 9 — Alt bar */}
              <Section title="Alt Bar" desc="En alttaki telif satırı ve yasal bağlantı yedek metinleri.">
                <Field label="Telif (copyright) metni"><Input value={data.bottom.copyright} onChange={(e) => update((d) => { d.bottom.copyright = e.target.value; })} /></Field>
                <Field label="“Web Design & Development by” metni"><Input value={data.bottom.poweredBy} onChange={(e) => update((d) => { d.bottom.poweredBy = e.target.value; })} /></Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Gizlilik ve Uyum"><Input value={data.bottom.legalCenter} onChange={(e) => update((d) => { d.bottom.legalCenter = e.target.value; })} /></Field>
                  <Field label="Gizlilik Politikası"><Input value={data.bottom.privacyPolicy} onChange={(e) => update((d) => { d.bottom.privacyPolicy = e.target.value; })} /></Field>
                  <Field label="Çerez Politikası"><Input value={data.bottom.cookieSettings} onChange={(e) => update((d) => { d.bottom.cookieSettings = e.target.value; })} /></Field>
                  <Field label="Başvuru Formu"><Input value={data.bottom.applicationForm} onChange={(e) => update((d) => { d.bottom.applicationForm = e.target.value; })} /></Field>
                </div>
                <Note>Alt bardaki yasal bağlantılar Menü Yönetimi (footer_legal) doluysa oradan gelir; buradaki metinler yedek olarak kullanılır.</Note>
              </Section>

              <FormFooter onCancel={() => onBack?.()} onSave={save} saving={saving} />
            </>
          )}
        </div>

        {/* ── Sağ: ekran görüntüsü rehberi ── */}
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <div className="space-y-3">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-panel-fg-muted">
              <Info className="h-3.5 w-3.5 text-panel-accent" />
              Hangi alan nerede?
            </p>
            {FOOTER_SHOTS.map((shot) => (
              <div key={shot.src} className="overflow-hidden rounded-xl border border-panel-border bg-panel-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} className="block w-full" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {desc && <CardDescription>{desc}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg bg-panel-surface-2 px-3 py-2 text-[12px] leading-relaxed text-panel-fg-subtle">
      {children}
    </p>
  );
}
