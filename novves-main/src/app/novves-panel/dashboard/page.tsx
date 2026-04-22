"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   GÃ¶rsel Form EditÃ¶rÃ¼ â€” JSON yerine kullanÄ±cÄ± dostu alanlar
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/** GÃ¼zel alan adÄ± Ã¼ret: camelCase â†’ "Camel Case" */
function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/([0-9]+)/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/** Uzun mu kÄ±sa mÄ± input olacak? */
function isLongText(value: string): boolean {
  return value.length > 80 || value.includes("\n");
}

/** Recursive form renderer */
function FieldEditor({
  data,
  path,
  onChange,
  depth = 0,
}: {
  data: unknown;
  path: string;
  onChange: (path: string, value: unknown) => void;
  depth?: number;
}): ReactNode {
  if (data === null || data === undefined) return null;

  // String â†’ input veya textarea
  if (typeof data === "string") {
    return isLongText(data) ? (
      <textarea
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
    ) : (
      <input
        type="text"
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
    );
  }

  // Number
  if (typeof data === "number") {
    return (
      <input
        type="number"
        value={data}
        onChange={(e) => onChange(path, Number(e.target.value))}
        className="w-40 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-800 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
    );
  }

  // Boolean
  if (typeof data === "boolean") {
    return (
      <button
        type="button"
        onClick={() => onChange(path, !data)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data ? "bg-orange-500" : "bg-gray-200"}`}
      >
        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${data ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    );
  }

  // Array
  if (Array.isArray(data)) {
    return (
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400">#{i + 1}</span>
              <button
                type="button"
                onClick={() => {
                  const arr = [...data];
                  arr.splice(i, 1);
                  onChange(path, arr);
                }}
                className="rounded p-1 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
                title="Sil"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FieldEditor data={item} path={`${path}[${i}]`} onChange={onChange} depth={depth + 1} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const template = data.length > 0
              ? JSON.parse(JSON.stringify(data[0], (_k, v) => (typeof v === "string" ? "" : v)))
              : "";
            onChange(path, [...data, template]);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-2.5 text-[12px] font-medium text-gray-400 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Yeni ekle
        </button>
      </div>
    );
  }

  // Object
  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    return (
      <div className={`space-y-4 ${depth > 0 ? "" : ""}`}>
        {entries.map(([key, value]) => {
          const isNested = typeof value === "object" && value !== null && !Array.isArray(value);
          const isArray = Array.isArray(value);
          const fieldPath = path ? `${path}.${key}` : key;

          return (
            <div key={key}>
              <label className="mb-1.5 flex items-center gap-2">
                <span className="text-[12px] font-semibold text-gray-600">{humanize(key)}</span>
                {isArray && (
                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium text-blue-500">
                    {(value as unknown[]).length} öğe
                  </span>
                )}
              </label>
              {isNested ? (
                <div className="rounded-xl border border-gray-100 bg-[#fafbfc] p-4">
                  <FieldEditor data={value} path={fieldPath} onChange={onChange} depth={depth + 1} />
                </div>
              ) : (
                <FieldEditor data={value} path={fieldPath} onChange={onChange} depth={depth + 1} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return <span className="text-[12px] text-gray-400">{String(data)}</span>;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   NOVVES Admin Dashboard â€” Full CMS
   TÃ¼m sÃ¶zlÃ¼k dosyalarÄ±nÄ± yÃ¶netir (10 dosya, 3 dil)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* â”€â”€ Sayfa gruplarÄ± ve bÃ¶lÃ¼mleri â”€â”€ */
interface PageGroup {
  file: string;
  label: string;
  icon: string;
  sections: { key: string; label: string }[];
}

const PAGE_GROUPS: PageGroup[] = [
  {
    file: "home",
    label: "Ana Sayfa",
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    sections: [
      { key: "hero", label: "Hero" },
      { key: "animation2", label: "Animasyon 2" },
      { key: "pillars", label: "3 Sütun" },
      { key: "midCta", label: "Orta CTA" },
      { key: "productCategories", label: "Ürün Kategorileri" },
      { key: "video", label: "Video" },
      { key: "faq", label: "SSS" },
      { key: "social", label: "Sosyal Medya" },
      { key: "finalCta", label: "Son CTA" },
    ],
  },
  {
    file: "common",
    label: "Genel (Navbar/Footer)",
    icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
    sections: [
      { key: "navbar", label: "Navbar" },
      { key: "footer", label: "Footer" },
      { key: "shared", label: "Ortak Metinler" },
    ],
  },
  {
    file: "products",
    label: "Ürünler",
    icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
    sections: [
      { key: "shared", label: "Ortak" },
      { key: "havaHareketi", label: "Hava Hareketi" },
      { key: "iklimlendirme", label: "İklimlendirme" },
      { key: "sogutmaVeIsitma", label: "Soğutma ve Isıtma" },
      { key: "havaYonetimi", label: "Hava Yönetimi" },
      { key: "havaDagitimi", label: "Hava Dağıtımı" },
      { key: "havaFiltrasyonu", label: "Hava Filtrasyonu" },
      { key: "aksesuarlar", label: "Aksesuarlar" },
      { key: "otomasyonMalzemeleri", label: "Otomasyon Malz." },
      { key: "titresimVeSesIzolasyon", label: "Titreşim İzolasyon" },
      { key: "banyoFanlari", label: "Banyo Fanları" },
      { key: "catiFanlari", label: "Çatı Fanları" },
      { key: "damperler", label: "Damperler" },
      { key: "dumanIsiTahliyeFanlari", label: "Duman Tahliye Fan." },
      { key: "duvarTipiFanlar", label: "Duvar Tipi Fanlar" },
      { key: "ecFanlar", label: "EC Fanlar" },
      { key: "endustriyelFanlar", label: "Endüstriyel Fanlar" },
      { key: "exproofFanlar", label: "Exproof Fanlar" },
      { key: "havuzNemAlmaSantrali", label: "Havuz Nem Alma" },
      { key: "hucreliFanlar", label: "Hücreli Fanlar" },
      { key: "isiGeriKazanimCihazlari", label: "Isı Geri Kazanım" },
      { key: "kanalFanlari", label: "Kanal Fanları" },
      { key: "klimaSantralleri", label: "Klima Santralleri" },
      { key: "kovanTipiAksiyalFanlar", label: "Kovan Tipi Fanlar" },
      { key: "mutfakFanlari", label: "Mutfak Fanları" },
      { key: "siginakFanlari", label: "Sığınak Fanları" },
    ],
  },
  {
    file: "solutions",
    label: "Çözümler",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    sections: [
      { key: "dumanIsiTahliye", label: "Duman & Isı Tahliye" },
      { key: "konforIklimlendirme", label: "Konfor İklimlendirme" },
      { key: "hijyenikFiltrasyon", label: "Hijyenik Filtrasyon" },
      { key: "endustriyelHavaYonetimi", label: "Endüstriyel Hava" },
      { key: "hayvancilikTesisleri", label: "Hayvancılık Tesisleri" },
      { key: "trafoEnerjiOdalari", label: "Trafo/Enerji Odaları" },
      { key: "seraTarimsal", label: "Sera & Tarımsal" },
      { key: "atexPatlamaKoruma", label: "ATEX Patlama Koruma" },
      { key: "akilliOtomasyon", label: "Akıllı Otomasyon" },
      { key: "konutHavalandirma", label: "Konut Havalandırma" },
      { key: "marinOffshore", label: "Marin & Offshore" },
      { key: "projeBazliOzelImalat", label: "Proje Bazlı İmalat" },
      { key: "cfdDanismanlik", label: "CFD Danışmanlık" },
    ],
  },
  {
    file: "services",
    label: "Hizmetler",
    icon: "M11.42 15.17l-3.95-4.66a.75.75 0 010-.98l3.95-4.66a.75.75 0 011.16.98L9.27 9.75h10.98a.75.75 0 010 1.5H9.27l3.31 3.9a.75.75 0 01-1.16.98zM7.5 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0V3.75z",
    sections: [
      { key: "cfdAnalizi", label: "CFD Analizi" },
      { key: "devreAlma", label: "Devreye Alma" },
      { key: "dumanKontrol", label: "Duman Kontrol" },
      { key: "teknikServis", label: "Teknik Servis" },
      { key: "yerindeKesif", label: "Yerinde Keşif" },
    ],
  },
  {
    file: "corporate",
    label: "Kurumsal",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
    sections: [
      { key: "bizKimiz", label: "Biz Kimiz" },
      { key: "ceoMesaji", label: "CEO Mesajı" },
      { key: "ekibimiz", label: "Ekibimiz" },
      { key: "referanslar", label: "Referanslar" },
      { key: "sertifikalar", label: "Sertifikalar" },
      { key: "politikamiz", label: "Politikamız" },
      { key: "basinOdasi", label: "Basın Odası" },
      { key: "haberler", label: "Haberler" },
    ],
  },
  {
    file: "contact",
    label: "İletişim",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    sections: [
      { key: "main", label: "İletişim Sayfası" },
      { key: "partnerlerimiz", label: "Partnerlerimiz" },
      { key: "sosyalMedya", label: "Sosyal Medya" },
    ],
  },
  {
    file: "sustainability",
    label: "Sürdürülebilirlik",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    sections: [
      { key: "main", label: "Ana Sayfa" },
      { key: "co2", label: "CO2" },
      { key: "geriDonusum", label: "Geri Dönüşüm" },
    ],
  },
  {
    file: "technical",
    label: "Teknik Merkez",
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    sections: [
      { key: "blog", label: "Blog" },
      { key: "dokumanKutuphanesi", label: "Doküman Kütüphanesi" },
      { key: "fanSecici", label: "Fan Seçici" },
      { key: "patentlerimiz", label: "Patentlerimiz" },
    ],
  },
  {
    file: "kvkk",
    label: "KVKK",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    sections: [
      { key: "breadcrumbHome", label: "Breadcrumb Home" },
      { key: "breadcrumbKvkk", label: "Breadcrumb KVKK" },
      { key: "badge", label: "Badge" },
      { key: "title", label: "Başlık" },
      { key: "titleHighlight", label: "Başlık Vurgu" },
      { key: "desc", label: "Açıklama" },
      { key: "sectionLabel", label: "Bölüm Etiketi" },
      { key: "sectionTitle", label: "Bölüm Başlığı" },
      { key: "viewDetails", label: "Detay Butonu" },
      { key: "links", label: "Linkler" },
    ],
  },
];

const LOCALES = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [locale, setLocale] = useState("tr");
  const [activeFile, setActiveFile] = useState("home");
  const [activeSection, setActiveSection] = useState("hero");
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [username, setUsername] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [expandedGroup, setExpandedGroup] = useState("home");

  // Auth check
  useEffect(() => {
    fetch("/api/admin/auth/verify")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/novves-panel");
        else setUsername(d.username);
      })
      .catch(() => router.replace("/novves-panel"));
  }, [router]);

  // Load content
  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content/${activeFile}?locale=${locale}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setContent(json.data);
      setFormData(json.data[activeSection] ?? null);
    } catch {
      setMessage({ type: "error", text: "İçerik yüklenemedi" });
    } finally {
      setLoading(false);
    }
  }, [locale, activeFile, activeSection]);

  useEffect(() => { loadContent(); }, [loadContent]);

  useEffect(() => {
    if (content && content[activeSection] !== undefined) {
      setFormData(content[activeSection]);
    }
  }, [activeSection, content]);

  /** Nested path ile form verisini gÃ¼ncelle: "endCard.title" veya "items[0].label" */
  function handleFieldChange(path: string, value: unknown) {
    setFormData((prev: unknown) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(/\.|\[(\d+)\]/).filter(Boolean);
      let obj: Record<string, unknown> = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        const num = Number(p);
        obj = (isNaN(num) ? obj[p] : (obj as unknown as unknown[])[num]) as Record<string, unknown>;
      }
      const last = parts[parts.length - 1];
      const lastNum = Number(last);
      if (isNaN(lastNum)) {
        obj[last] = value;
      } else {
        (obj as unknown as unknown[])[lastNum] = value;
      }
      return copy;
    });
  }

  function selectSection(file: string, sectionKey: string) {
    setActiveFile(file);
    setActiveSection(sectionKey);
    setExpandedGroup(file);
    setMessage(null);
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      // Read CSRF token from cookie (not httpOnly, accessible to JS)
      const csrfToken = document.cookie
        .split("; ")
        .find((c) => c.startsWith("admin_csrf_token="))
        ?.split("=")[1] ?? "";
      const res = await fetch(`/api/admin/content/${activeFile}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": decodeURIComponent(csrfToken),
        },
        body: JSON.stringify({ locale, section: activeSection, data: formData }),
      });
      const json = await res.json();
      if (!res.ok) setMessage({ type: "error", text: json.error || "Kaydetme başarısız" });
      else { setMessage({ type: "success", text: "Kaydedildi" }); loadContent(); }
    } catch { setMessage({ type: "error", text: "Sunucu hatası" }); }
    finally { setSaving(false); }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/novves-panel");
  }

  // Filter groups by search
  const filteredGroups = PAGE_GROUPS.map((g) => ({
    ...g,
    sections: sidebarSearch
      ? g.sections.filter((s) => s.label.toLowerCase().includes(sidebarSearch.toLowerCase()))
      : g.sections,
  })).filter((g) => sidebarSearch ? g.sections.length > 0 || g.label.toLowerCase().includes(sidebarSearch.toLowerCase()) : true);

  const currentGroup = PAGE_GROUPS.find((g) => g.file === activeFile);
  const currentSection = currentGroup?.sections.find((s) => s.key === activeSection);

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      {/* â•â•â• Sidebar â•â•â• */}
      <aside className="fixed left-0 top-0 flex h-full w-[280px] flex-col border-r border-gray-200/80 bg-white">
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <img src="/images/novves-icon.svg" alt="Novves" className="h-8 w-8" />
            <div>
              <h1 className="text-[13px] font-bold text-gray-900">NOVVES CMS</h1>
              <p className="text-[10px] text-gray-400">İçerik Yönetimi</p>
            </div>
          </div>
          <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-500">v2</span>
        </div>

        {/* Language */}
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="flex gap-1">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-semibold transition-all ${
                  locale === l.code
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
              >
                <span className="text-[13px]">{l.flag}</span>
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Bölüm ara..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-100 bg-gray-50/50 py-2 pl-9 pr-3 text-[12px] text-gray-700 placeholder-gray-300 outline-none transition-all focus:border-orange-300 focus:bg-white focus:ring-1 focus:ring-orange-200"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {filteredGroups.map((group) => {
            const isExpanded = expandedGroup === group.file || !!sidebarSearch;
            const isActiveGroup = activeFile === group.file;
            return (
              <div key={group.file} className="mb-1">
                {/* Group header */}
                <button
                  onClick={() => {
                    setExpandedGroup(isExpanded && !sidebarSearch ? "" : group.file);
                    if (!isActiveGroup) {
                      setActiveFile(group.file);
                      setActiveSection(group.sections[0]?.key ?? "");
                    }
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all ${
                    isActiveGroup
                      ? "bg-orange-50 text-orange-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <svg className={`h-4 w-4 shrink-0 ${isActiveGroup ? "text-orange-500" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={group.icon} />
                  </svg>
                  <span className="flex-1 text-[12px] font-semibold">{group.label}</span>
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-400">
                    {group.sections.length}
                  </span>
                  <svg className={`h-3 w-3 text-gray-300 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Section items */}
                {isExpanded && (
                  <div className="ml-5 mt-0.5 space-y-px border-l border-gray-100 pl-3">
                    {group.sections.map((s) => {
                      const isActive = activeFile === group.file && activeSection === s.key;
                      return (
                        <button
                          key={s.key}
                          onClick={() => selectSection(group.file, s.key)}
                          className={`block w-full rounded-lg px-3 py-1.5 text-left text-[11px] transition-all ${
                            isActive
                              ? "bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20"
                              : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-[11px] font-bold text-white shadow-sm">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-gray-700">{username}</p>
                <p className="text-[10px] text-gray-300">Yönetici</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
              title="Çıkış Yap"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* â•â•â• Main â•â•â• */}
      <main className="ml-[280px] flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-gray-200/60 bg-white/80 px-8 py-4 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[12px]">
                <span className="font-medium text-gray-400">{currentGroup?.label ?? ""}</span>
                <svg className="h-3 w-3 text-gray-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span className="font-semibold text-gray-800">{currentSection?.label ?? ""}</span>
              </div>

              {/* File badge */}
              <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-mono font-medium text-gray-400">
                {activeFile}.json
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-300">
              <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Otomatik yedekleme aktif
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="p-8">
          {/* Message */}
          {message && (
            <div
              className={`mb-5 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-[13px] font-medium ${
                message.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              <svg className={`h-4 w-4 shrink-0 ${message.type === "success" ? "text-emerald-500" : "text-red-500"}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={message.type === "success" ? "M4.5 12.75l6 6 9-13.5" : "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"} />
              </svg>
              {message.text}
              <button onClick={() => setMessage(null)} className="ml-auto opacity-40 hover:opacity-70">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Form Editor */}
          {loading ? (
            <div className="flex h-80 items-center justify-center rounded-2xl border border-gray-200 bg-white">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-orange-500" />
                <span className="text-[12px] text-gray-400">Yükleniyor...</span>
              </div>
            </div>
          ) : formData !== null ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Form area */}
              <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-8 py-6">
                <FieldEditor data={formData} path="" onChange={handleFieldChange} />
              </div>

              {/* Save bar */}
              <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-8 py-4 backdrop-blur-sm">
                <p className="text-[11px] text-gray-400">
                  Değişiklikler kaydetilmeden uygulanmaz
                </p>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Kaydet
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-2xl border border-gray-200 bg-white text-[13px] text-gray-400">
              Bu bölüm için içerik bulunamadı
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

