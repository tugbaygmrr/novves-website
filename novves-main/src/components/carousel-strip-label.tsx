"use client";

/** Kutuya göre dikey yazı (demo ile uyumlu tipografi) — Ürünler / bölüm şeritleri */
export const VERTICAL_STRIP_LABEL_TEXT_CLASS =
  "font-mono-eng text-metric-sm font-extrabold uppercase tracking-[0.26em] text-white antialiased [writing-mode:vertical-rl] [text-orientation:mixed] sm:text-metric-sm sm:font-semibold sm:tracking-[0.3em] md:text-metric-sm";

const HORIZONTAL_STRIP_LABEL_TEXT_CLASS =
  "font-mono-eng text-fine font-semibold uppercase tracking-[0.16em] text-white antialiased whitespace-nowrap";

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

type CarouselVariant = "solution" | "product";

export function CarouselStripLabel({
  variant,
  label,
  dimmed,
}: {
  variant: CarouselVariant;
  label: string;
  dimmed: boolean;
}) {
  const dotColor = variant === "solution" ? "bg-[#f26a2e]" : "bg-[#2e55e5]";
  return (
    <div className="relative z-10 shrink-0 self-center">
      <div
        className={`relative -rotate-[4deg] overflow-visible rounded-[1.05rem] bg-[#1f1d1e] px-6 py-4 text-white shadow-[0_20px_44px_-24px_rgba(8,10,14,0.55)] transition-all duration-300 ${
          dimmed ? "scale-[0.9] opacity-80" : "scale-100 opacity-100"
        }`}
      >
        <span
          className="pointer-events-none absolute left-1/2 top-full h-4 w-10 -translate-x-1/2 -translate-y-2 rounded-t-full bg-[#ecebe6]"
          aria-hidden
        />
        <span
          className={`pointer-events-none absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#ecebe6] ${dotColor}`}
          aria-hidden
        />
        <div className="text-center leading-none">
          <p className="font-mono-eng text-[11px] font-semibold tracking-[0.04em] text-white/95">#borntoflow</p>
          <p className="mt-1 font-mono-eng text-card font-bold uppercase tracking-[0.02em]">{label}</p>
        </div>
      </div>
    </div>
  );
}

export type SectionStripTone = "primary" | "slate" | "brandBlue" | "ink";

const sectionFill: Record<SectionStripTone, string> = {
  primary: "bg-[#f26a2e]",
  slate: "bg-[#6b7380]",
  brandBlue: "bg-[#1d2f4d]",
  ink: "bg-[#1d1c1e]",
};

const sectionShell =
  "relative flex max-lg:min-h-[2.6rem] max-lg:w-auto max-lg:max-w-full max-lg:shrink-0 overflow-visible rounded-2xl shadow-[0_28px_56px_-28px_rgba(15,22,32,0.42)] transition-all duration-300 lg:h-auto lg:w-auto";

/** Katalog / referans vb. yan şerit — tek renk + ürün kart notch'u tarzında uçlarda topçuk */
export function SectionStripLabel({
  tone,
  label,
  dimmed,
}: {
  tone: SectionStripTone;
  label: string;
  dimmed: boolean;
}) {
  const fill = sectionFill[tone];
  return (
    <div className="relative z-10 shrink-0 self-center">
      <div
        className={`${sectionShell} ${fill} ${
          dimmed ? "scale-[0.86] opacity-80" : "scale-100 opacity-100"
        }`}
      >
        {/* Mobil: yatay → topçuk sol & sağ uçlarda */}
        <span className="pointer-events-none absolute left-0 top-1/2 z-[1] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ecebe6] lg:hidden" aria-hidden />
        <span className={`pointer-events-none absolute left-0 top-1/2 z-[2] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${fill} lg:hidden`} aria-hidden>
          <img src="/images/novves-icon.svg" alt="" aria-hidden="true" className="h-3 w-3 brightness-0 invert" />
        </span>
        <span className="pointer-events-none absolute right-0 top-1/2 z-[1] h-9 w-9 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ecebe6] lg:hidden" aria-hidden />
        <span className={`pointer-events-none absolute right-0 top-1/2 z-[2] flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${fill} lg:hidden`} aria-hidden>
          <img src="/images/novves-icon.svg" alt="" aria-hidden="true" className="h-3 w-3 brightness-0 invert" />
        </span>
        {/* Masaüstü: dikey → topçuk üst & alt uçlarda */}
        <span className="pointer-events-none absolute left-1/2 top-0 z-[1] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ecebe6] lg:block" aria-hidden />
        <span className={`pointer-events-none absolute left-1/2 top-0 z-[2] hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${fill} lg:flex`} aria-hidden>
          <img src="/images/novves-icon.svg" alt="" aria-hidden="true" className="h-3.5 w-3.5 brightness-0 invert" />
        </span>
        <span className="pointer-events-none absolute bottom-0 left-1/2 z-[1] hidden h-10 w-10 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#ecebe6] lg:block" aria-hidden />
        <span className={`pointer-events-none absolute bottom-0 left-1/2 z-[2] hidden h-7 w-7 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full ${fill} lg:flex`} aria-hidden>
          <img src="/images/novves-icon.svg" alt="" aria-hidden="true" className="h-3.5 w-3.5 brightness-0 invert" />
        </span>
        <div className="relative z-0 flex h-full min-h-0 flex-1 items-center justify-center px-10 py-3 text-center lg:px-4 lg:py-9">
          <StripRotatedLabel label={label} mobileHorizontal />
        </div>
      </div>
    </div>
  );
}
