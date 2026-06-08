"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { ProductCatalogPageData } from "@/lib/product-catalog";
import {
  PRODUCT_CATALOG_MOBILE_DRAWER,
  PRODUCT_CATALOG_PAGE_PADDING_TOP,
  PRODUCT_CATALOG_PAGE_X,
} from "@/lib/product-catalog-routes";
import { SIDEBAR_PANEL_SCROLL } from "@/lib/sidebar-panel-scroll";
import type { ProductCatalogUi } from "@/lib/product-catalog-ui";
import {
  EMPTY_PRODUCT_CATALOG_FILTERS,
  ProductCatalogFilterBar,
  type ProductCatalogFilterValues,
} from "@/components/product-catalog/product-catalog-filter-bar";
import { ProductCatalogProductMedia } from "@/components/product-catalog/product-catalog-product-media";
import { PRODUCT_STANDARD_MEDIA_BG } from "@/components/product-standard-media";
import { ProductCatalogSidebar } from "@/components/product-catalog/product-catalog-sidebar";
function IconChevronRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function IconExternal({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    </svg>
  );
}

function IconDownload({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4l-4-4M4 19h16" />
    </svg>
  );
}

function ProductCatalogMobileDrawer({
  categories,
  ui,
  locale,
  open,
  onClose,
}: {
  categories: ProductCatalogPageData["categories"];
  ui: ProductCatalogUi;
  locale: string;
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[55] bg-ink/40 touch-none lg:hidden"
        aria-label={ui.closeMenu}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 left-0 z-[60] w-[min(100vw-3rem,18rem)] transition-transform duration-300 ease-out lg:hidden ${PRODUCT_CATALOG_MOBILE_DRAWER} ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <aside
          id="product-catalog-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={ui.categoriesTitle}
          className={`flex h-full flex-col overflow-y-auto overscroll-contain bg-sand-100 shadow-2xl ${SIDEBAR_PANEL_SCROLL}`}
        >
          <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-ink/[0.06] bg-sand-100 px-4 py-3">
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
          <div className="px-2 pb-[max(5.5rem,env(safe-area-inset-bottom))] pt-2">
            <ProductCatalogSidebar
              categories={categories}
              ui={ui}
              locale={locale}
              onNavigate={onClose}
              compact
            />
          </div>
        </aside>
      </div>
    </>,
    document.body,
  );
}

export function ProductCatalogPage({
  locale,
  data,
  ui,
}: {
  locale: string;
  data: ProductCatalogPageData;
  ui: ProductCatalogUi;
}) {
  const [mobileNav, setMobileNav] = useState(false);
  const [draftFilters, setDraftFilters] = useState<ProductCatalogFilterValues>(EMPTY_PRODUCT_CATALOG_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<ProductCatalogFilterValues>(EMPTY_PRODUCT_CATALOG_FILTERS);

  const seriesOptions = useMemo(() => {
    const names = data.products.map((p) => p.name);
    return Array.from(new Set(names)).sort();
  }, [data.products]);

  const typeOptions = useMemo(() => {
    const types = data.products.map((p) => p.type);
    return Array.from(new Set(types)).sort();
  }, [data.products]);

  const hasActiveFilters = useMemo(() => {
    const f = appliedFilters;
    return Boolean(f.series || f.query.trim() || f.productType || f.modelMin || f.modelMax);
  }, [appliedFilters]);

  const filtered = useMemo(() => {
    const q = appliedFilters.query.trim().toLowerCase();
    const min = appliedFilters.modelMin.trim() ? Number(appliedFilters.modelMin) : null;
    const max = appliedFilters.modelMax.trim() ? Number(appliedFilters.modelMax) : null;

    return data.products.filter((p) => {
      if (appliedFilters.series && p.name !== appliedFilters.series) return false;
      if (appliedFilters.productType && p.type !== appliedFilters.productType) return false;
      const modelCount = p.subModels.length;
      if (min !== null && !Number.isNaN(min) && modelCount < min) return false;
      if (max !== null && !Number.isNaN(max) && modelCount > max) return false;
      if (!q) return true;
      const hay = [p.name, p.type, p.description, ...p.subModels].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [data.products, appliedFilters]);

  const applyFilters = useCallback(() => {
    setAppliedFilters({ ...draftFilters });
  }, [draftFilters]);

  const resetFilters = useCallback(() => {
    setDraftFilters(EMPTY_PRODUCT_CATALOG_FILTERS);
    setAppliedFilters(EMPTY_PRODUCT_CATALOG_FILTERS);
  }, []);

  const closeMobileNav = useCallback(() => setMobileNav(false), []);

  useEffect(() => {
    if (!mobileNav) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNav]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNav(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={`overflow-x-clip bg-sand-200 text-ink ${PRODUCT_CATALOG_PAGE_PADDING_TOP}`}>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-stretch">
        <aside className="hidden min-h-full shrink-0 bg-sand-100 lg:block">
          <div className="sticky top-28 flex h-[calc(100vh-7rem)] flex-col">
            <ProductCatalogSidebar categories={data.categories} ui={ui} locale={locale} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <button
            type="button"
            onClick={() => setMobileNav(true)}
            className={`fixed bottom-6 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#00386B] text-white shadow-lg ring-2 ring-white/90 transition-opacity lg:hidden ${
              mobileNav ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            aria-label={ui.openMenu}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <main className="min-w-0 flex-1 pb-12">
            <div className={`${PRODUCT_CATALOG_PAGE_X} py-3`}>
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-secondary/70 sm:text-[10px] sm:tracking-[0.2em]">
                  <li>
                    <Link href={`/${locale}`} className="hover:text-primary">
                      {ui.home}
                    </Link>
                  </li>
                  <li className="flex items-center gap-1">
                    <IconChevronRight className="h-3 w-3 shrink-0" />
                    <Link href={`/${locale}/urunler/hava-hareketi`} className="hover:text-primary">
                      {ui.products}
                    </Link>
                  </li>
                  <li className="flex items-center gap-1">
                    <IconChevronRight className="h-3 w-3 shrink-0" />
                    <span className="font-bold text-primary">{data.breadcrumbCategory}</span>
                  </li>
                </ol>
              </nav>
            </div>

            <header className={`${PRODUCT_CATALOG_PAGE_X} pb-6`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h1 className="font-eurostile text-balance text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
                    {data.pageTitle}
                  </h1>
                  <div className="mt-2 h-1 w-16 bg-primary" />
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary/75 sm:text-base">
                    {data.pageSubtitle}
                  </p>
                </div>
                <a
                  href={data.perfectusHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 flex-col gap-1 rounded-xl bg-gradient-to-br from-[#131B2E] to-[#00386B] px-5 py-3.5 text-white shadow-[0_16px_48px_-28px_rgba(0,0,0,0.45)] transition hover:brightness-110 sm:min-w-[220px]"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                    {ui.perfectusBadge}
                  </span>
                  <span className="flex items-center gap-2 text-sm font-bold">
                    {ui.perfectusCta}
                    <IconExternal className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                </a>
              </div>
            </header>

            <section className={`${PRODUCT_CATALOG_PAGE_X} pb-8`} aria-label={ui.filterApply}>
              <ProductCatalogFilterBar
                ui={ui}
                seriesOptions={seriesOptions}
                typeOptions={typeOptions}
                draft={draftFilters}
                onChange={setDraftFilters}
                onApply={applyFilters}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </section>

            <section className={`${PRODUCT_CATALOG_PAGE_X} pb-12`} aria-label={ui.catalogTitle}>
              {filtered.length === 0 ? (
                <p className="rounded-xl bg-white px-6 py-10 text-center text-sm text-secondary/75 shadow-[0_8px_32px_-24px_rgba(15,22,36,0.1)] ring-1 ring-ink/[0.06]">
                  {ui.noResults}
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product) => {
                    const specFlow = product.specFlow.trim();
                    const specPressure = product.specPressure.trim();
                    const showSpecs =
                      (specFlow.length > 0 && specFlow !== "—") ||
                      (specPressure.length > 0 && specPressure !== "—");

                    return (
                    <article
                      key={product.id}
                      className="group flex min-h-0 flex-col rounded-2xl bg-white p-5 shadow-[0_8px_32px_-24px_rgba(15,22,36,0.1)] transition duration-300 hover:shadow-[0_16px_48px_-28px_rgba(15,22,36,0.14)] ring-1 ring-ink/[0.06] hover:bg-[#fafaf6]"
                    >
                      {product.comingSoon ? (
                        <div
                          className="relative mb-4 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl ring-1 ring-inset ring-ink/[0.06]"
                          style={{ backgroundColor: PRODUCT_STANDARD_MEDIA_BG }}
                          aria-hidden
                        >
                          <span className="absolute left-3 top-3 rounded-full bg-ink px-2 py-0.5 font-eurostile text-[10px] font-bold tabular-nums text-white">
                            {product.number}
                          </span>
                          <span className="rounded-full bg-white/80 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-secondary/55 ring-1 ring-ink/[0.06]">
                            {ui.comingSoon}
                          </span>
                        </div>
                      ) : (
                        <ProductCatalogProductMedia src={product.image} alt={product.name}>
                          <span
                            className="absolute left-3 top-3 rounded-full bg-ink px-2 py-0.5 font-eurostile text-[10px] font-bold tabular-nums tracking-wide text-white"
                            aria-label={`${ui.productNo} ${product.number}`}
                          >
                            {product.number}
                          </span>
                        </ProductCatalogProductMedia>
                      )}

                      <div className="flex min-w-0 items-start gap-2.5">
                        <span className="shrink-0 font-eurostile text-base font-bold tabular-nums leading-tight text-primary">
                          {product.number}
                        </span>
                        <h2 className="product-card-clamp-2 min-w-0 flex-1 font-eurostile text-lg font-bold leading-snug tracking-tight text-ink">
                          {product.name}
                        </h2>
                      </div>
                      <p className="mt-1 truncate text-sm font-semibold text-primary">{product.type}</p>
                      {product.description ? (
                        <p className="product-card-clamp-3 mt-3 min-h-0 text-xs leading-relaxed text-secondary/75">
                          {product.description}
                        </p>
                      ) : (
                        <div className="mt-3" />
                      )}

                      {showSpecs ? (
                        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-ink/[0.08] ring-1 ring-ink/[0.06]">
                          <div className="min-w-0 bg-sand-100/90 px-3 py-2.5">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-secondary/50">{ui.specFlow}</p>
                            <p className="mt-1 text-xs font-bold leading-snug text-ink">{specFlow || "—"}</p>
                          </div>
                          <div className="min-w-0 bg-sand-100/90 px-3 py-2.5">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-secondary/50">
                              {ui.specPressure}
                            </p>
                            <p className="mt-1 text-xs font-bold leading-snug text-ink">{specPressure || "—"}</p>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-auto flex flex-col gap-2 pt-5">
                        <a
                          href={data.perfectusHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[2.5rem] items-center justify-center rounded-xl bg-primary px-4 text-center text-[11px] font-black uppercase text-white shadow-[0_8px_20px_-12px_rgba(239,95,23,0.5)] transition hover:brightness-110"
                        >
                          {ui.perfectusCta}
                        </a>
                        {product.href ? (
                          <Link
                            href={product.href}
                            className="inline-flex items-center justify-center gap-1 text-center text-[11px] font-bold text-primary hover:underline"
                          >
                            {ui.technicalDetails}
                            <IconChevronRight className="h-3 w-3" />
                          </Link>
                        ) : (
                          <span className="text-center text-[11px] font-bold text-secondary/40">{ui.comingSoon}</span>
                        )}
                      </div>
                    </article>
                    );
                  })}
                </div>
              )}
            </section>

            <section className={`${PRODUCT_CATALOG_PAGE_X}`} aria-labelledby="product-catalog-tech-library">
              <div className="rounded-2xl bg-sand-100 p-5 sm:p-8">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 id="product-catalog-tech-library" className="text-xl font-black uppercase tracking-tight text-ink">
                      {ui.techLibrary}
                    </h2>
                    <div className="mt-1.5 h-1 w-12 bg-primary" />
                  </div>
                  <Link href={data.technicalCenterHref} className="text-xs font-bold text-primary hover:underline">
                    {ui.viewAll}
                  </Link>
                </div>

                <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                  <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-[0_8px_32px_-24px_rgba(15,22,36,0.12)] ring-1 ring-ink/[0.06] sm:p-5">
                    <p className="mb-4 border-b border-ink/[0.06] pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/55">
                      {ui.catalogsTitle}
                    </p>
                    <ul className="space-y-3">
                      {data.catalogs.map((doc) => (
                        <li key={doc.id}>
                          <Link
                            href={doc.href}
                            className="group flex min-h-[4.75rem] items-center gap-4 rounded-xl bg-sand-100/80 p-4 transition hover:bg-sand-100"
                          >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#131B2E] to-[#00386B] text-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.35)]">
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold text-ink">{doc.title}</span>
                              <span className="mt-0.5 block text-[10px] text-secondary/55">{doc.meta}</span>
                            </span>
                            <IconDownload className="h-4 w-4 shrink-0 text-primary opacity-60 transition group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-[0_8px_32px_-24px_rgba(15,22,36,0.12)] ring-1 ring-ink/[0.06] sm:p-5">
                    <p className="mb-4 border-b border-ink/[0.06] pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/55">
                      {ui.guidesTitle}
                    </p>
                    <ul className="space-y-3">
                      {data.guides.map((doc) => (
                        <li key={doc.id}>
                          <Link
                            href={doc.href}
                            className="group flex min-h-[4.75rem] items-center justify-between gap-3 rounded-xl bg-sand-100/80 p-4 transition hover:bg-sand-100"
                          >
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink">{doc.title}</span>
                              <span className="text-[10px] text-secondary/50">{doc.meta}</span>
                            </span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <IconDownload className="h-3.5 w-3.5" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <ProductCatalogMobileDrawer
        categories={data.categories}
        ui={ui}
        locale={locale}
        open={mobileNav}
        onClose={closeMobileNav}
      />
    </div>
  );
}
