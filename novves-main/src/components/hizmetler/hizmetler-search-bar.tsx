"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  placeholder: string;
  noResults: string;
};

function resetSearchBlockVisibility() {
  document.querySelectorAll<HTMLElement>("[data-search-block]").forEach((el) => {
    el.style.display = "";
  });
}

function collectSearchBlocks(): HTMLElement[] {
  const roots = ["hizmetler-hub-root", "hizmetler-detail-root"]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el instanceof HTMLElement);

  const blocks: HTMLElement[] = [];
  for (const root of roots) {
    root.querySelectorAll<HTMLElement>("[data-search-block]").forEach((el) => blocks.push(el));
  }

  if (blocks.length > 0) return blocks;

  const main = document.getElementById("hizmetler-main-content");
  if (main) {
    return Array.from(main.querySelectorAll<HTMLElement>("[data-search-block]"));
  }

  return [];
}

export function HizmetlerSearchBar({ placeholder, noResults }: Props) {
  const emptyRef = useRef<HTMLParagraphElement>(null);
  const pathname = usePathname();
  const runSearchRef = useRef<() => void>(() => {});

  const runSearch = useCallback(() => {
    const input = document.getElementById("hizmetlerSearchInput");
    if (!(input instanceof HTMLInputElement)) return;

    const query = input.value.trim().toLowerCase();
    const blocks = collectSearchBlocks();
    let visible = 0;

    blocks.forEach((block) => {
      const matched = !query || block.innerText.toLowerCase().includes(query);
      block.style.display = matched ? "" : "none";
      if (matched) visible += 1;
    });

    if (emptyRef.current) {
      emptyRef.current.classList.toggle("hidden", !(query.length > 0 && visible === 0));
    }
  }, []);

  runSearchRef.current = runSearch;

  useEffect(() => {
    const input = document.getElementById("hizmetlerSearchInput");
    if (!(input instanceof HTMLInputElement)) return;

    resetSearchBlockVisibility();
    input.value = "";

    const scheduleSearch = () => runSearchRef.current();
    scheduleSearch();

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(scheduleSearch);
    });

    let debounceId: ReturnType<typeof setTimeout> | undefined;
    const main = document.getElementById("hizmetler-main-content");
    const observer =
      main &&
      new MutationObserver(() => {
        clearTimeout(debounceId);
        debounceId = setTimeout(scheduleSearch, 80);
      });

    if (observer && main) {
      observer.observe(main, { childList: true, subtree: true });
    }

    input.addEventListener("input", scheduleSearch);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(debounceId);
      observer?.disconnect();
      input.removeEventListener("input", scheduleSearch);
    };
  }, [pathname]);

  return (
    <header
      id="hizmetlerSearchHeader"
      className="sticky top-0 z-20 w-full shrink-0 bg-hz-primary-container px-3 py-3 shadow-sm sm:px-6 sm:py-4 lg:px-10"
    >
      <div className="relative flex w-full max-w-3xl items-center">
        <span className="material-symbols-outlined pointer-events-none absolute left-2.5 text-lg text-white/70 sm:left-3 sm:text-xl">
          search
        </span>
        <input
          id="hizmetlerSearchInput"
          type="search"
          autoComplete="off"
          placeholder={placeholder}
          className="w-full min-w-0 rounded-lg border-0 bg-white py-2.5 pl-10 pr-3 text-base text-hz-on-surface shadow-sm outline-none placeholder:text-hz-on-surface-variant/70 focus:ring-2 focus:ring-hz-secondary-container/40 sm:py-3 sm:pl-11 sm:pr-4 sm:text-sm"
        />
      </div>
      <p ref={emptyRef} className="mt-2 hidden max-w-3xl text-sm text-white/80">
        {noResults}
      </p>
    </header>
  );
}
