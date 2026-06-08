import Image from "next/image";
import Link from "next/link";
import { FooterNewsletter } from "@/components/footer-newsletter";
import { getFooterStrings } from "@/components/footer-i18n";
import { locales, localeUi } from "@/i18n/config";
import {
  NOVVES_FACTORY_DISPLAY_LINES,
  NOVVES_HEAD_OFFICE_DISPLAY_LINES,
  NOVVES_PRIMARY_LINKEDIN,
} from "@/lib/company/addresses";

// Kept for backwards compatibility with the existing layout.tsx caller —
// the new footer no longer reads from `dict` (uses centralized footer-i18n).
type CommonFooterDict = { footer: Record<string, unknown> };

/* ── Section link hrefs (locale-agnostic; labels come from i18n) ──────── */

const sectionHrefs = {
  products: [
    "/urunler/duman-isi-tahliye-fanlari",
    "/urunler/hava-hareketi",
    "/urunler/kovan-tipi-aksiyal-fanlar",
    "/urunler/cati-fanlari",
    "/urunler/duvar-tipi-fanlar",
    "/urunler/exproof-fanlar",
    "/urunler/damperler",
    "/urunler/otomasyon-malzemeleri",
    "/urunler/aksesuarlar",
  ],
  solutions: [
    "/cozumler/duman-isi-tahliye-sistemleri",
    "/cozumler/duman-isi-tahliye-sistemleri",
    "/cozumler/endustriyel-hava-yonetimi",
    "/cozumler/endustriyel-hava-yonetimi",
    "/cozumler/konfor-iklimlendirme-sistemleri",
    "/cozumler/hijyenik-filtrasyonlu-havalandirma",
    "/cozumler/atex-patlama-koruma-cozumleri",
  ],
  engineering: [
    "/hizmetler/cfd-analizi",
    "/hizmetler/duman-kontrol-sistemi-tasarimi",
    "/cozumler/cfd-muhendislik-danismanligi",
    "/hizmetler/yerinde-kesif",
    "/hizmetler/devreye-alma",
    "/hizmetler/teknik-servis",
    "/hizmetler/cfd-analizi",
  ],
  resources: [
    "/teknik-merkez/dokuman-kutuphanesi",
    "/teknik-merkez/dokuman-kutuphanesi",
    "/kurumsal/sertifikalar",
    "/kurumsal/referanslar",
    "/kurumsal/haberler",
    "/teknik-merkez/dokuman-kutuphanesi",
  ],
  corporate: [
    "/kurumsal/biz-kimiz",
    "/kurumsal/biz-kimiz",
    "/kurumsal/ekibimiz",
    "/kurumsal/politikamiz",
    "/surdurulebilirlik",
    "/kariyer",
    "/legal",
    "/iletisim",
  ],
} as const;

/* ── Social links ─────────────────────────────────────────────────────── */

const socialLinks = [
  {
    label: "LinkedIn",
    href: NOVVES_PRIMARY_LINKEDIN,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCan0PUXw7Pr0GI0HTegN1yQ",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/novves.turkiye/",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

/* ── Engineering pillars (top CTA strip) — icons only; labels via i18n ─ */

const pillarIcons = [
  (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" key="i1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      <circle cx="7" cy="6.75" r="1.1" fill="currentColor" />
      <circle cx="14" cy="12" r="1.1" fill="currentColor" />
      <circle cx="10" cy="17.25" r="1.1" fill="currentColor" />
    </svg>
  ),
  (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" key="i2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.2 3 2.2 6 0 9M12 21c-2.2-3-2.2-6 0-9M3 12c3-2.2 6-2.2 9 0M21 12c-3 2.2-6 2.2-9 0" />
    </svg>
  ),
  (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" key="i3">
      <rect x="3.5" y="4.5" width="17" height="13" rx="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5h17M8 20h8M12 17.5V20" />
      <circle cx="7.5" cy="6.5" r=".7" fill="currentColor" />
      <circle cx="10" cy="6.5" r=".7" fill="currentColor" />
    </svg>
  ),
  (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" key="i4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17 6.16 9.91a2.5 2.5 0 0 1-.732-1.766V6.75L2.25 3.5l1.25-1.25L6.75 5.43h1.394a2.5 2.5 0 0 1 1.767.732l5.26 5.26" />
    </svg>
  ),
];

/* ── Certificates: codes are universal, descriptions via i18n ─────────── */

const CERT_CODES = ["EN 12101-3", "ISO 9001", "ISO 27001", "ISO 14001", "ISO 45001"] as const;

const CertIcon = (
  <svg viewBox="0 0 32 32" className="h-12 w-12 shrink-0 text-primary" fill="none">
    <circle cx="16" cy="14" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
    <path d="M10.5 20.5l-2 9 7.5-4.2 7.5 4.2-2-9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12.8 14l2.6 2.6L20 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Application area icons (labels via i18n) ─────────────────────────── */

const applicationAreaIcons = [
  (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.5" key="aa1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20l2.5-7a3 3 0 0 1 2.85-2h11.3a3 3 0 0 1 2.85 2L27 20" />
      <rect x="4" y="20" width="24" height="6" rx="1.5" />
      <circle cx="9" cy="26.5" r="1.6" fill="currentColor" />
      <circle cx="23" cy="26.5" r="1.6" fill="currentColor" />
      <path strokeLinecap="round" d="M16 4v8m-3-3 3 3 3-3" />
    </svg>
  ),
  (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.5" key="aa2">
      <path strokeLinejoin="round" d="M5 27V16a11 11 0 0 1 22 0v11" />
      <path strokeLinejoin="round" d="M10 27V17a6 6 0 0 1 12 0v10" />
      <path strokeLinecap="round" d="M5 27h22" />
    </svg>
  ),
  (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.5" key="aa3">
      <path strokeLinejoin="round" d="M5 27V13l7 4v-4l7 4v-4l8 5v9z" />
      <path strokeLinecap="round" d="M5 27h22" />
      <rect x="9" y="20" width="2.5" height="3" fill="currentColor" />
      <rect x="15" y="20" width="2.5" height="3" fill="currentColor" />
      <rect x="21" y="20" width="2.5" height="3" fill="currentColor" />
    </svg>
  ),
  (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.5" key="aa4">
      <rect x="6" y="7" width="20" height="20" rx="1.5" />
      <path strokeLinecap="round" d="M16 12v8M12 16h8" />
      <path strokeLinecap="round" d="M6 27h20" />
    </svg>
  ),
  (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.5" key="aa5">
      <rect x="7" y="6" width="18" height="21" rx="1" />
      <path strokeLinecap="round" d="M11 11h2M15 11h2M19 11h2M11 15h2M15 15h2M19 15h2M11 19h2M19 19h2" />
      <rect x="14" y="22" width="4" height="5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.5" key="aa6">
      <path strokeLinejoin="round" d="M5 27V15l6 4V15l6 4v-4l8 5v7z" />
      <path strokeLinecap="round" d="M5 27h22" />
      <path strokeLinecap="round" d="M9 8l-1 5M13 8l-1 5" />
    </svg>
  ),
];

/* ── Dotted world map (stylized continents) ───────────────────────────── */

// Continent membership: returns true if (x,y) — on a 200×100 viewBox — lies on land.
// Hand-tuned approximation: not geographically precise but recognizable as a world map.
function inLand(x: number, y: number): boolean {
  // North America
  if (x >= 10 && x <= 58 && y >= 16 && y <= 50) {
    if (x < 18 && y > 40) return false; // Pacific NW carve
    if (x > 50 && y > 44) return false; // Gulf/SE
    if (x < 16 && y < 24) return false; // Alaska gap
    if (x > 48 && y < 22) return false; // NE Canada carve
    return true;
  }
  // Central America strip
  if (x >= 30 && x <= 42 && y >= 48 && y <= 56) return true;
  // South America
  if (x >= 36 && x <= 56 && y >= 54 && y <= 92) {
    if (x > 50 && y > 80) return false;
    if (x < 40 && y > 78) return false;
    if (x > 52 && y < 60) return false;
    return true;
  }
  // Greenland
  if (x >= 62 && x <= 76 && y >= 8 && y <= 22) return true;
  // Europe
  if (x >= 92 && x <= 116 && y >= 18 && y <= 38) {
    if (x < 96 && y > 32) return false;
    return true;
  }
  // Africa
  if (x >= 96 && x <= 122 && y >= 38 && y <= 80) {
    if (x > 116 && y > 70) return false;
    if (x < 100 && y > 70) return false;
    return true;
  }
  // Middle East + West Asia bridge
  if (x >= 110 && x <= 130 && y >= 32 && y <= 46) return true;
  // Russia/Siberia (wide upper band)
  if (x >= 100 && x <= 178 && y >= 14 && y <= 26) return true;
  // Central/East Asia
  if (x >= 130 && x <= 175 && y >= 26 && y <= 44) {
    if (x > 170 && y > 38) return false;
    return true;
  }
  // SE Asia / India peninsula
  if (x >= 130 && x <= 158 && y >= 40 && y <= 56) {
    if (x < 134 && y > 50) return false;
    if (x > 154 && y > 52) return false;
    return true;
  }
  // Indonesia/PH islands (scattered)
  if (x >= 152 && x <= 174 && y >= 54 && y <= 64) {
    return (x + y) % 4 < 2; // sparse island pattern
  }
  // Australia
  if (x >= 158 && x <= 184 && y >= 66 && y <= 80) {
    if (x < 162 && y > 76) return false;
    if (x > 180 && y > 76) return false;
    if (y < 68 && (x < 166 || x > 178)) return false;
    return true;
  }
  // Japan
  if (x >= 172 && x <= 180 && y >= 28 && y <= 38) return (x + y) % 3 < 2;
  // UK / Scandinavia
  if (x >= 88 && x <= 96 && y >= 20 && y <= 32) return true;
  return false;
}

const WORLD_DOTS = (() => {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  const step = 2.5;
  for (let y = 6; y <= 94; y += step) {
    for (let x = 4; x <= 196; x += step) {
      if (inLand(x, y)) {
        dots.push({ x, y, r: 0.85, o: 0.7 });
      }
    }
  }
  return dots;
})();

function WorldMapDots({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="currentColor">
        {WORLD_DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} opacity={d.o} />
        ))}
      </g>
      {/* Highlight Türkiye in primary color */}
      <circle cx="116" cy="35" r="1.6" fill="#ef5f17" opacity="0.95" />
      <circle cx="118" cy="34" r="1.1" fill="#ef5f17" opacity="0.8" />
    </svg>
  );
}

/* ── Component ────────────────────────────────────────────────────────── */

// Helper: index-based section list builder.
function buildSections(t: ReturnType<typeof getFooterStrings>) {
  return [
    { title: t.sections.products, labels: t.links.products, hrefs: sectionHrefs.products },
    { title: t.sections.solutions, labels: t.links.solutions, hrefs: sectionHrefs.solutions },
    { title: t.sections.engineering, labels: t.links.engineering, hrefs: sectionHrefs.engineering },
    { title: t.sections.resources, labels: t.links.resources, hrefs: sectionHrefs.resources },
    { title: t.sections.corporate, labels: t.links.corporate, hrefs: sectionHrefs.corporate },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Footer({ locale, dict: _dict }: { locale: string; dict: CommonFooterDict }) {
  const t = getFooterStrings(locale);
  const sections = buildSections(t);

  return (
    <footer className="relative overflow-hidden bg-[#0f1d33] text-white">
      {/* ─ Background layers ─ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0e1c31 0%, #11203a 40%, #0c1729 100%)",
          }}
        />
        <div className="absolute inset-0 blueprint-grid-dark opacity-25" />

        {/* Dünya haritası — masaüstü (lg+): sağa yaslı (hero kartı ile aynı mantık); sol yarı lacivert overlay ile karartılır */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: "url('/images/world-map.png')",
            backgroundSize: "auto 130%",
            backgroundPosition: "calc(100% + 420px) center",
            backgroundRepeat: "no-repeat",
            opacity: 0.7,
            maskImage: "linear-gradient(to right, transparent 0%, transparent 15%, black 95%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 15%, black 95%, black 100%)",
          }}
          aria-hidden
        />
        {/* Dünya haritası — mobil + tablet: tam genişliğe sığar, ortalanmış ve hafif soluk */}
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            backgroundImage: "url('/images/world-map.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.45,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1d33] via-[#0f1d33]/92 to-[#0f1d33]/55"
          aria-hidden
        />
        {/* Yazıların okunurluğu için ek dikey gölge katmanı (alt/üst koyu) */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f1d33]/70 via-transparent to-[#0f1d33]/80"
          aria-hidden
        />
      </div>

      {/* ─ Top CTA Card ────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl border border-white/[0.14] px-6 py-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)] ring-1 ring-primary/15 backdrop-blur-md sm:px-8"
          style={{ backgroundImage: "linear-gradient(135deg, #1c2e4d 0%, #16243f 55%, #182a48 100%)" }}
        >
          <div className="flex flex-col items-stretch gap-7 lg:flex-row lg:items-center lg:gap-10">
            {/* Title block with icon */}
            <div className="flex items-start gap-4 lg:w-[320px] lg:shrink-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 8.25v2.25A6.75 6.75 0 0 1 12 17.25v0a6.75 6.75 0 0 1-6.75-6.75V8.25M12 17.25v3M8.25 20.25h7.5M12 3a3 3 0 0 0-3 3v4.5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
                </svg>
              </span>
              <div>
                <h3 className="text-meta font-semibold leading-snug text-white">
                  {t.cta.title}
                </h3>
                <p className="mt-1.5 text-fine leading-relaxed text-white/95">
                  {t.cta.desc}
                </p>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
              {t.pillars.map((p, i) => (
                <div key={`${p.line1}-${i}`} className="flex flex-col items-center gap-2 text-center text-white/92">
                  <span className="text-primary">{pillarIcons[i]}</span>
                  <span className="text-fine leading-tight">
                    {p.line1}
                    <br />
                    {p.line2}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div className="flex flex-col items-center gap-1.5 lg:items-end lg:shrink-0">
              <Link
                href={`/${locale}/iletisim`}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30"
              >
                {t.cta.button}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="text-fine text-white/92">{t.cta.note}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─ Main Grid: brand + 5 link columns ───────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pt-14 pb-0 sm:px-6 lg:px-8">
        <div className="grid gap-y-12 gap-x-8 lg:grid-cols-12 lg:grid-rows-[1fr_auto]">
          {/* Brand column — video için daha geniş (6/12), içerik full yüksekliği kullanır */}
          <div className="flex flex-col lg:col-span-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
            <div className="flex flex-col">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/novves-footer-logo.svg"
                alt="Novves"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-2xl text-fine leading-relaxed text-white/95">
              {t.brand.desc}
            </p>

            {/* Tanıtım videosu — yatay 16:9, firma tanıtım section'ı gibi */}
            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b1018] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              <iframe
                src="https://www.youtube-nocookie.com/embed/6pXFGhKW6Lw?rel=0&modestbranding=1"
                title={t.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            </div>

            {/* Sosyal + İletişim — subgrid sayesinde sağdaki cert ile aynı satırda (TOP'lar hizalı) */}
            <div className="border-y border-white/[0.07] py-7">
              {/* Sosyal ikonlar */}
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/92 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1d33]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* İletişim 2x2 */}
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3">
              {/* Telefon */}
              <a href="tel:+902164674752" className="group flex items-start gap-2.5 text-white/95 transition-colors hover:text-white">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] text-primary transition-all group-hover:bg-primary/20 group-hover:ring-primary/30">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="text-fine font-semibold text-primary">{t.contactLabels.phone}</p>
                  <p className="mt-0.5 text-fine text-white/95">+90 216 467 47 52</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@novves.com" className="group flex items-start gap-2.5 text-white/95 transition-colors hover:text-white">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] text-primary transition-all group-hover:bg-primary/20 group-hover:ring-primary/30">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="text-fine font-semibold text-primary">{t.contactLabels.email}</p>
                  <p className="mt-0.5 text-fine text-white/95">info@novves.com</p>
                </div>
              </a>

              {/* Ofis */}
              <div className="flex items-start gap-2.5 text-white/95">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] text-primary">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="text-fine font-semibold text-primary">{t.contact.headOffice}</p>
                  <p className="mt-0.5 text-fine leading-snug text-white/95">
                    {NOVVES_HEAD_OFFICE_DISPLAY_LINES.map((line, index) => (
                      <span key={line}>
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              {/* Tesis */}
              <div className="flex items-start gap-2.5 text-white/95">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] text-primary">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21V8.25l8.25-4.5 8.25 4.5V21M3.75 21h16.5M9 21v-6h6v6" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="text-fine font-semibold text-primary">{t.contact.factory}</p>
                  <p className="mt-0.5 text-fine leading-snug text-white/95">
                    {NOVVES_FACTORY_DISPLAY_LINES.map((line, index) => (
                      <span key={line}>
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Link columns + certificates (two-row layout) — aligned under column headers */}
          <div className="flex flex-col lg:col-span-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
            <div className="flex flex-col">
            {/* Brand slogan — kolonların üstünde marka tagline'ı (hero ile birebir aynı) */}
            <div className="mb-10 border-b border-white/[0.07] pb-8">
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {t.brandSlogan}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6 lg:w-full">
              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/95">
                    <span className="h-px w-3 bg-primary" />
                    {section.title}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {section.labels.map((label, i) => (
                      <li key={`${section.title}-${i}`}>
                        <Link
                          href={`/${locale}${section.hrefs[i]}`}
                          className="group flex items-center text-fine text-white/92 transition-all duration-300 hover:text-white/95"
                        >
                          <span className="inline-block w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-3.5">
                            &rsaquo;&nbsp;
                          </span>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            </div>

            {/* Certificates & Standards — subgrid ile sol bloğun TOP çizgisiyle hizalı */}
            <div className="border-y border-white/[0.07] py-7 lg:w-full">
              <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {t.certificates.title}
              </h4>

              <div className="mt-6 flex flex-col items-stretch gap-7 lg:flex-row lg:items-center lg:gap-7">
                {/* Certificates row */}
                <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
                  {CERT_CODES.map((code, i) => (
                    <li key={code} className="flex flex-col items-start gap-2.5">
                      <svg viewBox="0 0 32 32" className="h-12 w-12 shrink-0 text-primary" fill="none">
                        <circle cx="16" cy="14" r="8.5" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="16" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
                        <path d="M10.5 20.5l-2 9 7.5-4.2 7.5 4.2-2-9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M12.8 14l2.6 2.6L20 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="min-w-0 leading-tight">
                        <p className="text-[13px] font-bold tracking-[0.02em] text-white">
                          {code}
                        </p>
                        <p className="mt-1.5 text-[11px] leading-snug text-white/95">
                          {t.certificates.items[i]}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Right: Download catalogue */}
                <Link
                  href={`/${locale}/teknik-merkez/dokuman-kutuphanesi`}
                  className="group flex items-center gap-3 lg:shrink-0 lg:border-l lg:border-white/10 lg:pl-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary transition-all duration-300 group-hover:bg-primary/25">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </span>
                  <div className="leading-tight">
                    <p className="text-meta font-bold tracking-wide text-primary group-hover:text-primary-deep">
                      {t.certificates.downloadCatalog}
                    </p>
                    <p className="mt-0.5 text-fine text-white/95">{t.certificates.downloadCatalogDesc}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─ Newsletter + Language + Application Areas + World map ───────── */}
      <div className="relative z-10">
        <div className="mx-auto max-w-[1600px] px-4 pt-6 pb-7 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Newsletter */}
            <div className="flex items-start gap-4 lg:col-span-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="text-meta font-semibold text-white">{t.newsletter.title}</p>
                <p className="mt-0.5 text-fine text-white/95">{t.newsletter.desc}</p>
                <FooterNewsletter
                  placeholder={t.newsletter.placeholder}
                  submitLabel={t.newsletter.title}
                  successMessage={t.newsletter.success}
                />
              </div>
            </div>

            {/* Application areas */}
            <div className="lg:col-span-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/95">{t.applicationAreas.title}</p>
              <ul className="mt-3 grid grid-cols-6 gap-x-1 gap-y-2">
                {t.applicationAreas.items.map((a, i) => (
                  <li key={`${a.line1}-${i}`} className="flex flex-col items-center gap-1 text-center">
                    <span className="text-white/95">{applicationAreaIcons[i]}</span>
                    <span className="text-[10px] leading-tight text-white/90">
                      {a.line1}
                      {a.line2 ? (
                        <>
                          <br />
                          {a.line2}
                        </>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Global caption + dotted world map */}
            <div className="flex items-center gap-3 lg:col-span-2 lg:justify-end">
              <WorldMapDots className="h-16 w-32 text-white/92" />
              <p className="max-w-[120px] text-fine font-medium leading-snug text-white/90">
                {t.globalCaption.line1}
                <br />
                {t.globalCaption.line2}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─ Dil seçimi bandı ────────────── */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1600px] justify-start px-4 py-5 sm:px-6 lg:px-8">
          {/* Sol: Dil seçimi — tek satır, sola çekilmiş */}
          <div className="w-full lg:mr-auto lg:w-auto">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white/95 sm:text-left">
              {t.langTitle}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:justify-start lg:flex-nowrap">
              {locales.map((code) => {
                const isActive = locale === code;
                return (
                  <Link
                    key={code}
                    href={`/${code}`}
                    title={localeUi[code].label}
                    aria-label={localeUi[code].label}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "border border-white/15 bg-white/[0.04] text-white/92 hover:border-primary/40 hover:text-white"
                    }`}
                  >
                    {localeUi[code].short}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─ Bottom bar ──────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-fine tracking-wide text-white/92">{t.bottom.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={`/${locale}/legal`}
              className="text-fine tracking-wide text-white/92 transition-colors duration-300 hover:text-white"
            >
              {t.bottom.legalCenter}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="text-fine tracking-wide text-white/92 transition-colors duration-300 hover:text-white"
            >
              {t.bottom.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/cookies`}
              className="text-fine tracking-wide text-white/92 transition-colors duration-300 hover:text-white"
            >
              {t.bottom.cookieSettings}
            </Link>
            <a
              href="/kvkk/FR-0057-Kisisel-Veri-Sahibi-Basvuru-Formu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fine tracking-wide text-white/92 transition-colors duration-300 hover:text-white"
            >
              {t.bottom.applicationForm}
            </a>
            <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
            <span className="flex items-center gap-2">
              <span className="text-fine text-white/95">{t.bottom.poweredBy}</span>
              <a
                href="https://tasarloji.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block opacity-95 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src="/images/tasarloji-logo.png"
                  alt="Tasarloji"
                  width={70}
                  height={18}
                  className="h-3.5 w-auto"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
