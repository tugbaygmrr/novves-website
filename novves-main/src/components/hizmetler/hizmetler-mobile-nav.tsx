"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  HIZMETLER_NAV_ITEMS,
  getHizmetlerNavLabel,
  resolveActiveHizmetlerNavId,
} from "@/lib/hizmetler-nav";
import { HIZMETLER_MOBILE_DRAWER } from "@/lib/hizmetler/layout";

type Props = {
  locale: string;
  title: string;
  linkLabels: Record<string, string>;
  downloadSpecLabel?: string;
};

export function HizmetlerMobileNav({ locale, title, linkLabels, downloadSpecLabel = "Şartname İndir" }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const activeId = resolveActiveHizmetlerNavId(pathname, locale);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-[70] flex h-12 max-w-[min(calc(100vw-2rem),20rem)] items-center gap-2 rounded-full bg-white px-3.5 text-sm font-semibold text-hz-on-surface shadow-lg ring-1 ring-sand-300 sm:px-4 lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="hizmetler-mobile-drawer"
      >
        <span className="material-symbols-outlined shrink-0 text-xl">{open ? "close" : "menu"}</span>
        <span className="truncate">{title}</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[65] lg:hidden" role="dialog" aria-modal aria-label={title}>
          <button type="button" className="absolute inset-0 bg-black/40" onClick={close} aria-label="Kapat" />
          <aside
            id="hizmetler-mobile-drawer"
            className={`absolute left-0 flex w-[min(20rem,calc(100vw-2.5rem))] flex-col bg-sand-200 shadow-xl ${HIZMETLER_MOBILE_DRAWER}`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-sand-300/70 px-4 py-4">
              <h2 className="truncate pe-2 text-sm font-bold uppercase tracking-wide text-hz-on-surface">{title}</h2>
              <button
                type="button"
                onClick={close}
                className="material-symbols-outlined shrink-0 rounded-lg p-1 hover:bg-white/80"
                aria-label="Kapat"
              >
                close
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
              {HIZMETLER_NAV_ITEMS.map((item) => {
                const label = getHizmetlerNavLabel(item.labelKey, linkLabels);
                const isActive = item.id === activeId;
                if (item.disabled || !item.href) {
                  return (
                    <span
                      key={item.id}
                      className="mb-1 block rounded-lg px-3 py-2.5 text-sm text-hz-on-surface-variant/40 sm:px-4 sm:py-3"
                    >
                      {label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={item.id}
                    href={`/${locale}${item.href}`}
                    onClick={close}
                    className={
                      isActive
                        ? "mb-1 flex items-center gap-3 rounded-lg bg-white px-3 py-2.5 text-sm font-bold text-hz-on-surface shadow-sm sm:px-4 sm:py-3"
                        : "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-hz-on-surface-variant hover:bg-white/70 sm:px-4 sm:py-3"
                    }
                  >
                    <span
                      className={`material-symbols-outlined shrink-0 text-[22px] ${isActive ? "text-hz-secondary" : ""}`}
                    >
                      {item.icon}
                    </span>
                    <span className="min-w-0 leading-snug">{label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="shrink-0 border-t border-sand-300/70 p-3 sm:p-4">
              <button
                type="button"
                className="hizmetler-industrial-gradient flex w-full items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold text-hz-on-primary"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                {downloadSpecLabel}
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
