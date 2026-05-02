"use client";

import Link from "next/link";
import { useRef } from "react";

type SolutionCardItem = {
  key: string;
  slug: string;
  name: string;
};

export function SolutionsCarousel({
  items,
  locale,
  basePath = "cozumler",
}: {
  items: SolutionCardItem[];
  locale: string;
  basePath?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollCards = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector("[data-solution-card]") as HTMLElement | null;
    if (!firstCard) return;

    const gap = 20;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const amount = (cardWidth + gap) * (direction === "next" ? 1 : -1);
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative px-1 sm:px-0">
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between sm:-left-1 sm:-right-1 lg:-left-2 lg:-right-2">
        <button
          type="button"
          onClick={() => scrollCards("prev")}
          aria-label="Önceki çözümler"
          className="pointer-events-auto btn-3d btn-3d-glass inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink/[0.14] bg-white/90 text-ink/60 shadow-[0_1px_4px_-1px_rgba(15,20,30,0.12)] transition-colors hover:border-primary hover:text-primary sm:h-10 sm:w-10 sm:rounded-xl sm:border-ink/15 sm:bg-white sm:text-ink/75 sm:shadow-none"
        >
          <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.85}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollCards("next")}
          aria-label="Sonraki çözümler"
          className="pointer-events-auto btn-3d btn-3d-glass inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink/[0.14] bg-white/90 text-ink/60 shadow-[0_1px_4px_-1px_rgba(15,20,30,0.12)] transition-colors hover:border-primary hover:text-primary sm:h-10 sm:w-10 sm:rounded-xl sm:border-ink/15 sm:bg-white sm:text-ink/75 sm:shadow-none"
        >
          <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.85}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <Link
            key={item.key}
            href={`/${locale}/${basePath}/${item.slug}`}
            data-solution-card
            className="group relative flex h-[220px] w-[calc(100%-1.25rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#d8d6cf] bg-white p-6 shadow-[0_16px_38px_-28px_rgba(14,18,28,0.28)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_22px_48px_-26px_rgba(17,27,44,0.34)] motion-reduce:transition-none sm:w-[calc(50%-0.625rem)] sm:hover:-translate-y-1 lg:w-[calc((100%-3.75rem)/4)]"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1d2f4d]/95 via-primary/85 to-[#90a5bd]/90" />
            <span className="absolute right-5 top-4 text-[2rem] font-black leading-none text-[#d6d6d2]/45">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-[#fff1ea] text-primary transition-colors duration-300 group-hover:border-primary/35 group-hover:bg-primary group-hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>

            <h3 className="pr-10 text-[1.05rem] font-bold leading-[1.28] tracking-tight text-[#182235]">
              {item.name}
            </h3>

            <div className="mt-auto flex items-center gap-2 pt-6">
              <span className="h-px w-7 bg-primary/45 transition-all duration-300 group-hover:w-11 group-hover:bg-primary" />
              <svg
                className="h-3.5 w-3.5 text-primary/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
