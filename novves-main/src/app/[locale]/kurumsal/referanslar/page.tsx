import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { references } from "@/data/references";
import { ReferanslarClient } from "./client";

const UTF8_DECODER = new TextDecoder("utf-8");
const GARBLED_RE = /[ÃÄÅÂï¿½�]/g;
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

  // Some entries were re-encoded multiple times, so decode step-by-step.
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
    .replaceAll("Äž", "Ğ")
    .replaceAll("Â", "")
    .replaceAll("â€™", "'")
    .replaceAll("â€œ", '"')
    .replaceAll("â€", '"')
    .replaceAll("â€“", "–")
    .replaceAll("ï¿½o", "Ü")
    .replaceAll("ï¿½?~", '"')
    .replaceAll("ï¿½?T", '"')
    .replaceAll("ï¿½?atÄ±", "Çatı")
    .replaceAll("ï¿½?", "Ç")
    .replaceAll("?", "")
    .replaceAll("saï¿½YlanmÄ±ï¿½YtÄ±r", "sağlanmıştır")
    .replaceAll("\uFFFD", "");

  for (const [from, to] of WORD_FIXES) {
    normalized = normalized.replaceAll(from, to);
  }

  return normalized;
}

function cleanDisplayText(value: string): string {
  return decodeMojibake(value)
    .replaceAll("�", "")
    .replaceAll("ï¿½", "")
    .replaceAll("?", "")
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

function humanClassName(classKey: string, className: string): string {
  const labels: Record<string, string> = {
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
    metro: "METRO",
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
  };

  const key = normalizeLookupKey(classKey);
  return labels[key] ?? cleanDisplayText(className);
}

const sanitizedReferences = references.map((item) => ({
  ...item,
  title: cleanDisplayText(item.title),
  description: cleanDisplayText(item.description),
  countryName: humanCountryName(item.country),
  className: humanClassName(item.classKey, item.className),
  productNames: item.productNames.map((p) => cleanDisplayText(p)),
}));

function uniqueOptions(items: { key: string; label: string }[]): { value: string; label: string }[] {
  const map = new Map<string, string>();
  for (const item of items) { if (!map.has(item.key)) map.set(item.key, item.label); }
  return Array.from(map.entries()).map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label, "tr"));
}

const countryOptions = uniqueOptions(sanitizedReferences.map((r) => ({ key: r.country, label: r.countryName })));
const classOptions = uniqueOptions(sanitizedReferences.map((r) => ({ key: r.classKey, label: r.className })));
const countryCount = new Set(sanitizedReferences.map((r) => r.country)).size;

export default async function Referanslar({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.referanslar;

  return (
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/referanslar.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.62] text-white/72">{t.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-5 sm:py-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-[#f8f5ed] px-4 shadow-[0_12px_26px_-20px_rgba(15,20,30,0.26)] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: `${sanitizedReferences.length}+`, label: t.completedProjects },
              { value: `${countryCount}`, label: t.country },
              { value: "2021–2025", label: t.projectPeriod },
            ].map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-xl font-bold text-primary sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-secondary/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReferanslarClient references={sanitizedReferences} countryOptions={countryOptions} classOptions={classOptions} dict={t} />
    </main>
  );
}
