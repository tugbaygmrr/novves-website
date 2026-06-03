"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SolutionLibraryPageData } from "@/lib/solution-library";
import { SolutionLibrarySidebar } from "@/components/solution-library/solution-library-sidebar";
import { SolutionLibraryProductMedia } from "@/components/solution-library/solution-library-product-media";
import { SolutionLibraryHero } from "@/components/solution-library/solution-library-hero";
import { SolutionLibraryQuoteBar } from "@/components/solution-library/solution-library-quote-bar";
import {
  applySolutionLibraryFilters,
  countActiveFilters,
  EMPTY_SOLUTION_LIBRARY_FILTERS,
  type ContentScope,
  type SolutionLibraryFilterState,
} from "@/lib/solution-library-filters";
import {
  buildSolutionLibrarySearchResults,
  normalizeSearchQuery,
} from "@/lib/solution-library-search";
import type { SolutionLibraryUi } from "@/lib/solution-library-ui";
import { SolutionLibraryStripFooter } from "@/components/solution-library/solution-library-strip-footer";
import {
  SOLUTION_LIBRARY_MOBILE_DRAWER,
  SOLUTION_LIBRARY_PAGE_PADDING_TOP,
  SOLUTION_LIBRARY_PAGE_X,
} from "@/lib/solution-library-routes";

function IconChevronRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function IconSearch({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3-3" />
    </svg>
  );
}

function IconFilter({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function IconPlus({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function docIconTone(kind: SolutionLibraryPageData["documents"][number]["icon"]): string {
  switch (kind) {
    case "doc":
      return "bg-[#00386B]/10 text-[#00386B]";
    case "bim":
      return "bg-secondary/15 text-secondary";
    case "cert":
      return "bg-primary/10 text-primary";
    default:
      return "bg-primary/10 text-primary";
  }
}

function DocIcon({ kind }: { kind: "pdf" | "doc" | "bim" | "cert" }) {
  const paths = {
    pdf: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6",
    doc: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    bim: "M4 19V5h6l2 2h8v12H4zM10 5v4h4",
    cert: "M12 2l3 2v6c0 3.5-3 6-3 6s-3-2.5-3-6V4l3-2z",
  };
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[kind]} />
    </svg>
  );
}

function SolutionLibraryFilterPanel({
  ui,
  filters,
  onChange,
  onReset,
  onClose,
  componentOptions,
  showDocuments,
  availableDocTypes,
}: {
  ui: SolutionLibraryUi;
  filters: SolutionLibraryFilterState;
  onChange: (next: SolutionLibraryFilterState) => void;
  onReset: () => void;
  onClose: () => void;
  componentOptions: { href: string; label: string }[];
  showDocuments: boolean;
  availableDocTypes: SolutionLibraryFilterState["documentTypes"];
}) {
  const docTypeLabels: Record<SolutionLibraryFilterState["documentTypes"][number], string> = {
    pdf: ui.filterDocPdf,
    doc: ui.filterDocDoc,
    bim: ui.filterDocBim,
    cert: ui.filterDocCert,
  };

  const setScope = (contentScope: ContentScope) => onChange({ ...filters, contentScope });

  const toggleComponent = (href: string) => {
    const next = filters.componentHrefs.includes(href)
      ? filters.componentHrefs.filter((h) => h !== href)
      : [...filters.componentHrefs, href];
    onChange({ ...filters, componentHrefs: next });
  };

  const toggleDocType = (icon: SolutionLibraryFilterState["documentTypes"][number]) => {
    const next = filters.documentTypes.includes(icon)
      ? filters.documentTypes.filter((t) => t !== icon)
      : [...filters.documentTypes, icon];
    onChange({ ...filters, documentTypes: next });
  };

  const scopeOptions: { value: ContentScope; label: string; disabled?: boolean }[] = [
    { value: "all", label: ui.filterContentAll },
    { value: "products", label: ui.filterContentProducts },
    {
      value: "documents",
      label: ui.filterContentDocuments,
      disabled: !showDocuments,
    },
  ];

  return (
    <div
      id="solution-library-filter-panel"
      role="dialog"
      aria-label={ui.filterTitle}
      className="absolute inset-x-0 top-full z-[100] mt-2 max-h-[min(70vh,28rem)] overflow-y-auto rounded-xl border border-sand-300 bg-white p-4 shadow-[0_20px_48px_-24px_rgba(15,22,36,0.35)] custom-scrollbar sm:inset-x-auto sm:right-0 sm:left-auto sm:w-[min(100vw-2rem,20rem)]"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-wider text-ink">{ui.filterTitle}</p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-secondary/50 hover:bg-sand-100 hover:text-ink"
          aria-label={ui.closeMenu}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-[10px] font-bold uppercase tracking-wider text-secondary/55">{ui.filterContent}</legend>
        <div className="flex flex-wrap gap-1.5">
          {scopeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => setScope(opt.value)}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                filters.contentScope === opt.value
                  ? "bg-primary text-white"
                  : "bg-sand-100 text-ink hover:bg-sand-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {componentOptions.length > 0 ? (
        <fieldset className="mt-4 space-y-2">
          <legend className="text-[10px] font-bold uppercase tracking-wider text-secondary/55">{ui.filterComponents}</legend>
          <ul className="max-h-36 space-y-1 overflow-y-auto custom-scrollbar">
            {componentOptions.map((child) => {
              const checked = filters.componentHrefs.includes(child.href);
              return (
                <li key={child.href}>
                  <label className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-sand-100">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleComponent(child.href)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-sand-300 text-primary focus:ring-primary/30"
                    />
                    <span className="text-[11px] font-semibold leading-snug text-ink">{child.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ) : null}

      {showDocuments && availableDocTypes.length > 0 ? (
        <fieldset className="mt-4 space-y-2">
          <legend className="text-[10px] font-bold uppercase tracking-wider text-secondary/55">{ui.filterDocTypes}</legend>
          <div className="flex flex-wrap gap-1.5">
            {availableDocTypes.map((icon) => {
              const active = filters.documentTypes.includes(icon);
              return (
                <button
                  key={icon}
                  type="button"
                  onClick={() => toggleDocType(icon)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                    active ? "bg-primary text-white" : "bg-sand-100 text-ink hover:bg-sand-200"
                  }`}
                >
                  {docTypeLabels[icon]}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-sand-200 pt-3">
        <p className="text-[10px] font-semibold text-secondary/55">
          {countActiveFilters(filters) > 0
            ? ui.filterActive.replace("{count}", String(countActiveFilters(filters)))
            : null}
        </p>
        <button
          type="button"
          onClick={onReset}
          disabled={countActiveFilters(filters) === 0}
          className="text-[11px] font-bold text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          {ui.filterReset}
        </button>
      </div>
    </div>
  );
}

function SolutionLibraryMobileDrawer({
  data,
  locale,
  open,
  onClose,
  searchQuery,
}: {
  data: SolutionLibraryPageData;
  locale: string;
  open: boolean;
  onClose: () => void;
  searchQuery: string;
}) {
  const { ui } = data;
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
        aria-label={ui.closeMenu}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col bg-sand-100 shadow-2xl transition-transform duration-300 lg:hidden ${SOLUTION_LIBRARY_MOBILE_DRAWER} ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/[0.06] px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-ink">{ui.categoriesTitle}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-secondary/60 hover:bg-white"
            aria-label={ui.closeMenu}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SolutionLibrarySidebar
          items={data.sidebar}
          activeSlug={data.slug}
          ui={ui}
          locale={locale}
          onNavigate={onClose}
          searchQuery={searchQuery}
        />
      </aside>
    </>
  );
}

export function SolutionLibraryPage({
  data,
  locale,
  solutionsHubLabel,
}: {
  data: SolutionLibraryPageData;
  locale: string;
  solutionsHubLabel: string;
}) {
  const { ui } = data;
  const [mobileNav, setMobileNav] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SolutionLibraryFilterState>(EMPTY_SOLUTION_LIBRARY_FILTERS);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const contentEndRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(
    () => buildSolutionLibrarySearchResults(data, locale, search),
    [data, locale, search],
  );

  const filteredView = useMemo(
    () => applySolutionLibraryFilters(searchResults, filters, data),
    [searchResults, filters, data],
  );

  const activeFilterCount = countActiveFilters(filters);
  const currentComponentOptions = useMemo(
    () => data.sidebar.find((s) => s.slug === data.slug)?.children ?? [],
    [data.sidebar, data.slug],
  );
  const availableDocTypes = useMemo(() => {
    const types = new Set<SolutionLibraryFilterState["documentTypes"][number]>();
    for (const doc of data.documents) types.add(doc.icon);
    return [...types];
  }, [data.documents]);

  const SEARCH_MIN_CHARS = 2;
  const SEARCH_POPOVER_LIMIT = 4;
  const showSearchPopover =
    searchOpen && searchResults.hasQuery && search.trim().length >= SEARCH_MIN_CHARS;

  const popoverSolutions = searchResults.solutions.slice(0, SEARCH_POPOVER_LIMIT);
  const popoverProducts = searchResults.products.slice(0, SEARCH_POPOVER_LIMIT);
  const popoverDocs = searchResults.documents.slice(0, SEARCH_POPOVER_LIMIT);
  const extraSolutions = Math.max(0, searchResults.solutions.length - SEARCH_POPOVER_LIMIT);
  const extraProducts = Math.max(0, searchResults.products.length - SEARCH_POPOVER_LIMIT);
  const extraDocs = Math.max(0, searchResults.documents.length - SEARCH_POPOVER_LIMIT);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!toolbarRef.current?.contains(e.target as Node)) {
        setSearchOpen(false);
        setFilterOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFilterOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const clearSearch = useCallback(() => {
    setSearch("");
    setSearchOpen(false);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(EMPTY_SOLUTION_LIBRARY_FILTERS);
  }, []);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSelected(new Set()), []);

  const { products: filteredProducts, documents: filteredDocs, showProductsSection, showDocsSection } =
    filteredView;

  const quoteHref =
    selected.size > 0
      ? `/${locale}/iletisim?konu=${encodeURIComponent(data.breadcrumbCurrent)}&secim=${encodeURIComponent([...selected].join(","))}`
      : `/${locale}/iletisim`;

  const closeMobileNav = useCallback(() => setMobileNav(false), []);

  return (
    <div className={`overflow-x-clip bg-sand-200 text-ink ${SOLUTION_LIBRARY_PAGE_PADDING_TOP}`}>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-stretch">
        <aside id="solution-library-sidebar" className="hidden min-h-full shrink-0 bg-sand-100 lg:block">
          <div className="sticky top-28 flex h-[calc(100vh-7rem)] flex-col">
            <SolutionLibrarySidebar
              items={data.sidebar}
              activeSlug={data.slug}
              ui={ui}
              locale={locale}
              searchQuery={search}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
        <main className={`min-w-0 flex-1 ${selected.size > 0 ? "pb-28 sm:pb-32" : ""}`}>
          <button
            type="button"
            onClick={() => setMobileNav(true)}
            className={`fixed left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#00386B] text-white shadow-lg ring-2 ring-white/90 lg:hidden ${
              selected.size > 0 ? "bottom-28 sm:bottom-32" : "bottom-6"
            }`}
            aria-label={ui.openMenu}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="relative z-40">
          <section
            ref={toolbarRef}
            className={`relative border-b border-sand-300/70 bg-sand-200 ${SOLUTION_LIBRARY_PAGE_X} py-3`}
            aria-label={ui.searchPlaceholder}
          >
          <div
            className={`group overflow-hidden rounded-xl border bg-white shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 sm:flex sm:items-stretch ${
              showSearchPopover ? "border-primary/40 ring-2 ring-primary/20" : "border-sand-300"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4">
              <IconSearch
                className={`h-5 w-5 shrink-0 transition-colors ${
                  showSearchPopover ? "text-primary" : "text-secondary/60 group-focus-within:text-primary"
                }`}
              />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") clearSearch();
                }}
                placeholder={ui.searchPlaceholder}
                aria-label={ui.searchPlaceholder}
                aria-expanded={showSearchPopover}
                aria-controls="solution-library-search-results"
                autoComplete="off"
                className="min-w-0 flex-1 border-none bg-transparent text-sm font-medium text-ink placeholder:text-secondary/60 focus:outline-none focus:ring-0"
              />
              {search.trim() ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-secondary/50 transition-colors hover:bg-sand-100 hover:text-ink"
                  aria-label={ui.searchClear}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
            </div>
            <div className="relative shrink-0 border-t border-sand-200 px-3 py-2 sm:flex sm:items-center sm:border-t-0 sm:border-l sm:border-sand-300 sm:px-4 sm:py-2.5">
              <button
                type="button"
                onClick={() => {
                  setFilterOpen((o) => !o);
                  setSearchOpen(false);
                }}
                aria-expanded={filterOpen}
                aria-controls="solution-library-filter-panel"
                className={`flex w-full items-center justify-center gap-2 whitespace-nowrap text-xs font-bold transition-colors sm:w-auto sm:justify-start ${
                  activeFilterCount > 0 || filterOpen ? "text-primary" : "text-ink hover:text-primary"
                }`}
              >
                <IconFilter className="h-5 w-5 shrink-0" />
                <span>{ui.filter}</span>
                {activeFilterCount > 0 ? (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-white">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>
              {filterOpen ? (
                <SolutionLibraryFilterPanel
                  ui={ui}
                  filters={filters}
                  onChange={setFilters}
                  onReset={resetFilters}
                  onClose={() => setFilterOpen(false)}
                  componentOptions={currentComponentOptions}
                  showDocuments={data.showDocumentation}
                  availableDocTypes={availableDocTypes}
                />
              ) : null}
            </div>
          </div>

          {activeFilterCount > 0 ? (
            <p className="mt-2 text-[10px] font-semibold text-secondary/60">
              {ui.filterActive.replace("{count}", String(activeFilterCount))}
              {" · "}
              <button type="button" onClick={resetFilters} className="font-bold text-primary hover:underline">
                {ui.filterReset}
              </button>
            </p>
          ) : null}

          {showSearchPopover ? (
            <div
              id="solution-library-search-results"
              role="listbox"
              className="absolute inset-x-0 top-full z-[100] mt-1 max-h-[min(14rem,50vh)] overflow-y-auto rounded-xl border border-sand-300 bg-white py-1 shadow-[0_20px_48px_-16px_rgba(15,22,36,0.35)] custom-scrollbar"
            >
                  {searchResults.isEmpty ? (
                    <p className="px-3 py-2 text-xs text-secondary/65">
                      {ui.searchNoResults.replace("{query}", search.trim())}
                    </p>
                  ) : (
                    <>
                      {popoverSolutions.length > 0 ? (
                        <div className="px-1 py-0.5">
                          <p className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-secondary/45">
                            {ui.searchGroupSolutions}
                          </p>
                          <ul>
                            {popoverSolutions.map((hit) => (
                              <li key={hit.href}>
                                <Link
                                  href={hit.href}
                                  onClick={() => {
                                    clearSearch();
                                    setMobileNav(false);
                                  }}
                                  className={`block truncate rounded px-2 py-1 text-xs transition-colors hover:bg-sand-100 ${
                                    hit.current ? "font-semibold text-primary" : "text-ink"
                                  }`}
                                >
                                  {hit.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {extraSolutions > 0 ? (
                            <p className="px-2 py-0.5 text-[10px] text-secondary/50">
                              {ui.searchMore.replace("{count}", String(extraSolutions))}
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                      {popoverProducts.length > 0 ? (
                        <div className="border-t border-sand-200/80 px-1 py-0.5">
                          <p className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-secondary/45">
                            {ui.searchGroupComponents}
                          </p>
                          <ul>
                            {popoverProducts.map((p) => (
                              <li key={p.id}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const idx = data.products.findIndex((x) => x.id === p.id);
                                    if (idx >= 0) {
                                      document
                                        .getElementById(`bilesen-${idx}`)
                                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }
                                    clearSearch();
                                  }}
                                  className="block w-full truncate rounded px-2 py-1 text-left text-xs text-ink hover:bg-sand-100"
                                >
                                  {p.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {popoverDocs.length > 0 ? (
                        <div className="border-t border-sand-200/80 px-1 py-0.5">
                          <p className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-secondary/45">
                            {ui.searchGroupDocuments}
                          </p>
                          <ul>
                            {popoverDocs.map((d) => (
                              <li key={d.id}>
                                {d.href ? (
                                  <a
                                    href={d.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={clearSearch}
                                    className="block truncate rounded px-2 py-1 text-xs text-ink hover:bg-sand-100"
                                  >
                                    {d.title}
                                  </a>
                                ) : (
                                  <span className="block truncate px-2 py-1 text-xs text-ink">{d.title}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </>
                  )}
            </div>
          ) : search.trim().length > 0 && search.trim().length < SEARCH_MIN_CHARS ? (
            <p className="mt-1.5 px-1 text-[10px] text-secondary/50">{ui.searchMinChars}</p>
          ) : null}
          </section>

          <nav className={`${SOLUTION_LIBRARY_PAGE_X} py-3`} aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-secondary/70 sm:gap-x-1.5 sm:text-[10px] sm:tracking-[0.2em]">
            <li>
              <Link href={`/${locale}/cozumler`} className="hover:text-primary">
                {solutionsHubLabel}
              </Link>
            </li>
            {data.breadcrumbCategory ? (
              <li className="flex items-center gap-1.5">
                <IconChevronRight className="h-3 w-3 shrink-0" />
                <Link href={`/${locale}/cozumler`} className="hover:text-primary">
                  {data.breadcrumbCategory}
                </Link>
              </li>
            ) : null}
            <li className="flex items-center gap-1.5">
              <IconChevronRight className="h-3 w-3 shrink-0" />
              <span className="font-bold text-primary">{data.breadcrumbCurrent}</span>
            </li>
          </ol>
          </nav>
          </div>

          <section className={`relative z-0 ${SOLUTION_LIBRARY_PAGE_X} pb-8`}>
            <SolutionLibraryHero
              heroImage={data.heroImage}
              titleLine1={data.titleLine1}
              titleHighlight={data.titleHighlight}
              subtitle={data.subtitle}
              ctaPrimary={data.ctaPrimary}
              ctaPrimaryHref={data.ctaPrimaryHref}
              ctaSecondary={data.ctaSecondary}
              ctaSecondaryHref={data.ctaSecondaryHref}
            />
          </section>

          {showProductsSection ? (
          <section id="bolum-urunler" className={`${SOLUTION_LIBRARY_PAGE_X} pb-10 scroll-mt-28`}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-ink sm:text-2xl">{ui.coreComponents}</h2>
              <div className="mt-1.5 h-1 w-16 bg-primary" />
            </div>
            <Link
              href={data.catalogHref}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-[gap] hover:gap-2.5"
            >
              {ui.viewCatalog}
              <IconChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="rounded-xl bg-white px-5 py-8 text-sm leading-relaxed text-secondary/75 ring-1 ring-ink/[0.06]">
              {filteredView.hasActiveFilters
                ? ui.filterNoResults
                : searchResults.hasQuery
                  ? ui.searchNoResults.replace("{query}", search.trim())
                  : ui.emptyProducts}
            </p>
          ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => {
              const isSelected = selected.has(product.id);
              return (
                <article
                  key={product.id}
                  id={`bilesen-${index}`}
                  className={`group flex min-h-0 flex-col overflow-hidden rounded-xl bg-white p-5 shadow-[0_4px_16px_rgba(0,56,107,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] ${
                    isSelected ? "ring-2 ring-primary/50 bg-sand-100" : "ring-1 ring-ink/[0.06]"
                  }`}
                >
                  <SolutionLibraryProductMedia src={product.image} alt={product.name}>
                    {product.badge ? (
                      <span className="absolute right-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[8px] font-black uppercase text-[#00386B] shadow-sm backdrop-blur">
                        {product.badge}
                      </span>
                    ) : null}
                    {isSelected ? (
                      <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary shadow">
                        <IconCheck />
                      </span>
                    ) : null}
                  </SolutionLibraryProductMedia>
                  <h3 className="product-card-clamp-2 text-base font-black text-ink sm:text-lg">{product.name}</h3>
                  <p className="product-card-clamp-3 mt-2 min-h-0 text-xs leading-relaxed text-secondary/75">{product.description}</p>
                  <div className="mt-4 flex flex-col gap-3 border-t border-sand-300/60 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                    {product.href ? (
                      <Link href={product.href} className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline">
                        {ui.moreDetail}
                        <IconChevronRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <span className="text-[10px] font-bold text-secondary/40">{ui.moreDetail}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggle(product.id)}
                      className={`inline-flex w-full items-center justify-center gap-1.5 rounded px-3 py-2 text-[10px] font-bold transition-colors sm:w-auto sm:py-1.5 ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-sand-100 text-ink ring-1 ring-ink/[0.08] hover:bg-primary hover:text-white"
                      }`}
                    >
                      {isSelected ? <IconCheck /> : <IconPlus />}
                      {isSelected ? ui.added : ui.addToQuote}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          )}
          </section>
          ) : null}

          {showDocsSection ? (
          <section id="bolum-dokumantasyon" className={`${SOLUTION_LIBRARY_PAGE_X} pb-8 scroll-mt-28`}>
            <div className="rounded-xl border border-sand-300/80 bg-sand-100 p-5 sm:rounded-[1.5rem] sm:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8 sm:gap-4">
                <span className="flex h-10 w-10 items-center justify-center text-primary" aria-hidden>
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7v12a1 1 0 001 1h16a1 1 0 001-1V9a1 1 0 00-1-1h-6l-2-2H4a1 1 0 00-1 1z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M12 10v6" />
                  </svg>
                </span>
                <h2 className="text-xl font-black uppercase tracking-tighter text-ink">{ui.documentation}</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredDocs.length === 0 ? (
                  <p className="col-span-full rounded-xl border border-sand-300/80 bg-white px-5 py-8 text-sm leading-relaxed text-secondary/75">
                    {filteredView.hasActiveFilters
                      ? ui.filterNoResults
                      : searchResults.hasQuery
                        ? ui.searchNoResults.replace("{query}", search.trim())
                        : ui.emptyDocs}
                  </p>
                ) : (
                  filteredDocs.map((doc) => {
                    const isSelected = selected.has(doc.id);
                    const rowClass = `group flex w-full items-center justify-between gap-4 rounded-xl border border-sand-300/80 bg-white p-4 text-left transition-colors hover:bg-sand-200/80 ${
                      isSelected ? "ring-2 ring-primary/40" : ""
                    }`;
                    const inner = (
                      <>
                        <div className="flex min-w-0 items-center gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isSelected ? "bg-primary text-white" : docIconTone(doc.icon)
                            }`}
                          >
                            <DocIcon kind={doc.icon} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-ink group-hover:text-primary">{doc.title}</p>
                            <p className="text-[10px] font-semibold text-secondary/65">{doc.meta}</p>
                          </div>
                        </div>
                        {doc.href ? (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-secondary/45 group-hover:text-primary">
                            <IconChevronRight className="h-4 w-4" />
                          </span>
                        ) : (
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                              isSelected ? "text-primary" : "text-secondary/45 group-hover:text-primary"
                            }`}
                          >
                            {isSelected ? <IconCheck className="h-5 w-5" /> : <IconPlus className="h-5 w-5" />}
                          </span>
                        )}
                      </>
                    );
                    return doc.href ? (
                      <a
                        key={doc.id}
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={rowClass}
                      >
                        {inner}
                      </a>
                    ) : (
                      <button key={doc.id} type="button" onClick={() => toggle(doc.id)} className={rowClass}>
                        {inner}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </section>
          ) : null}

          <div ref={contentEndRef} className="h-px w-full shrink-0" aria-hidden />
        </main>

        <SolutionLibraryQuoteBar
          count={selected.size}
          ui={ui}
          quoteHref={quoteHref}
          onClear={clear}
          contentEndRef={contentEndRef}
        />

        <SolutionLibraryStripFooter locale={locale} ui={ui} className="lg:shrink-0" />
        </div>
      </div>

      <SolutionLibraryMobileDrawer
        data={data}
        locale={locale}
        open={mobileNav}
        onClose={closeMobileNav}
        searchQuery={search}
      />
    </div>
  );
}
