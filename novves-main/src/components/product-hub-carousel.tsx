"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductHubCard } from "@/lib/product-hub-cards";

function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    className,
  };
  switch (name) {
    case "wind":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 8h11a3 3 0 1 0-3-3" />
          <path d="M3 12h16a3 3 0 1 1-3 3" />
          <path d="M3 16h9" />
        </svg>
      );
    case "snowflake":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="M5.5 5.5l13 13" />
          <path d="M18.5 5.5l-13 13" />
          <path d="M9 5l3 -2 3 2" />
          <path d="M9 19l3 2 3-2" />
        </svg>
      );
    case "thermo":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.2 4.2l2.1 2.1" />
          <path d="M17.7 17.7l2.1 2.1" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.2 19.8l2.1-2.1" />
          <path d="M17.7 6.3l2.1-2.1" />
        </svg>
      );
    case "waves":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
          <path d="M3 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
          <path d="M3 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
        </svg>
      );
    case "diffuser":
      return (
        <svg {...common} fill="currentColor" stroke="none" aria-hidden>
          {[5, 12, 19].flatMap((y) =>
            [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />),
          )}
        </svg>
      );
    case "filter":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 5h18l-7 9v6l-4-2v-4z" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common} aria-hidden>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2.6 2.6 6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.6-2.6 2.3-2.3z" />
        </svg>
      );
    case "chip":
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="0.6" />
          <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
        </svg>
      );
    case "equalizer":
      return (
        <svg {...common} aria-hidden>
          <path d="M6 20V8" />
          <path d="M12 20V4" />
          <path d="M18 20v-8" />
          <circle cx="6" cy="6" r="1.3" />
          <circle cx="12" cy="2.5" r="1.3" />
          <circle cx="18" cy="10" r="1.3" />
        </svg>
      );
    default:
      return null;
  }
}

export function ProductHubCarousel({
  locale,
  basePath,
  items,
  openLabel,
}: {
  locale: string;
  basePath: string;
  items: ProductHubCard[];
  openLabel: string;
  treeTitle?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateNav();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateNav();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(updateNav);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateNav]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Sol ok */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label="Önceki"
        className="absolute -left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-r-xl border border-ink/10 bg-white text-ink/70 shadow-[0_10px_24px_-12px_rgba(15,22,36,0.25)] transition-all duration-200 hover:text-primary disabled:cursor-not-allowed disabled:opacity-0 sm:grid"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Sağ ok */}
      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label="Sonraki"
        className="absolute -right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-l-xl border border-ink/10 bg-white text-ink/70 shadow-[0_10px_24px_-12px_rgba(15,22,36,0.25)] transition-all duration-200 hover:text-primary disabled:cursor-not-allowed disabled:opacity-0 sm:grid"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Kenar gradient fade'ler */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent" aria-hidden />

      {/* Yatay kart şeridi */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-2 px-2 pb-4 pt-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((card, index) => (
          <ProductCard
            key={card.key}
            card={card}
            index={index}
            href={`/${locale}/${basePath}/${card.slug}`}
            openLabel={openLabel}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  card,
  index,
  href,
  openLabel,
}: {
  card: ProductHubCard;
  index: number;
  href: string;
  openLabel: string;
}) {
  return (
    <article
      data-card
      className="group/card relative flex w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_4px_rgba(15,22,36,0.04),0_18px_38px_-22px_rgba(15,22,36,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(15,22,36,0.06),0_28px_50px_-22px_rgba(15,22,36,0.32)] sm:w-[280px]"
    >
      {/* Üst görsel + numara */}
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={card.imageSrc}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 80vw, 280px"
          className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
        />
        {/* Numara rozeti — sol üst tag şekli */}
        <div className="absolute left-0 top-0 grid h-[52px] w-[52px] place-items-center rounded-br-xl bg-primary shadow-[0_6px_14px_-6px_rgba(239,95,23,0.6)]">
          <span className="font-mono-eng text-body font-bold leading-none tabular-nums text-white">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* İkon dairesi — görselin alt kenarına oturur */}
      <div className="relative h-0">
        <div className="absolute -top-7 left-5 grid h-14 w-14 place-items-center rounded-full bg-white text-primary shadow-[0_4px_12px_rgba(15,22,36,0.12),0_1px_2px_rgba(15,22,36,0.08)]">
          <Icon name={card.iconKey} className="h-6 w-6" />
        </div>
      </div>

      {/* Gövde */}
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-10">
        <h3 className="text-balance text-[18px] font-bold leading-snug tracking-tight text-ink">
          {card.name}
        </h3>

        <ul className="mt-4 min-h-0 flex-1 space-y-2.5">
          {card.families.map((fam) => (
            <li key={fam} className="flex items-start gap-2.5 text-fine leading-snug text-secondary/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className="line-clamp-2">{fam}</span>
            </li>
          ))}
          {card.familyOverflow > 0 ? (
            <li className="pt-1 ps-4 font-mono-eng text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary/50">
              +{card.familyOverflow} daha
            </li>
          ) : null}
        </ul>

        <div className="mt-5">
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-2 text-fine font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:text-primary-deep"
          >
            {openLabel}
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
