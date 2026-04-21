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
    .replaceAll("saï¿½YlanmÄ±ï¿½YtÄ±r", "sağlanmıştır")
    .replaceAll("\uFFFD", "");

  for (const [from, to] of WORD_FIXES) {
    normalized = normalized.replaceAll(from, to);
  }

  return normalized;
}

function humanCountryName(country: string): string {
  const labels: Record<string, string> = {
    turkiye: "TÜRKİYE",
    katar: "KATAR",
    "suudi-arabistan": "SUUDİ ARABİSTAN",
    "birlesik-arap-emirlikleri": "BİRLEŞİK ARAP EMİRLİKLERİ",
    umman: "UMMAN",
    rusya: "RUSYA",
    kazakistan: "KAZAKİSTAN",
    irak: "IRAK",
    gambia: "GAMBİA",
    kongo: "KONGO",
    niger: "NİJER",
    libya: "LİBYA",
    cirad: "ÇAD",
    cebelitarik: "CEBELİTARIK",
    gurcistan: "GÜRCİSTAN",
    isvec: "İSVEÇ",
    ukrayna: "UKRAYNA",
    fas: "FAS",
    almanya: "ALMANYA",
  };

  return labels[country] ?? decodeMojibake(country.toUpperCase());
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
  };

  return labels[classKey] ?? decodeMojibake(className);
}

const sanitizedReferences = references.map((item) => ({
  ...item,
  title: decodeMojibake(item.title),
  description: decodeMojibake(item.description),
  countryName: humanCountryName(item.country),
  className: humanClassName(item.classKey, item.className),
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
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image src="/images/page-hero/referanslar.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-0 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
            <p className="mt-4 text-base leading-relaxed text-white/50">{t.heroDesc}</p>
          </div>
          <div className="mt-10 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-dark/40 backdrop-blur-sm">
            {[
              { value: `${sanitizedReferences.length}+`, label: t.completedProjects },
              { value: `${countryCount}`, label: t.country },
              { value: "2021–2025", label: t.projectPeriod },
            ].map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-xl font-bold text-primary sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReferanslarClient references={sanitizedReferences} countryOptions={countryOptions} classOptions={classOptions} dict={t} />
    </main>
  );
}
