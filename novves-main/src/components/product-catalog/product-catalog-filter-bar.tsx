"use client";

import type { ProductCatalogUi } from "@/lib/product-catalog-ui";

function IconSearch({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3-3" />
    </svg>
  );
}

function IconFilter({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5h18M6 12h12M9 19h6"
      />
    </svg>
  );
}

const labelClass = "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-secondary/55";
const fieldClass =
  "w-full rounded-lg border border-ink/10 bg-white px-3 py-2.5 text-sm font-medium text-ink placeholder:text-secondary/45 transition focus:border-primary/35 focus:outline-none focus:ring-2 focus:ring-primary/15";

export type ProductCatalogFilterValues = {
  series: string;
  query: string;
  productType: string;
  modelMin: string;
  modelMax: string;
};

export const EMPTY_PRODUCT_CATALOG_FILTERS: ProductCatalogFilterValues = {
  series: "",
  query: "",
  productType: "",
  modelMin: "",
  modelMax: "",
};

export function ProductCatalogFilterBar({
  ui,
  seriesOptions,
  typeOptions,
  draft,
  onChange,
  onApply,
  onReset,
  hasActiveFilters,
}: {
  ui: ProductCatalogUi;
  seriesOptions: string[];
  typeOptions: string[];
  draft: ProductCatalogFilterValues;
  onChange: (next: ProductCatalogFilterValues) => void;
  onApply: () => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  const patch = (partial: Partial<ProductCatalogFilterValues>) => onChange({ ...draft, ...partial });

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_8px_32px_-24px_rgba(15,22,36,0.12)] ring-1 ring-ink/[0.06] sm:p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:items-end xl:gap-3">
        <label className="xl:col-span-4">
          <span className={labelClass}>{ui.filterSeries}</span>
          <select
            value={draft.series}
            onChange={(e) => patch({ series: e.target.value })}
            className={`${fieldClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.65rem_center] bg-no-repeat pr-9`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2345464d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="">{ui.filterAllSeriesModels}</option>
            {seriesOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="xl:col-span-5">
          <span className={labelClass}>{ui.filterDescription}</span>
          <div className="relative">
            <input
              type="search"
              value={draft.query}
              onChange={(e) => patch({ query: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") onApply();
              }}
              placeholder={ui.searchPlaceholderShort}
              className={`${fieldClass} pr-10`}
            />
            <IconSearch className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/40" />
          </div>
        </label>

        <div className="xl:col-span-3">
          <span className={labelClass}>{ui.filterModelRange}</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={draft.modelMin}
              onChange={(e) => patch({ modelMin: e.target.value })}
              placeholder={ui.filterMin}
              className={`${fieldClass} min-w-0 text-center`}
              aria-label={ui.filterMin}
            />
            <span className="shrink-0 text-sm font-medium text-secondary/45" aria-hidden>
              –
            </span>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              value={draft.modelMax}
              onChange={(e) => patch({ modelMax: e.target.value })}
              placeholder={ui.filterMax}
              className={`${fieldClass} min-w-0 text-center`}
              aria-label={ui.filterMax}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-end">
        <label className="min-w-0 flex-1">
          <span className={labelClass}>{ui.filterProductType}</span>
          <select
            value={draft.productType}
            onChange={(e) => patch({ productType: e.target.value })}
            className={`${fieldClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2345464d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="">{ui.filterAny}</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <div className="flex shrink-0 items-center gap-2 sm:pb-0.5">
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg px-3 py-2.5 text-xs font-bold text-secondary/60 transition hover:bg-sand-100 hover:text-ink"
            >
              {ui.filterReset}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onApply}
            className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-xs font-black uppercase tracking-wide text-white shadow-[0_10px_24px_-12px_rgba(239,95,23,0.55)] transition hover:brightness-110 sm:w-auto"
          >
            <IconFilter className="h-4 w-4" />
            {ui.filterApply}
          </button>
        </div>
      </div>
    </div>
  );
}
