"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HIZMETLER_NAV_ITEMS,
  getHizmetlerNavLabel,
  resolveActiveHizmetlerNavId,
} from "@/lib/hizmetler-nav";
import { SIDEBAR_PANEL_SCROLL } from "@/lib/sidebar-panel-scroll";

type Props = {
  locale: string;
  title: string;
  linkLabels: Record<string, string>;
  downloadSpecLabel?: string;
};

export function HizmetlerSidebar({ locale, title, linkLabels, downloadSpecLabel = "Şartname İndir" }: Props) {
  const pathname = usePathname() ?? "";
  const activeId = resolveActiveHizmetlerNavId(pathname, locale);

  return (
    <aside
      id="hizmetlerSidebar"
      className="hidden w-64 shrink-0 border-r border-sand-300/60 bg-sand-200 lg:block xl:w-72"
    >
      <div className="sticky top-28 flex h-[calc(100vh-7rem)] min-h-0 flex-col">
      <div className="border-b border-sand-300/70 px-4 py-5">
        <h2 className="text-xl font-extrabold uppercase tracking-wide text-hz-on-surface">{title}</h2>
      </div>
      <nav className={`flex min-h-0 flex-1 flex-col gap-1 p-4 ${SIDEBAR_PANEL_SCROLL}`}>
        {HIZMETLER_NAV_ITEMS.map((item) => {
          const label = getHizmetlerNavLabel(item.labelKey, linkLabels);
          const isActive = item.id === activeId;
          const className = isActive
            ? "flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-bold text-hz-on-surface shadow-sm ring-1 ring-sand-300/80 transition-all"
            : "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-hz-on-surface-variant transition-all hover:bg-white/70 hover:text-hz-on-surface";

          const iconClass = isActive ? "text-hz-secondary" : "text-hz-on-surface-variant";

          if (item.disabled || !item.href) {
            return (
              <span
                key={item.id}
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-hz-on-surface-variant/45"
                aria-disabled
              >
                <span className={`material-symbols-outlined text-[22px] ${iconClass}`}>{item.icon}</span>
                {label}
              </span>
            );
          }

          return (
            <Link
              key={item.id}
              href={`/${locale}${item.href}`}
              className={className}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`material-symbols-outlined text-[22px] ${iconClass}`}>{item.icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-sand-300/70 p-4">
        <button
          type="button"
          className="hizmetler-industrial-gradient flex w-full items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold text-hz-on-primary transition-opacity hover:opacity-90"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          {downloadSpecLabel}
        </button>
      </div>
      </div>
    </aside>
  );
}
