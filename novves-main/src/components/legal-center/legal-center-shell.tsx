"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { LegalCenterUi, LegalDocId } from "@/lib/legal-center/types";
import {
  LegalCenterSidebar,
  type LegalNavItem,
} from "@/components/legal-center/legal-center-sidebar";
import {
  LEGAL_CENTER_MOBILE_DRAWER,
  LEGAL_CENTER_PAGE_PADDING_TOP,
} from "@/lib/legal-center/layout";

type Props = {
  locale: string;
  activeId: LegalDocId;
  ui: LegalCenterUi;
  navItems: LegalNavItem[];
  header: ReactNode;
  children: ReactNode;
};

function LegalCenterMobileDrawer({
  open,
  onClose,
  locale,
  activeId,
  items,
  ui,
  isRtl,
}: {
  open: boolean;
  onClose: () => void;
  locale: string;
  activeId: LegalDocId;
  items: LegalNavItem[];
  ui: LegalCenterUi;
  isRtl: boolean;
}) {
  if (!open) return null;

  const edge = isRtl ? "right-0" : "left-0";
  const closedTranslate = isRtl ? "translate-x-full" : "-translate-x-full";

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
        aria-label={ui.closeMenu}
        onClick={onClose}
      />
      <aside
        id="legal-center-mobile-drawer"
        className={`fixed ${edge} z-50 flex w-[min(100vw-3rem,18rem)] flex-col bg-sand-100 shadow-2xl transition-transform duration-300 lg:hidden ${LEGAL_CENTER_MOBILE_DRAWER} ${
          open ? "translate-x-0" : closedTranslate
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-ink/[0.06] px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-ink">
            {ui.treeTitle}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-secondary/60 hover:bg-white"
            aria-label={ui.closeMenu}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <LegalCenterSidebar
          locale={locale}
          activeId={activeId}
          items={items}
          ui={ui}
          onNavigate={onClose}
        />
      </aside>
    </>
  );
}

export function LegalCenterShell({
  locale,
  activeId,
  ui,
  navItems,
  header,
  children,
}: Props) {
  const [mobileNav, setMobileNav] = useState(false);
  const isRtl = locale === "ar";
  const closeMobileNav = useCallback(() => setMobileNav(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNav(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setMobileNav(false);
  }, [activeId]);

  const fabEdge = isRtl ? "right-4" : "left-4";

  return (
    <div
      className={`overflow-x-clip bg-sand-200 text-ink print:pt-0 ${LEGAL_CENTER_PAGE_PADDING_TOP}`}
      dir={isRtl ? "rtl" : undefined}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-stretch">
        <aside
          id="legal-center-sidebar"
          className="hidden min-h-full shrink-0 border-r border-sand-300/70 bg-sand-100 lg:block"
        >
          <div className="sticky top-28 flex h-[calc(100vh-7rem)] flex-col">
            <LegalCenterSidebar
              locale={locale}
              activeId={activeId}
              items={navItems}
              ui={ui}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <main className="min-w-0 flex-1 pb-10 sm:pb-12">
            <button
              type="button"
              onClick={() => setMobileNav(true)}
              className={`fixed bottom-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#00386B] text-white shadow-lg ring-2 ring-white/90 lg:hidden ${fabEdge}`}
              aria-label={ui.openMenu}
              aria-expanded={mobileNav}
              aria-controls="legal-center-mobile-drawer"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <LegalCenterMobileDrawer
              open={mobileNav}
              onClose={closeMobileNav}
              locale={locale}
              activeId={activeId}
              items={navItems}
              ui={ui}
              isRtl={isRtl}
            />

            <div className="mx-auto max-w-6xl space-y-4 p-4 sm:space-y-6 sm:p-6 lg:p-8">
              <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-secondary/70 sm:text-xs print:hidden">
                <Link href={`/${locale}`} className="transition-colors hover:text-ink">
                  {ui.breadcrumbHome}
                </Link>
                <span>/</span>
                <Link href={`/${locale}/legal`} className="transition-colors hover:text-ink">
                  {ui.breadcrumbHub}
                </Link>
                <span>/</span>
                <span className="font-medium text-ink">{ui.nav[activeId]}</span>
              </nav>

              {header}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
