"use client";

/** Kutuya göre dikey yazı (demo ile uyumlu tipografi) — Ürünler / bölüm şeritleri */
export const VERTICAL_STRIP_LABEL_TEXT_CLASS =
  "font-mono-eng text-[19px] font-extrabold uppercase tracking-[0.26em] text-ink antialiased [writing-mode:vertical-rl] [text-orientation:mixed] max-sm:[text-shadow:0_1px_0_rgba(255,255,255,1)] sm:text-[19px] sm:font-semibold sm:tracking-[0.3em] md:text-[20px]";

const HORIZONTAL_STRIP_LABEL_TEXT_CLASS =
  "font-mono-eng text-[12.5px] font-semibold uppercase tracking-[0.24em] text-ink antialiased";

function StripRotatedLabel({
  label,
  mobileHorizontal = false,
}: {
  label: string;
  mobileHorizontal?: boolean;
}) {
  if (mobileHorizontal) {
    return (
      <span className="inline-flex w-full items-center justify-center origin-center rotate-0 lg:rotate-180">
        <span className={`block w-full text-center lg:hidden ${HORIZONTAL_STRIP_LABEL_TEXT_CLASS}`}>{label}</span>
        <span className={`hidden lg:inline ${VERTICAL_STRIP_LABEL_TEXT_CLASS}`}>{label}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex origin-center rotate-180">
      <span className={VERTICAL_STRIP_LABEL_TEXT_CLASS}>{label}</span>
    </span>
  );
}

/** Metin kutunun tam ortasında (mobil sabit yükseklikte dikey ortalama için h-full) */
const INNER =
  "relative z-0 flex h-full min-h-0 flex-1 items-center justify-center py-3 pl-2.5 pr-2 sm:px-4 sm:py-7";

type CarouselVariant = "solution" | "product";

const carouselShell: Record<CarouselVariant, string> = {
  solution:
    "relative flex max-sm:h-[13rem] max-sm:w-[3rem] max-sm:shrink-0 overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_28px_56px_-28px_rgba(15,22,32,0.42)] ring-1 ring-[#1f4fa8]/[0.08] transition-all duration-300 sm:h-auto sm:w-auto",
  product:
    "relative flex max-sm:h-[13rem] max-sm:w-[3rem] max-sm:shrink-0 overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_28px_56px_-28px_rgba(15,22,32,0.42)] ring-1 ring-primary/[0.12] transition-all duration-300 sm:h-auto sm:w-auto",
};

const carouselStripe: Record<CarouselVariant, string> = {
  solution: "absolute inset-y-0 left-0 w-3 bg-[#1f4fa8] sm:w-3.5",
  product: "absolute inset-y-0 left-0 w-3 bg-primary/90 sm:w-3.5",
};

export function CarouselStripLabel({
  variant,
  label,
  dimmed,
}: {
  variant: CarouselVariant;
  label: string;
  dimmed: boolean;
}) {
  return (
    <div className="relative z-10 shrink-0 self-center">
      <div
        className={`${carouselShell[variant]} ${
          dimmed ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
        }`}
      >
        <div className={`${carouselStripe[variant]} pointer-events-none`} aria-hidden />
        <div className={INNER}>
          <StripRotatedLabel label={label} />
        </div>
      </div>
    </div>
  );
}

export type SectionStripTone = "primary" | "slate" | "brandBlue" | "ink";

const sectionShell: Record<SectionStripTone, string> = {
  primary:
    "relative flex max-lg:min-h-[2.6rem] max-lg:w-auto max-lg:max-w-full max-lg:shrink-0 overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_28px_56px_-28px_rgba(15,22,32,0.42)] ring-1 ring-primary/[0.12] transition-all duration-300 lg:h-auto lg:w-auto",
  slate:
    "relative flex max-lg:min-h-[2.6rem] max-lg:w-auto max-lg:max-w-full max-lg:shrink-0 overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_28px_56px_-28px_rgba(15,22,32,0.42)] ring-1 ring-[#6b7380]/[0.10] transition-all duration-300 lg:h-auto lg:w-auto",
  brandBlue:
    "relative flex max-lg:min-h-[2.6rem] max-lg:w-auto max-lg:max-w-full max-lg:shrink-0 overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_28px_56px_-28px_rgba(15,22,32,0.42)] ring-1 ring-[#1f4fa8]/[0.08] transition-all duration-300 lg:h-auto lg:w-auto",
  ink:
    "relative flex max-lg:min-h-[2.6rem] max-lg:w-auto max-lg:max-w-full max-lg:shrink-0 overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_28px_56px_-28px_rgba(15,22,32,0.42)] ring-1 ring-[#243044]/[0.10] transition-all duration-300 lg:h-auto lg:w-auto",
};

const sectionStripe: Record<SectionStripTone, string> = {
  primary:
    "absolute inset-x-0 top-0 h-1 bg-primary/90 lg:inset-y-0 lg:left-0 lg:h-auto lg:w-3.5",
  slate:
    "absolute inset-x-0 top-0 h-1 bg-[#6b7380] lg:inset-y-0 lg:left-0 lg:h-auto lg:w-3.5",
  brandBlue:
    "absolute inset-x-0 top-0 h-1 bg-[#1f4fa8] lg:inset-y-0 lg:left-0 lg:h-auto lg:w-3.5",
  ink:
    "absolute inset-x-0 top-0 h-1 bg-[#243044] lg:inset-y-0 lg:left-0 lg:h-auto lg:w-3.5",
};

/** Katalog / referans vb. yan şerit — carousel ile aynı demo yapısı */
export function SectionStripLabel({
  tone,
  label,
  dimmed,
}: {
  tone: SectionStripTone;
  label: string;
  dimmed: boolean;
}) {
  return (
    <div className="relative z-10 shrink-0 self-center">
      <div
        className={`${sectionShell[tone]} ${
          dimmed ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
        }`}
      >
        <div className={`${sectionStripe[tone]} pointer-events-none`} aria-hidden />
        <div className="relative z-0 flex h-full min-h-0 flex-1 items-center justify-center px-4 py-3 text-center lg:px-4 lg:py-7">
          <StripRotatedLabel label={label} mobileHorizontal />
        </div>
      </div>
    </div>
  );
}
