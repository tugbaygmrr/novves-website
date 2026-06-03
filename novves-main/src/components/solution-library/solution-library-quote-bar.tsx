"use client";

import Link from "next/link";
import { useEffect, useState, type RefObject } from "react";
import type { SolutionLibraryUi } from "@/lib/solution-library-ui";
import { SOLUTION_LIBRARY_PAGE_X } from "@/lib/solution-library-routes";

/** Panel yüksekliği + boşluk — footer bandına girmeden önce gizle */
const BAR_CLEARANCE_PX = 112;

type SolutionLibraryQuoteBarProps = {
  count: number;
  ui: SolutionLibraryUi;
  quoteHref: string;
  onClear: () => void;
  /** `main` içeriğinin bittiği nokta (strip footer'dan önce) */
  contentEndRef: RefObject<HTMLElement | null>;
};

/** Seçim özeti — içerik boyunca altta sabit; strip footer hizasına gelince gizlenir */
export function SolutionLibraryQuoteBar({
  count,
  ui,
  quoteHref,
  onClear,
  contentEndRef,
}: SolutionLibraryQuoteBarProps) {
  const [hideForFooter, setHideForFooter] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      setHideForFooter(false);
      return;
    }

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const update = () => {
      const sentinel = contentEndRef.current;
      if (!sentinel) return;
      const rect = sentinel.getBoundingClientRect();
      setHideForFooter(rect.top < window.innerHeight - BAR_CLEARANCE_PX);
    };

    const attach = () => {
      if (cancelled) return;
      const sentinel = contentEndRef.current;
      if (!sentinel) {
        requestAnimationFrame(attach);
        return;
      }

      update();
      observer = new IntersectionObserver(() => update(), {
        threshold: [0, 0.01, 0.1, 0.25, 0.5, 1],
      });
      observer.observe(sentinel);
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });
    };

    attach();

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [count, contentEndRef]);

  if (count <= 0 || hideForFooter) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 ${SOLUTION_LIBRARY_PAGE_X} pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6`}
      role="region"
      aria-label={ui.projectInquiry}
    >
      <div className="mx-auto w-full max-w-[1600px] lg:flex">
        <div className="hidden w-[17rem] shrink-0 lg:block" aria-hidden />
        <div className="flex min-w-0 flex-1 justify-center lg:px-8">
          <div className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#00386B] p-3 text-white shadow-2xl sm:gap-3 sm:p-3.5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary shadow-[0_8px_20px_-8px_rgba(239,95,23,0.6)] sm:h-10 sm:w-10">
                <span className="text-xs font-black">{count}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold sm:text-xs">
                  {count} {ui.selections}
                </p>
                <p className="truncate text-[8px] font-semibold uppercase tracking-widest text-white/55 sm:text-[9px]">
                  {ui.projectInquiry}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={onClear}
                className="px-2 text-[10px] font-bold uppercase text-white/55 transition-colors hover:text-white"
              >
                {ui.clear}
              </button>
              <Link
                href={quoteHref}
                className="rounded-lg bg-primary px-4 py-2.5 text-xs font-black uppercase text-white shadow-lg shadow-primary/30 transition hover:bg-primary-deep"
              >
                {ui.quote}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
