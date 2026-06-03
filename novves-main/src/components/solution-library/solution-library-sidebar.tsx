import Link from "next/link";
import type { SolutionLibrarySidebarItem } from "@/lib/solution-library";
import type { SolutionLibraryUi } from "@/lib/solution-library-ui";
import { SolutionLibraryCozumIcon } from "@/components/solution-library/solution-library-sidebar-icons";
import { normalizeSearchQuery } from "@/lib/solution-library-search";

export function SolutionLibrarySidebar({
  items,
  activeSlug,
  ui,
  locale,
  onNavigate,
  searchQuery = "",
}: {
  items: SolutionLibrarySidebarItem[];
  activeSlug: string;
  ui: SolutionLibraryUi;
  locale: string;
  onNavigate?: () => void;
  searchQuery?: string;
}) {
  const q = normalizeSearchQuery(searchQuery);
  const visibleItems =
    q.length >= 2
      ? items.filter((item) => normalizeSearchQuery(item.label).includes(q))
      : items;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="px-4 py-4">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-secondary/55">{ui.categoriesTitle}</p>
      </div>
      <nav
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 pb-4 custom-scrollbar"
        aria-label={ui.categoriesTitle}
      >
        {visibleItems.length === 0 && q.length >= 2 ? (
          <p className="px-3 py-4 text-xs leading-relaxed text-secondary/65">
            {ui.searchNoResults.replace("{query}", searchQuery.trim())}
          </p>
        ) : null}
        <ul className="space-y-1.5">
          {visibleItems.map((item) => {
            const active = item.slug === activeSlug;
            return (
              <li key={item.slug}>
                <Link
                  href={`/${locale}/cozumler/${item.slug}`}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12px] font-semibold leading-snug transition-[background,box-shadow,color] ${
                    active
                      ? "border-s-[3px] border-solid border-primary bg-white text-primary shadow-[0_8px_24px_-20px_rgba(15,22,36,0.12)] ring-1 ring-ink/[0.05]"
                      : "bg-white/75 text-ink shadow-[0_4px_16px_-14px_rgba(15,22,36,0.1)] ring-1 ring-ink/[0.05] hover:bg-white"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden>
                    <SolutionLibraryCozumIcon slug={item.slug} className="h-8 w-8" />
                  </span>
                  <span className="min-w-0 flex-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="m-3 rounded-xl bg-gradient-to-br from-[#131B2E] to-[#00386B] p-4 text-white shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{ui.sidebarSupportTitle}</p>
        <p className="mt-2 text-[11px] leading-relaxed text-white/65">{ui.sidebarSupportDesc}</p>
        <Link
          href={`/${locale}/iletisim`}
          onClick={onNavigate}
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-[11px] font-bold text-white transition hover:brightness-110"
        >
          {ui.sidebarSupportCta}
        </Link>
      </div>
    </div>
  );
}
