"use client";

import Link from "next/link";
import type { LegalCenterUi } from "@/lib/legal-center/types";
import type { LegalDocId } from "@/lib/legal-center/types";
import { LegalDocIcon } from "@/components/legal-center/legal-center-icons";
import { SIDEBAR_PANEL_SCROLL } from "@/lib/sidebar-panel-scroll";

export type LegalNavItem = {
  id: LegalDocId;
  path: string;
  label: string;
};

type Props = {
  locale: string;
  activeId: LegalDocId;
  items: LegalNavItem[];
  ui: LegalCenterUi;
  onNavigate?: () => void;
};

function NavLink({
  locale,
  item,
  active,
  onNavigate,
}: {
  locale: string;
  item: LegalNavItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={`/${locale}/${item.path}`}
      onClick={onNavigate}
      className={`flex items-start gap-2.5 rounded-r-lg px-3 py-2.5 text-[13px] font-semibold leading-snug transition-colors hover:translate-x-0.5 ${
        active
          ? "bg-white text-primary shadow-sm ring-1 ring-ink/[0.06]"
          : "text-secondary hover:bg-sand-200/80"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <LegalDocIcon id={item.id} className="mt-0.5 h-[18px] w-[18px] shrink-0" />
      <span className="min-w-0">{item.label}</span>
    </Link>
  );
}

export function LegalCenterSidebar({ locale, activeId, items, ui, onNavigate }: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 px-4 py-4">
        <h2 className="text-base font-bold text-dark sm:text-lg">{ui.hubTitle}</h2>
        <p className="mt-0.5 text-[10px] font-normal uppercase tracking-widest text-secondary/50">
          {ui.hubSubtitle}
        </p>
      </div>

      <nav
        className={`min-h-0 flex-1 space-y-0.5 px-3 pb-6 ${SIDEBAR_PANEL_SCROLL}`}
        aria-label={ui.treeTitle}
      >
        <p className="mb-3 mt-1 px-2 text-[10px] font-bold uppercase tracking-widest text-primary/80">
          {ui.treeTitle}
        </p>
        {items.map((item) => (
          <NavLink
            key={item.id}
            locale={locale}
            item={item}
            active={item.id === activeId}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {ui.legalQuestion ? (
        <div className="shrink-0 p-3">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,22,36,0.25)]">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 13v-1a8 8 0 0 1 16 0v1" />
                  <rect x="2.5" y="12.5" width="4" height="6" rx="1.6" />
                  <rect x="17.5" y="12.5" width="4" height="6" rx="1.6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 18.5a3 3 0 0 1-3 3h-2.5" />
                </svg>
              </span>
              <p className="text-[12px] font-bold leading-snug text-dark">{ui.legalQuestion}</p>
            </div>
            {ui.legalQuestionDesc ? (
              <p className="mt-2.5 text-[11px] leading-relaxed text-secondary/65">{ui.legalQuestionDesc}</p>
            ) : null}
            <a
              href="mailto:info@novves.com"
              className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-primary-deep"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              info@novves.com
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
