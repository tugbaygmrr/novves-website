"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Reference } from "@/data/references";
import { resolveReferenceImageSrc } from "@/lib/references/resolve-reference-image";
import { ReferanslarCatalogCta } from "@/components/referanslar/referanslar-catalog-cta";
import { ReferanslarStickyCatalog } from "@/components/referanslar/referanslar-sticky-catalog";
import { ReferanslarTable, type ReferanslarTableDict } from "@/components/referanslar/referanslar-table";
import {
  matchesReferanslarFilter,
  REFERANSLAR_CATEGORY_TREE,
  resolveReferanslarCategoryLabels,
  resolveReferenceSectorLabel,
  type ReferanslarCategoryLabels,
  type ReferanslarFilterId,
} from "@/lib/referanslar-categories";
import { referenceHasProductFamily } from "@/lib/references/reference-product-family";
import { HIZMETLER_PAGE_PADDING_TOP, GLOBAL_JUMP_NAV_PADDING_END } from "@/lib/hizmetler/layout";

type FilterOption = { value: string; label: string };
type ViewMode = "grid" | "list";

export type ReferanslarDict = {
  searchPlaceholder: string;
  allCountries: string;
  allProductFamilies: string;
  gridViewLabel: string;
  listViewLabel?: string;
  countryViewLabel: string;
  clear: string;
  project: string;
  noResults: string;
  noResultsHint: string;
  showMore: string;
  viewDetails: string;
  usedProducts: string;
  sidebarTitle?: string;
  sidebarSubtitle?: string;
  categories?: Record<string, string>;
  categoryTree?: ReferanslarCategoryLabels["tree"];
  all?: string;
  supportTitle?: string;
  supportDesc?: string;
  supportCta?: string;
  catalogCta?: {
    title: string;
    description: string;
    button: string;
    pdfFormat: string;
    pdfMeta: string;
    languages: string;
    languagesList?: string;
    documentLibraryLink?: string;
  };
  table?: ReferanslarTableDict;
};

const CATEGORY_ICONS = Object.fromEntries(
  REFERANSLAR_CATEGORY_TREE.map((node) => [node.id, node.icon]),
) as Record<string, string>;

function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("ı", "i")
    .trim();
}

export function ReferanslarClient({
  locale,
  references,
  countryOptions,
  productFamilyOptions,
  dict,
  header,
}: {
  locale: string;
  references: Reference[];
  countryOptions: FilterOption[];
  productFamilyOptions: FilterOption[];
  dict: ReferanslarDict;
  header?: ReactNode;
}) {
  const categoryLabels = resolveReferanslarCategoryLabels(locale, dict);

  const catalogDict = dict.catalogCta ?? {
    title: locale === "tr" ? "Referanslar\u0131m\u0131z Cebinizde" : "Our References in Your Pocket",
    description:
      locale === "tr"
        ? "Tamamlanan projelerimizi, sekt\u00f6r \u00f6rneklerimizi ve m\u00fchendislik \u00e7\u00f6z\u00fcmlerimizi i\u00e7eren g\u00fcncel referans katalo\u011fumuzu indirin."
        : "Download our reference catalog with completed projects, sector highlights and engineering solutions.",
    button: locale === "tr" ? "Katalo\u011fu \u0130ndir" : "Download Catalog",
    pdfFormat: locale === "tr" ? "PDF Format\u0131" : "PDF Format",
    pdfMeta: "CAT-RP-01 \u00b7 V0R0",
    languages: locale === "tr" ? "\u00c7oklu Dil Deste\u011fi" : "Multilingual Support",
    documentLibraryLink: locale === "tr" ? "Dok\u00fcman k\u00fct\u00fcphanesi" : "Document library",
  };

  const tableDict: ReferanslarTableDict = dict.table ?? {
    image: locale === "tr" ? "G\u00f6rsel" : "Image",
    sector: locale === "tr" ? "Sekt\u00f6r" : "Sector",
    buildingType: locale === "tr" ? "Yap\u0131 T\u00fcr\u00fc" : "Building Type",
    projectName: locale === "tr" ? "Proje Ad\u0131" : "Project Name",
    productsUsed: locale === "tr" ? "Kullan\u0131lan \u00dcr\u00fcnler" : "Products Used",
    productFamilies: locale === "tr" ? "\u00dcr\u00fcn Ailesi Adlar\u0131" : "Product Family Names",
    country: locale === "tr" ? "\u00dclke" : "Country",
  };

  const [filter, setFilter] = useState<ReferanslarFilterId>("all");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set());
  const [country, setCountry] = useState("");
  const [productFamily, setProductFamily] = useState("");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedRef, setSelectedRef] = useState<Reference | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeSearchText(search);
    return references.filter((r) => {
      if (!matchesReferanslarFilter(r.classKey, filter)) return false;
      if (country && r.country !== country) return false;
      if (productFamily && !referenceHasProductFamily(r, productFamily)) return false;
      if (normalizedQuery) {
        const sector = resolveReferenceSectorLabel(r.classKey, categoryLabels);
        const haystack = normalizeSearchText(
          [r.title, r.countryName, r.className, r.description, sector, ...r.productNames].join(" "),
        );
        return haystack.includes(normalizedQuery);
      }
      return true;
    });
  }, [references, filter, country, productFamily, search, categoryLabels]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = useCallback(() => {
    setFilter("all");
    setCountry("");
    setProductFamily("");
    setSearch("");
    setVisibleCount(20);
  }, []);

  const hasActiveFilter = filter !== "all" || country || productFamily || search;

  const selectFilter = (next: ReferanslarFilterId) => {
    setFilter(next);
    setVisibleCount(20);
    setMobileNavOpen(false);
    if (next !== "all") {
      const categoryId = next.split(":")[0];
      setExpandedCategories((prev) => new Set(prev).add(categoryId));
    }
  };

  const toggleCategoryExpanded = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileNav();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMobileNav]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  const sidebarTitle = dict.sidebarTitle ?? "Referanslarımız";

  const sidebarNav = (
    <nav className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => selectFilter("all")}
        className={
          filter === "all"
            ? "flex w-full items-center gap-3 rounded-lg bg-white px-4 py-3 text-left text-sm font-bold text-hz-on-surface shadow-sm ring-1 ring-sand-300/80 transition-all"
            : "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-hz-on-surface-variant transition-all hover:bg-white/70 hover:text-hz-on-surface"
        }
      >
        <span
          className={`material-symbols-outlined text-[22px] ${filter === "all" ? "text-hz-secondary" : "text-hz-on-surface-variant"}`}
        >
          folder_shared
        </span>
        {categoryLabels.all}
      </button>

      {categoryLabels.tree.map((category) => {
        const categoryActive = filter === category.id || filter.startsWith(`${category.id}:`);
        const expanded = expandedCategories.has(category.id) || categoryActive;
        const icon = CATEGORY_ICONS[category.id] ?? "category";

        return (
          <div key={category.id} className="flex flex-col">
            <div className="flex items-stretch gap-0.5">
              <button
                type="button"
                onClick={() => selectFilter(category.id)}
                className={
                  filter === category.id
                    ? "flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-white px-4 py-3 text-left text-sm font-bold text-hz-on-surface shadow-sm ring-1 ring-sand-300/80 transition-all"
                    : categoryActive
                      ? "flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-white/80 px-4 py-3 text-left text-sm font-semibold text-hz-on-surface ring-1 ring-sand-300/50 transition-all"
                      : "flex min-w-0 flex-1 items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium text-hz-on-surface-variant transition-all hover:bg-white/70 hover:text-hz-on-surface"
                }
              >
                <span
                  className={`material-symbols-outlined shrink-0 text-[22px] ${categoryActive ? "text-hz-secondary" : "text-hz-on-surface-variant"}`}
                >
                  {icon}
                </span>
                <span className="min-w-0 leading-snug">{category.label}</span>
              </button>
              {category.subcategories.length > 0 ? (
                <button
                  type="button"
                  onClick={() => toggleCategoryExpanded(category.id)}
                  aria-expanded={expanded}
                  aria-label={expanded ? "Alt kategorileri gizle" : "Alt kategorileri göster"}
                  className="flex shrink-0 items-center justify-center rounded-lg px-2 text-hz-on-surface-variant transition-colors hover:bg-white/70 hover:text-hz-on-surface"
                >
                  <span
                    className={`material-symbols-outlined text-xl transition-transform ${expanded ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>
              ) : null}
            </div>

            {expanded && category.subcategories.length > 0 ? (
              <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-sand-300/80 pl-2">
                {category.subcategories.map((sub) => {
                  const subFilter = `${category.id}:${sub.id}` as ReferanslarFilterId;
                  const subActive = filter === subFilter;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => selectFilter(subFilter)}
                      className={
                        subActive
                          ? "rounded-lg bg-white px-3 py-2 text-left text-xs font-bold text-hz-on-surface shadow-sm ring-1 ring-sand-300/80"
                          : "rounded-lg px-3 py-2 text-left text-xs font-medium text-hz-on-surface-variant transition-colors hover:bg-white/70 hover:text-hz-on-surface"
                      }
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );

  const sidebarPanel = (
    <>
      <div className="shrink-0 border-b border-sand-300/70 bg-sand-200 px-4 py-5">
        <h2 className="text-xl font-extrabold uppercase tracking-wide text-hz-on-surface">{sidebarTitle}</h2>
        <p className="mt-1 text-sm font-medium text-hz-on-surface-variant">
          {dict.sidebarSubtitle ?? "Proje Hiyerarşisi"}
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto bg-sand-200 p-4">{sidebarNav}</div>
      <div className="relative shrink-0 overflow-hidden border-t border-sand-300/70 bg-sand-200 p-4">
        <div className="relative overflow-hidden rounded-xl bg-hz-primary-container p-6 text-white">
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              {dict.supportTitle ?? "Desteğe mi İhtiyacınız Var?"}
            </p>
            <p className="mt-2 text-sm text-white/75">
              {dict.supportDesc ?? "Teknik ekibimizle projelerinizi detaylandıralım."}
            </p>
            <Link
              href={`/${locale}/iletisim`}
              className="mt-4 inline-block text-xs font-black uppercase text-hz-secondary-container hover:text-white"
            >
              {dict.supportCta ?? "Temsilciye Bağlan"}
            </Link>
          </div>
          <span
            className="material-symbols-outlined pointer-events-none absolute -bottom-4 -right-4 text-[7rem] text-white/10"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden
          >
            help
          </span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={`overflow-x-clip bg-sand-200 ${HIZMETLER_PAGE_PADDING_TOP}`}>
        <div className="flex min-h-[calc(100dvh-5rem)] min-w-0 items-stretch sm:min-h-[calc(100dvh-6rem)] lg:min-h-[calc(100dvh-7rem)]">
          {/* Sol panel — tam yükseklik kum zemin */}
          <aside
            id="referanslar-sidebar"
            className="hidden w-64 shrink-0 flex-col self-stretch border-r border-sand-300/60 bg-sand-200 lg:flex xl:w-72"
          >
            <div className="flex h-[calc(100vh-7rem)] flex-col lg:sticky lg:top-28">{sidebarPanel}</div>
          </aside>

          <div className={`min-w-0 flex-1 bg-sand-200 ${GLOBAL_JUMP_NAV_PADDING_END}`}>
          {header}

          {/* Mobil: sol panel çekmecesi */}
          <button
            type="button"
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-[70] flex h-12 max-w-[min(calc(100vw-2rem),20rem)] items-center gap-2 rounded-full bg-white px-3.5 text-sm font-semibold text-hz-on-surface shadow-lg ring-1 ring-sand-300 sm:px-4 lg:hidden"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-expanded={mobileNavOpen}
            aria-controls="referanslar-mobile-drawer"
          >
            <span className="material-symbols-outlined shrink-0 text-xl">{mobileNavOpen ? "close" : "menu"}</span>
            <span className="truncate">{sidebarTitle}</span>
          </button>

          {mobileNavOpen ? (
            <div className="fixed inset-0 z-[65] lg:hidden" role="dialog" aria-modal aria-label={sidebarTitle}>
              <button
                type="button"
                className="absolute inset-0 bg-black/40"
                onClick={closeMobileNav}
                aria-label="Kapat"
              />
              <aside
                id="referanslar-mobile-drawer"
                className="absolute bottom-0 left-0 top-[max(4.5rem,env(safe-area-inset-top))] flex w-[min(20rem,calc(100vw-2rem))] min-h-0 flex-col overflow-hidden bg-sand-200 shadow-xl sm:top-20"
              >
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <button
                    type="button"
                    onClick={closeMobileNav}
                    className="material-symbols-outlined absolute right-3 top-3 z-10 rounded-lg bg-sand-200/90 p-1 hover:bg-white/80"
                    aria-label="Kapat"
                  >
                    close
                  </button>
                  {sidebarPanel}
                </div>
              </aside>
            </div>
          ) : null}

          <section className="w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            {/* Arama + görünüm */}
            <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-2xl md:flex-[2]">
                <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-hz-outline">
                  search
                </span>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(20);
                  }}
                  placeholder={dict.searchPlaceholder}
                  className="w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-hz-on-surface shadow-sm outline-none ring-0 placeholder:font-normal placeholder:text-hz-on-surface-variant/60 focus:ring-2 focus:ring-hz-secondary/40"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setVisibleCount(20);
                  }}
                  className="block w-full min-w-0 flex-1 basis-[calc(50%-0.25rem)] rounded-xl border-0 bg-white px-3 py-3.5 text-sm text-hz-on-surface shadow-sm outline-none focus:ring-2 focus:ring-hz-secondary/40 sm:w-auto sm:flex-none sm:basis-auto sm:min-w-[9rem]"
                >
                  <option value="">{dict.allCountries}</option>
                  {countryOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <select
                  value={productFamily}
                  onChange={(e) => {
                    setProductFamily(e.target.value);
                    setVisibleCount(20);
                  }}
                  className="block w-full min-w-0 flex-1 basis-[calc(50%-0.25rem)] rounded-xl border-0 bg-white px-3 py-3.5 text-sm text-hz-on-surface shadow-sm outline-none focus:ring-2 focus:ring-hz-secondary/40 sm:w-auto sm:flex-none sm:basis-auto sm:min-w-[11rem]"
                >
                  <option value="">{dict.allProductFamilies ?? "By Product Family"}</option>
                  {productFamilyOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label={dict.gridViewLabel}
                  className={`rounded-xl p-3.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-hz-primary-container text-white"
                      : "bg-white text-hz-on-surface-variant shadow-sm hover:bg-white/80"
                  }`}
                >
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label={dict.listViewLabel ?? dict.countryViewLabel}
                  className={`rounded-xl p-3.5 transition-colors ${
                    viewMode === "list"
                      ? "bg-hz-primary-container text-white"
                      : "bg-white text-hz-on-surface-variant shadow-sm hover:bg-white/80"
                  }`}
                >
                  <span className="material-symbols-outlined">view_list</span>
                </button>
                <span className="rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-hz-on-surface shadow-sm">
                  {filtered.length} {dict.project}
                </span>
                {hasActiveFilter ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-xl bg-white px-3 py-3.5 text-xs font-semibold text-hz-on-surface-variant shadow-sm hover:text-hz-secondary"
                  >
                    {dict.clear}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_min(24rem,100%)] xl:items-stretch">
              <div className="min-w-0">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <span className="material-symbols-outlined text-5xl text-hz-outline/40">search_off</span>
                    <p className="mt-4 text-sm font-medium text-hz-on-surface-variant">{dict.noResults}</p>
                    <p className="mt-1 text-xs text-hz-on-surface-variant/70">{dict.noResultsHint}</p>
                  </div>
                ) : viewMode === "grid" ? (
                  <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
                      {visible.map((ref) => (
                        <ReferenceCard key={ref.id} ref_={ref} onSelect={setSelectedRef} dict={dict} />
                      ))}
                    </div>
                    {hasMore ? (
                      <div className="mt-12 text-center">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((c) => c + 20)}
                          className="inline-flex items-center gap-2 rounded-xl bg-hz-primary-container px-8 py-3.5 text-sm font-bold text-white hover:opacity-90"
                        >
                          {dict.showMore}
                          <span className="rounded-md bg-white/15 px-2 py-0.5 text-xs">
                            {filtered.length - visibleCount}
                          </span>
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <ReferanslarTable
                      references={visible}
                      categoryLabels={categoryLabels}
                      dict={tableDict}
                      onSelect={setSelectedRef}
                    />
                    {hasMore ? (
                      <div className="mt-8 text-center">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((c) => c + 20)}
                          className="inline-flex items-center gap-2 rounded-xl bg-hz-primary-container px-8 py-3.5 text-sm font-bold text-white hover:opacity-90"
                        >
                          {dict.showMore}
                          <span className="rounded-md bg-white/15 px-2 py-0.5 text-xs">
                            {filtered.length - visibleCount}
                          </span>
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              <ReferanslarStickyCatalog>
                <ReferanslarCatalogCta locale={locale} dict={catalogDict} className="w-full" />
              </ReferanslarStickyCatalog>
            </div>

            <div className="mt-10 pb-8 xl:hidden">
              <ReferanslarCatalogCta locale={locale} dict={catalogDict} className="w-full" />
            </div>
          </section>
          </div>
        </div>
      </div>

      {selectedRef ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedRef(null)}
          role="presentation"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal
          >
            <button
              type="button"
              onClick={() => setSelectedRef(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-hz-primary-container/80 text-white"
              aria-label="Kapat"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <div className="relative aspect-[16/10] w-full sm:aspect-[2/1]">
              <Image
                src={resolveReferenceImageSrc(selectedRef.image)}
                alt={selectedRef.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute right-4 top-4 rounded bg-hz-primary-container px-3 py-1 text-xs font-bold text-white">
                {selectedRef.year}
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-hz-primary-container sm:text-2xl">{selectedRef.title}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-hz-secondary-fixed px-3 py-1 text-xs font-bold uppercase text-hz-on-secondary-fixed">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {selectedRef.countryName}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#eceef0] px-3 pt-1.5 pb-1 text-xs font-bold uppercase leading-none text-hz-on-surface-variant">
                  {selectedRef.className}
                </span>
              </div>
              <p className="mt-5 text-sm leading-7 text-hz-on-surface-variant">{selectedRef.description}</p>
              <div className="mt-6 rounded-xl bg-[#f2f4f6] p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-hz-on-surface-variant">
                  {dict.usedProducts}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedRef.productNames.map((p) => (
                    <span
                      key={p}
                      className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-hz-on-surface-variant"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ReferenceCard({
  ref_,
  onSelect,
  dict,
}: {
  ref_: Reference;
  onSelect: (r: Reference) => void;
  dict: ReferanslarDict;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(ref_)}
      className="group overflow-hidden rounded-xl bg-white text-left shadow-[0_8px_24px_-12px_rgba(25,28,30,0.12)] transition-all duration-500 hover:shadow-[0_20px_40px_-16px_rgba(25,28,30,0.2)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={resolveReferenceImageSrc(ref_.image)}
          alt={ref_.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute right-4 top-4 rounded bg-hz-primary-container px-3 py-1 text-xs font-bold text-white">
          {ref_.year}
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-extrabold leading-snug text-hz-primary-container transition-colors group-hover:text-hz-secondary sm:text-xl">
          {ref_.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-hz-secondary-fixed px-3 py-1 text-[10px] font-bold uppercase text-hz-on-secondary-fixed sm:text-xs">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {ref_.countryName}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#eceef0] px-3 pt-1.5 pb-1 text-[10px] font-bold uppercase leading-none text-hz-on-surface-variant sm:text-xs">
            {ref_.className}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-xs text-hz-on-surface-variant/0 transition-all group-hover:text-hz-on-surface-variant">
          {dict.viewDetails}
        </p>
      </div>
    </button>
  );
}
