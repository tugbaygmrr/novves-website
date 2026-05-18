import Image from "next/image";
import Link from "next/link";
import { FooterCookieSettings } from "@/components/footer-cookie-settings";
import { FooterNewsletter } from "@/components/footer-newsletter";
import { getFooterStrings } from "@/components/footer-i18n";

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
    "/teknik-merkez",
    "/teknik-merkez",
    "/kurumsal/sertifikalar",
    "/kurumsal/referanslar",
    "/kurumsal/haberler",
    "/teknik-merkez",
  ],
  corporate: [
    "/kurumsal/biz-kimiz",
    "/kurumsal/biz-kimiz",
    "/kurumsal/ekibimiz",
    "/kurumsal/politikamiz",
    "/surdurulebilirlik",
    "/kvkk/kisisel-verilerin-korunmasi",
    "/iletisim",
  ],
} as const;

/* ── Social links ─────────────────────────────────────────────────────── */

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://tr.linkedin.com/company/novvesturkiye",
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

const CERT_CODES = ["EN 12101-3", "AMCA 210", "ISO 9001", "ISO 45001", "CE"] as const;

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

        {/* Blueprint fan drawing — right edge, partially off-canvas */}
        <svg
          viewBox="0 0 400 400"
          className="absolute -right-24 top-12 hidden h-[520px] w-[520px] text-primary/40 lg:block xl:-right-16 xl:h-[600px] xl:w-[600px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="fanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="55%" stopColor="currentColor" stopOpacity="0.05" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft halo */}
          <circle cx="200" cy="200" r="190" fill="url(#fanGlow)" />

          {/* Outer concentric rings */}
          <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55">
            <circle cx="200" cy="200" r="188" />
            <circle cx="200" cy="200" r="178" strokeDasharray="2 4" />
            <circle cx="200" cy="200" r="160" />
            <circle cx="200" cy="200" r="140" strokeDasharray="3 3" opacity="0.4" />
          </g>

          {/* Bolt circle markers (outer flange) */}
          <g fill="currentColor" opacity="0.7">
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 24;
              const r = 183;
              const cx = (200 + Math.cos(a) * r).toFixed(2);
              const cy = (200 + Math.sin(a) * r).toFixed(2);
              return <circle key={i} cx={cx} cy={cy} r="1.6" />;
            })}
          </g>

          {/* Inner hub */}
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85">
            <circle cx="200" cy="200" r="42" />
            <circle cx="200" cy="200" r="30" />
            <circle cx="200" cy="200" r="14" />
          </g>
          <circle cx="200" cy="200" r="4" fill="currentColor" opacity="0.9" />

          {/* Fan blades (9) */}
          <g fill="currentColor" opacity="0.32" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.7">
            {Array.from({ length: 9 }).map((_, i) => {
              const rot = (i * 360) / 9;
              return (
                <path
                  key={i}
                  d="M200 158
                     C 230 150, 252 142, 268 92
                     C 244 110, 220 122, 200 140
                     Z"
                  transform={`rotate(${rot} 200 200)`}
                />
              );
            })}
          </g>

          {/* Blade outline strokes (additional 9, offset for depth) */}
          <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.55">
            {Array.from({ length: 9 }).map((_, i) => {
              const rot = (i * 360) / 9 + 20;
              return (
                <path
                  key={i}
                  d="M200 200 C 220 178, 248 158, 270 120"
                  transform={`rotate(${rot} 200 200)`}
                />
              );
            })}
          </g>

          {/* Crosshairs / construction lines */}
          <g stroke="currentColor" strokeWidth="0.4" opacity="0.35" strokeDasharray="1 4">
            <line x1="200" y1="6" x2="200" y2="394" />
            <line x1="6" y1="200" x2="394" y2="200" />
            <line x1="60" y1="60" x2="340" y2="340" />
            <line x1="340" y1="60" x2="60" y2="340" />
          </g>

          {/* Corner tick marks */}
          <g stroke="currentColor" strokeWidth="0.8" opacity="0.65">
            <path d="M196 8 v8 M200 8 v6 M204 8 v8" />
            <path d="M196 392 v-8 M200 392 v-6 M204 392 v-8" />
            <path d="M8 196 h8 M8 200 h6 M8 204 h8" />
            <path d="M392 196 h-8 M392 200 h-6 M392 204 h-8" />
          </g>
        </svg>
      </div>

      {/* ─ Top CTA Card ────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/[0.08] bg-[rgba(17,29,51,0.85)] px-6 py-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:px-8">
          <div className="flex flex-col items-stretch gap-7 lg:flex-row lg:items-center lg:gap-10">
            {/* Title block with icon */}
            <div className="flex items-start gap-4 lg:w-[320px] lg:shrink-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 8.25v2.25A6.75 6.75 0 0 1 12 17.25v0a6.75 6.75 0 0 1-6.75-6.75V8.25M12 17.25v3M8.25 20.25h7.5M12 3a3 3 0 0 0-3 3v4.5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
                </svg>
              </span>
              <div>
                <h3 className="text-[15px] font-semibold leading-snug text-white">
                  {t.cta.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">
                  {t.cta.desc}
                </p>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
              {t.pillars.map((p, i) => (
                <div key={`${p.line1}-${i}`} className="flex flex-col items-center gap-2 text-center text-white/85">
                  <span className="text-primary">{pillarIcons[i]}</span>
                  <span className="text-[11px] leading-tight">
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
              <span className="text-[11px] text-white/45">{t.cta.note}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─ Main Grid: brand + 5 link columns ───────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-y-12 gap-x-8 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-3">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/novves-footer-logo.svg"
                alt="Novves"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-[12.5px] leading-relaxed text-white/55">
              {t.brand.desc}
            </p>

            {/* Contact + addresses */}
            <div className="mt-7 space-y-3">
              <a
                href="tel:+902164674752"
                className="group flex items-center gap-3 text-[13px] text-white/72 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                +90 216 467 47 52
              </a>

              <a
                href="mailto:info@novves.com"
                className="group flex items-center gap-3 text-[13px] text-white/72 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08] transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                info@novves.com
              </a>

              <div className="flex items-start gap-3 text-[12.5px] leading-relaxed text-white/58">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08]">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div className="pt-0.5">
                  <p className="font-semibold text-primary">{t.contact.headOffice}</p>
                  <p className="mt-1 text-white/65">
                    19 Mayıs Mh. Sümer Sk.
                    <br />
                    Zitaş Plaza C2 Blok No:7
                    <br />
                    Kadıköy / İstanbul / Türkiye
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[12.5px] leading-relaxed text-white/58">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-white/[0.08]">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21V8.25l8.25-4.5 8.25 4.5V21M3.75 21h16.5M9 21v-6h6v6" />
                  </svg>
                </span>
                <div className="pt-0.5">
                  <p className="font-semibold text-primary">{t.contact.factory}</p>
                  <p className="mt-1 text-white/65">
                    Yalova Organize Sanayi Bölgesi
                    <br />
                    2. Cadde No:12
                    <br />
                    Çiftlikköy / Yalova / Türkiye
                  </p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/65 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1d33]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns + certificates (two-row layout) — aligned under column headers */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/88">
                    <span className="h-px w-3 bg-primary" />
                    {section.title}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {section.labels.map((label, i) => (
                      <li key={`${section.title}-${i}`}>
                        <Link
                          href={`/${locale}${section.hrefs[i]}`}
                          className="group flex items-center text-[13px] text-white/62 transition-all duration-300 hover:text-white/95"
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

            {/* Certificates & Standards — title row, then cert grid with download link at right */}
            <div className="mt-10 border-y border-white/[0.07] py-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                {t.certificates.title}
              </h4>

              <div className="mt-5 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-6">
                {/* Certificates row */}
                <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
                  {CERT_CODES.map((code, i) => (
                    <li key={code} className="flex items-start gap-2.5">
                      {CertIcon}
                      <div className="min-w-0 pt-0.5 leading-tight">
                        <p className="whitespace-nowrap text-[12.5px] font-bold tracking-[0.02em] text-white">
                          {code}
                        </p>
                        <p className="mt-1 text-[10.5px] leading-snug text-white/55">
                          {t.certificates.items[i]}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Right: Download catalogue */}
                <Link
                  href={`/${locale}/teknik-merkez`}
                  className="group flex items-center gap-2.5 lg:shrink-0 lg:border-l lg:border-white/10 lg:pl-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary transition-all duration-300 group-hover:bg-primary/25">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </span>
                  <div className="leading-tight">
                    <p className="text-[12px] font-bold tracking-wide text-primary group-hover:text-primary-deep">
                      {t.certificates.downloadCatalog}
                    </p>
                    <p className="text-[10px] text-white/55">{t.certificates.downloadCatalogDesc}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─ Newsletter + Language + Application Areas + World map ───────── */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Newsletter */}
            <div className="flex items-start gap-4 lg:col-span-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-white">{t.newsletter.title}</p>
                <p className="mt-0.5 text-[11.5px] text-white/55">{t.newsletter.desc}</p>
                <FooterNewsletter
                  placeholder={t.newsletter.placeholder}
                  submitLabel={t.newsletter.title}
                />
              </div>
            </div>

            {/* Language */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/88">{t.langTitle}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {(["tr", "en", "ru", "ar"] as const).map((code) => {
                  const isActive = locale === code;
                  return (
                    <Link
                      key={code}
                      href={`/${code}`}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold tracking-wide transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/30"
                          : "border border-white/15 bg-white/[0.04] text-white/65 hover:border-primary/40 hover:text-white"
                      }`}
                    >
                      {code.toUpperCase()}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Application areas */}
            <div className="lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/88">{t.applicationAreas.title}</p>
              <ul className="mt-3 grid grid-cols-6 gap-x-1 gap-y-2">
                {t.applicationAreas.items.map((a, i) => (
                  <li key={`${a.line1}-${i}`} className="flex flex-col items-center gap-1 text-center">
                    <span className="text-white/72">{applicationAreaIcons[i]}</span>
                    <span className="text-[9.5px] leading-tight text-white/60">
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
              <WorldMapDots className="h-16 w-32 text-white/65" />
              <p className="max-w-[120px] text-[11.5px] font-medium leading-snug text-white/80">
                {t.globalCaption.line1}
                <br />
                {t.globalCaption.line2}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─ Bottom bar ──────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wide text-white/65">{t.bottom.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={`/${locale}/kvkk/kisisel-verilerin-korunmasi`}
              className="text-[11px] tracking-wide text-white/65 transition-colors duration-300 hover:text-white"
            >
              {t.bottom.kvkk}
            </Link>
            <Link
              href={`/${locale}/kvkk/guvenlik-ve-gizlilik-politikasi`}
              className="text-[11px] tracking-wide text-white/65 transition-colors duration-300 hover:text-white"
            >
              {t.bottom.privacyPolicy}
            </Link>
            <FooterCookieSettings label={t.bottom.cookieSettings} />
            <a
              href="/kvkk/FR-0057-Kisisel-Veri-Sahibi-Basvuru-Formu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-wide text-white/65 transition-colors duration-300 hover:text-white"
            >
              {t.bottom.applicationForm}
            </a>
            <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
            <span className="flex items-center gap-2">
              <span className="text-[11px] text-white/55">{t.bottom.poweredBy}</span>
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
