"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Reference } from "@/data/references";
import { resolveReferenceImageSrc } from "@/lib/references/resolve-reference-image";
import { ReferanslarCatalogCta } from "@/components/referanslar/referanslar-catalog-cta";
import { ReferanslarStickyCatalog } from "@/components/referanslar/referanslar-sticky-catalog";
import {
  matchesReferanslarCategory,
  type ReferanslarCategoryId,
} from "@/lib/referanslar-categories";
import { HIZMETLER_PAGE_PADDING_TOP } from "@/lib/hizmetler/layout";

type FilterOption = { value: string; label: string };
type ViewMode = "grid" | "list";

export type ReferanslarDict = {
  searchPlaceholder: string;
  allCountries: string;
  allClasses: string;
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
  categories?: {
    all: string;
    industrial: string;
    residential: string;
    special: string;
  };
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
    languagesList: string;
  };
};

const CATEGORY_ICONS: Record<ReferanslarCategoryId, string> = {
  all: "folder_shared",
  industrial: "factory",
  residential: "business",
  special: "engineering",
};

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
  classOptions,
  dict,
  header,
}: {
  locale: string;
  references: Reference[];
  countryOptions: FilterOption[];
  classOptions: FilterOption[];
  dict: ReferanslarDict;
  header?: ReactNode;
}) {
  const categories = dict.categories ?? {
    all: "Global Projeler",
    industrial: "Endüstriyel Tesisler",
    residential: "Konut ve Ofis",
    special: "Özel Çözümler",
  };

  const catalogDict = dict.catalogCta ?? {
    title: "Proje Detayları Cebinizde",
    description:
      "Tüm referanslarımızı, teknik detayları ve mühendislik çözümlerimizi içeren interaktif kataloğumuzu şimdi indirin.",
    button: "Kataloğu İndir",
    pdfFormat: "PDF Formatı",
    pdfMeta: "24.5 MB • Güncellendi: 12.2024",
    languages: "Çoklu Dil Desteği",
    languagesList: "TR, EN, DE, FR",
  };

  const categoryItems: { id: ReferanslarCategoryId; label: string; icon: string }[] = [
    { id: "all", label: categories.all, icon: CATEGORY_ICONS.all },
    { id: "industrial", label: categories.industrial, icon: CATEGORY_ICONS.industrial },
    { id: "residential", label: categories.residential, icon: CATEGORY_ICONS.residential },
    { id: "special", label: categories.special, icon: CATEGORY_ICONS.special },
  ];

  const [category, setCategory] = useState<ReferanslarCategoryId>("all");
  const [country, setCountry] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedRef, setSelectedRef] = useState<Reference | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeSearchText(search);
    return references.filter((r) => {
      if (!matchesReferanslarCategory(r.classKey, category)) return false;
      if (country && r.country !== country) return false;
      if (classFilter && r.classKey !== classFilter) return false;
      if (normalizedQuery) {
        const haystack = normalizeSearchText(
          [r.title, r.countryName, r.className, r.description, ...r.productNames].join(" "),
        );
        return haystack.includes(normalizedQuery);
      }
      return true;
    });
  }, [references, category, country, classFilter, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = useCallback(() => {
    setCategory("all");
    setCountry("");
    setClassFilter("");
    setSearch("");
    setVisibleCount(20);
  }, []);

  const hasActiveFilter = category !== "all" || country || classFilter || search;

  const selectCategory = (id: ReferanslarCategoryId) => {
    setCategory(id);
    setVisibleCount(20);
    setMobileNavOpen(false);
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
      {categoryItems.map((item) => {
        const active = category === item.id;
        const iconClass = active ? "text-hz-secondary" : "text-hz-on-surface-variant";
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => selectCategory(item.id)}
            className={
              active
                ? "flex w-full items-center gap-3 rounded-lg bg-white px-4 py-3 text-left text-sm font-bold text-hz-on-surface shadow-sm ring-1 ring-sand-300/80 transition-all"
                : "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-hz-on-surface-variant transition-all hover:bg-white/70 hover:text-hz-on-surface"
            }
          >
            <span className={`material-symbols-outlined text-[22px] ${iconClass}`}>{item.icon}</span>
            {item.label}
          </button>
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

          <div className="min-w-0 flex-1 bg-sand-200">
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

          <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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
                  value={classFilter}
                  onChange={(e) => {
                    setClassFilter(e.target.value);
                    setVisibleCount(20);
                  }}
                  className="block w-full min-w-0 flex-1 basis-[calc(50%-0.25rem)] rounded-xl border-0 bg-white px-3 py-3.5 text-sm text-hz-on-surface shadow-sm outline-none focus:ring-2 focus:ring-hz-secondary/40 sm:w-auto sm:flex-none sm:basis-auto sm:min-w-[9rem]"
                >
                  <option value="">{dict.allClasses}</option>
                  {classOptions.map((o) => (
                    <option key={o.value + o.label} value={o.value}>
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
                  <ul className="space-y-4">
                    {visible.map((ref) => (
                      <ReferenceListRow key={ref.id} ref_={ref} onSelect={setSelectedRef} dict={dict} />
                    ))}
                  </ul>
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

function ReferenceListRow({
  ref_,
  onSelect,
  dict,
}: {
  ref_: Reference;
  onSelect: (r: Reference) => void;
  dict: ReferanslarDict;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(ref_)}
        className="group flex w-full gap-4 overflow-hidden rounded-xl bg-white p-3 text-left shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-4"
      >
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
          <Image
            src={resolveReferenceImageSrc(ref_.image)}
            alt={ref_.title}
            fill
            className="object-cover"
            sizes="160px"
          />
          <span className="absolute right-2 top-2 rounded bg-hz-primary-container px-2 py-0.5 text-[10px] font-bold text-white">
            {ref_.year}
          </span>
        </div>
        <div className="min-w-0 flex-1 py-1">
          <h3 className="font-extrabold text-hz-primary-container group-hover:text-hz-secondary">{ref_.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-hz-secondary-fixed px-2.5 py-0.5 text-[10px] font-bold uppercase text-hz-on-secondary-fixed">
              {ref_.countryName}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#eceef0] px-2.5 pt-1 pb-0.5 text-[10px] font-bold uppercase leading-none text-hz-on-surface-variant">
              {ref_.className}
            </span>
          </div>
          <p className="mt-2 text-xs text-hz-secondary font-semibold opacity-0 transition-opacity group-hover:opacity-100">
            {dict.viewDetails}
          </p>
        </div>
      </button>
    </li>
  );
}
