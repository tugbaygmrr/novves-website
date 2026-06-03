import Image from "next/image";
import type { ReactNode } from "react";

type HeroProps = {
  badge: string;
  titlePart1: string;
  titleHighlight?: string;
  subtitle?: string;
  imageSrc?: string;
  stats?: { value: string; label: string }[];
};

export function HizmetlerPageHero({
  badge,
  titlePart1,
  titleHighlight,
  subtitle,
  imageSrc,
  stats,
}: HeroProps) {
  return (
    <section
      data-search-block
      className="hizmetler-industrial-gradient relative flex min-h-[min(52vh,22rem)] items-end overflow-hidden sm:min-h-[320px] lg:min-h-[400px]"
    >
      {imageSrc ? (
        <div className="absolute inset-0 opacity-20">
          <Image src={imageSrc} alt="" fill priority className="object-cover grayscale" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 50vw" />
        </div>
      ) : null}
      <div className="relative z-10 w-full px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-6 lg:px-12">
        <span className="mb-3 inline-block max-w-full rounded bg-hz-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-hz-on-primary sm:mb-4 sm:px-3 sm:text-xs">
          {badge}
        </span>
        <h1 className="max-w-3xl text-[1.65rem] font-extrabold leading-[1.15] text-hz-on-primary sm:text-3xl md:text-4xl lg:text-5xl">
          {titlePart1}
          {titleHighlight ? (
            <>
              {" "}
              <span className="text-hz-secondary-container">{titleHighlight}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-xl text-base leading-relaxed text-hz-on-primary-container sm:mt-4 sm:text-lg">{subtitle}</p>
        ) : null}
        {stats && stats.length > 0 ? (
          <div className="mt-8 grid max-w-3xl grid-cols-1 divide-y divide-white/15 border border-white/15 bg-black/25 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-4 text-center sm:py-5">
                <p className="text-lg font-bold text-hz-secondary-container sm:text-xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-hz-on-primary/50">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type SectionProps = {
  children: ReactNode;
  label?: string;
  title?: string;
  className?: string;
  variant?: "sand" | "white";
};

export function HizmetlerPageSection({
  children,
  label,
  title,
  className = "",
  variant = "sand",
}: SectionProps) {
  return (
    <section
      data-search-block
      className={`py-8 sm:py-10 lg:py-12 ${variant === "sand" ? "bg-sand-200" : "bg-sand-100"} ${className}`}
    >
      <div className="px-4 sm:px-6 lg:px-12">
        {(label || title) && (
          <div className="mb-6 sm:mb-8">
            {label ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-hz-secondary sm:text-xs sm:tracking-[0.2em]">
                {label}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-1 text-xl font-black tracking-tight text-hz-on-surface sm:text-2xl lg:text-3xl">{title}</h2>
            ) : null}
            <div className="mt-3 h-0.5 w-12 rounded-full bg-hz-secondary" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

type CtaProps = {
  label: string;
  title: string;
  subtitle?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  phone?: string;
};

export function HizmetlerPageCta({
  label,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  phone,
}: CtaProps) {
  return (
    <HizmetlerPageSection className="!bg-hz-primary-container [&_h2]:!text-hz-on-primary">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-hz-secondary-container">{label}</p>
        <h2 className="mt-2 text-xl font-black text-hz-on-primary sm:text-2xl lg:text-3xl">{title}</h2>
        {subtitle ? <p className="mx-auto mt-3 max-w-lg text-sm text-hz-on-primary-container sm:mt-4">{subtitle}</p> : null}
        <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          {phone ? (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm text-hz-on-primary/90 hover:border-white/40 sm:w-auto"
            >
              {phone}
            </a>
          ) : null}
          <a
            href={primaryHref}
            className="inline-flex w-full items-center justify-center rounded-lg bg-hz-secondary-container px-7 py-3 text-sm font-semibold text-hz-on-primary hover:opacity-90 sm:w-auto"
          >
            {primaryLabel}
          </a>
          {secondaryHref && secondaryLabel ? (
            <a
              href={secondaryHref}
              className="inline-flex w-full items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm text-hz-on-primary/80 hover:border-white/50 sm:w-auto"
            >
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </HizmetlerPageSection>
  );
}

/* ── Modern numaralı adım listesi (dikey timeline, kutusuz) ─────────── */
export function HizmetlerSteps({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <ol className="relative">
      {items.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 pb-8 last:pb-0 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hz-secondary/10 text-sm font-black tabular-nums text-hz-secondary ring-1 ring-hz-secondary/25">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < items.length - 1 ? <span className="mt-1 w-px flex-1 bg-sand-300/70" aria-hidden /> : null}
          </div>
          <div className="pt-2 pb-1">
            <h3 className="text-base font-bold text-hz-on-surface">{s.title}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-hz-on-surface-variant">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Modern numaralı özellik grid'i (üst aksan çizgisi, kutusuz) ─────── */
export function HizmetlerFeatureGrid({
  items,
  cols = 3,
}: {
  items: { title: string; desc: string }[];
  cols?: 2 | 3;
}) {
  return (
    <div className={`grid gap-x-8 gap-y-8 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((it, i) => (
        <div key={it.title} className="border-t-2 border-hz-secondary/25 pt-4">
          <span className="text-[1.75rem] font-black leading-none tabular-nums text-hz-secondary/30">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-bold text-hz-on-surface">{it.title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-hz-on-surface-variant">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function HizmetlerPageCard({
  children,
  className = "",
  flat = false,
}: {
  children: ReactNode;
  className?: string;
  /** flat: kutu görünümü yok — sayfaya açık (flush) metin. Renkli/koyu paneller için false bırakın. */
  flat?: boolean;
}) {
  if (flat) {
    // Kutusuz: zemin/kenarlık/gölge/iç boşluk yok — metin sayfaya açık (flush) akar.
    return <div className={className}>{children}</div>;
  }
  // Beyaz kutu yok: yalnızca iç boşluk + köşe yuvarlama. Kendi arka planını veren
  // renkli/koyu paneller (className ile !bg-...) kutu görünümünü korur.
  return (
    <div className={`rounded-2xl p-4 sm:p-6 lg:p-7 ${className}`}>
      {children}
    </div>
  );
}
