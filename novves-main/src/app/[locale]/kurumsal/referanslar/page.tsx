import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary, hasLocale } from "../../dictionaries";
import { corporateDetailMetadata } from "@/lib/i18n-metadata";
import { references } from "@/data/references";
import { applyReferencesLocale } from "@/lib/references/apply-reference-locale";
import { buildReferenceProductFamilyOptions } from "@/lib/references/reference-product-family";
import { ReferanslarClient } from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return corporateDetailMetadata(locale, "referanslar");
}

const UTF8_DECODER = new TextDecoder("utf-8");
const GARBLED_RE = /[ÃÄÅÂï¿½]/g;
const WORD_FIXES: Array<[string, string]> = [
  ["YoREĞİR", "YÜREĞİR"],
  ["YoRE", "YÜRE"],
  ["oRETİM", "ÜRETİM"],
  ["oRETIM", "ÜRETİM"],
  ["oSTRİYEL", "ÜSTRİYEL"],
  ["BoYoK", "BÜYÜK"],
  ["BiSKoVİ", "BİSKÜVİ"],
  ["BiSKoVi", "BİSKÜVİ"],
  ["BİSKoVİ", "BİSKÜVİ"],
  ["BİSKoVi", "BİSKÜVİ"],
  ["KIRLANGI?", "KIRLANGIÇ"],
  ["GoRPINAR", "GÜRPINAR"],
  ["GORPINAR", "GÜRPINAR"],
  ["GÖRPINAR", "GÜRPINAR"],
  ["ï¿½?EKMEKï¿½-Y", "ÇEKMEKÖY"],
  ["ï¿½?INARKï¿½-Y", "ÇINARKÖY"],
  ["Dï¿½-Nï¿½oÅï¿½oM", "DÖNÜŞÜM"],
  ["Gï¿½oRPINAR", "GÜRPINAR"],
  ["KIRLANGIï¿½?", "KIRLANGIÇ"],
  ["Ä°", "İ"],
  ["Ä±", "ı"],
  ["Å", "Ş"],
  ["Å", "ş"],
  ["Ä", "Ğ"],
  ["ÄŸ", "ğ"],
  ["Ã–", "Ö"],
  ["Ã¶", "ö"],
  ["Ãœ", "Ü"],
  ["Ã¼", "ü"],
  ["Ã‡", "Ç"],
  ["Ã§", "ç"],
];

function garbledScore(text: string): number {
  return (text.match(GARBLED_RE) ?? []).length;
}

function latin1ToUtf8(text: string): string {
  const bytes = Uint8Array.from(text, (char) => char.charCodeAt(0) & 0xff);
  return UTF8_DECODER.decode(bytes);
}

function decodeMojibake(value: string): string {
  let fixed = value;
  for (let i = 0; i < 3; i += 1) {
    const decoded = latin1ToUtf8(fixed);
    if (garbledScore(decoded) < garbledScore(fixed)) {
      fixed = decoded;
      continue;
    }
    break;
  }

  let normalized = fixed
    .replaceAll("Ã§", "ç")
    .replaceAll("Ã‡", "Ç")
    .replaceAll("Ã¶", "ö")
    .replaceAll("Ã–", "Ö")
    .replaceAll("Ã¼", "ü")
    .replaceAll("Ãœ", "Ü")
    .replaceAll("Ä±", "ı")
    .replaceAll("Ä°", "İ")
    .replaceAll("ÅŸ", "ş")
    .replaceAll("Åž", "Ş")
    .replaceAll("ÄŸ", "ğ")
    .replaceAll("Ä", "Ğ")
    .replaceAll("Â", "")
    .replaceAll("ï¿½o", "Ü")
    .replaceAll("ï¿½?", "Ç")
    .replaceAll("?", "");

  for (const [from, to] of WORD_FIXES) {
    normalized = normalized.replaceAll(from, to);
  }

  return normalized;
}

function cleanDisplayText(value: string): string {
  return decodeMojibake(value)
    .replaceAll("\uFFFD", "")
    .replaceAll("ï¿½", "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function normalizeLookupKey(value: string): string {
  return cleanDisplayText(value)
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function humanCountryName(country: string): string {
  const labels: Record<string, string> = {
    turkiye: "TÜRKİYE",
    azerbaycan: "AZERBAYCAN",
    bulgaristan: "BULGARİSTAN",
    cezayir: "CEZAYİR",
    katar: "KATAR",
    "suudi-arabistan": "SUUDİ ARABİSTAN",
    "birlesik-arap-emirlikleri": "BİRLEŞİK ARAP EMİRLİKLERİ",
    umman: "UMMAN",
    kuveyt: "KUVEYT",
    rusya: "RUSYA",
    kazakistan: "KAZAKİSTAN",
    irak: "IRAK",
    gana: "GANA",
    gambia: "GAMBİA",
    kongo: "KONGO",
    niger: "NİJER",
    libya: "LİBYA",
    cirad: "ÇAD",
    cebelitarik: "CEBELİTARIK",
    gurcistan: "GÜRCİSTAN",
    letonya: "LETONYA",
    litvanya: "LİTVANYA",
    malta: "MALTA",
    ozbekistan: "ÖZBEKİSTAN",
    pakistan: "PAKİSTAN",
    turkmenistan: "TÜRKMENİSTAN",
    isvec: "İSVEÇ",
    ukrayna: "UKRAYNA",
    fas: "FAS",
    almanya: "ALMANYA",
  };

  const key = normalizeLookupKey(country);
  return labels[key] ?? cleanDisplayText(country.toUpperCase());
}

function humanClassName(classKey: string, className: string, localeLabels?: Record<string, string>): string {
  const fallback: Record<string, string> = {
    "endustriyel-tesis": "ENDÜSTRİYEL TESİS",
    konut: "KONUT",
    hastane: "HASTANE",
    otopark: "OTOPARK",
    "enerji-santrali": "ENERJİ SANTRALİ",
    havaalani: "HAVAALANI",
    avm: "AVM",
    otel: "OTEL",
    "avm-ve-konut": "AVM VE KONUT",
    fabrika: "FABRİKA",
    "kamu-binasi": "KAMU BİNASI",
    stadyum: "STADYUM",
    metro: "Metro-Rayl\u0131 Sistem",
    tunel: "TÜNEL",
    "veri-merkezi": "VERİ MERKEZİ",
    tersane: "TERSANE",
    okul: "OKUL",
    villa: "VİLLA",
    altyapi: "ALTYAPI",
    "demir-yolu-tuneli": "DEMİR YOLU TÜNELİ",
    "karayolu-tuneli": "KARAYOLU TÜNELİ",
    havalimani: "HAVALİMANI",
    ibadethane: "İBADETHANE",
    depo: "DEPO",
    showroom: "SHOWROOM",
    "karma-kullanim": "KARMA KULLANIM",
  };

  const key = normalizeLookupKey(classKey);
  return localeLabels?.[key] ?? fallback[key] ?? cleanDisplayText(className);
}

function uniqueOptions(items: { key: string; label: string }[]): { value: string; label: string }[] {
  const map = new Map<string, string>();
  for (const item of items) {
    if (!map.has(item.key)) map.set(item.key, item.label);
  }
  return Array.from(map.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "tr"));
}

/** Referans verisini seçili dilin sınıf etiketleriyle hazırla (modül değil, istek başına). */
function buildReferenceData(locale: Locale, classLabels?: Record<string, string>) {
  const localizedReferences = applyReferencesLocale(references, locale);
  const sanitizedReferences = localizedReferences.map((item) => ({
    ...item,
    title: cleanDisplayText(item.title),
    description: cleanDisplayText(item.description),
    countryName: humanCountryName(item.country),
    className: humanClassName(item.classKey, item.className, classLabels),
    productNames: item.productNames.map((p) => cleanDisplayText(p)),
  }));
  const countryOptions = uniqueOptions(
    sanitizedReferences.map((r) => ({ key: r.country, label: r.countryName })),
  );
  const productFamilyOptions = buildReferenceProductFamilyOptions(sanitizedReferences);
  const countryCount = new Set(sanitizedReferences.map((r) => r.country)).size;
  return { sanitizedReferences, countryOptions, productFamilyOptions, countryCount };
}

export default async function Referanslar({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.referanslar;

  const classLabels = (t as { classLabels?: Record<string, string> }).classLabels;
  const { sanitizedReferences, countryOptions, productFamilyOptions, countryCount } =
    buildReferenceData(locale, classLabels);

  const stats = [
    {
      value: (t as { statsProjectsValue?: string }).statsProjectsValue ?? `${sanitizedReferences.length}+`,
      label: t.completedProjects,
      accent: true,
    },
    {
      value: (t as { statsCountriesValue?: string }).statsCountriesValue ?? `${countryCount}`,
      label: t.country,
      accent: false,
    },
    {
      value: (t as { statsPeriodValue?: string }).statsPeriodValue ?? "2021–2025",
      label: t.projectPeriod,
      accent: false,
    },
  ];

  const header = (
    <>
      <section className="referanslar-hero-gradient relative overflow-hidden px-4 pb-28 pt-24 sm:px-8 sm:pb-32 sm:pt-28 lg:px-12">
        <div className="relative z-10 mx-auto max-w-6xl">
          <nav className="mb-8 flex flex-wrap items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50 sm:text-xs">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/80">
              {t.breadcrumbHome}
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/80">
              {t.breadcrumbCorporate}
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-hz-secondary-fixed">{t.breadcrumbPage}</span>
          </nav>
          <span className="mb-6 inline-block rounded-full border border-hz-secondary/30 bg-hz-secondary/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ffdbd0] sm:text-xs">
            {t.badge}
          </span>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-7xl">
            {t.heroTitle1}{" "}
            <span className="text-hz-secondary-container">{t.heroTitleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl">
            {t.heroDescStitch ?? t.heroDesc}
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 opacity-20 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fe6a34_0%,_transparent_70%)] opacity-20" />
          <div className="absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 scale-150 rounded-full border-4 border-hz-secondary-container/20" />
        </div>
      </section>

      <section className="relative z-20 -mt-16 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-[#c6c6cd]/20 rounded-2xl bg-white p-6 shadow-[0_32px_48px_-12px_rgba(25,28,30,0.12)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-8">
          {stats.map((s) => (
            <div key={s.label} className="py-4 text-center sm:py-0">
              <p
                className={`text-3xl font-black sm:text-4xl ${s.accent ? "text-hz-secondary" : "text-hz-primary-container"}`}
              >
                {s.value}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-hz-on-surface-variant sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  return (
    <main className="overflow-x-clip bg-sand-200">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <ReferanslarClient
        locale={locale}
        references={sanitizedReferences}
        countryOptions={countryOptions}
        productFamilyOptions={productFamilyOptions}
        dict={t}
        header={header}
      />
    </main>
  );
}
