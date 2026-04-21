"use client";

import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import type { Reference } from "@/data/references";

type FilterOption = { value: string; label: string };
type ViewMode = "grid" | "country";

type ReferanslarDict = {
  searchPlaceholder: string; allCountries: string; allClasses: string;
  gridViewLabel: string; countryViewLabel: string; clear: string;
  project: string; noResults: string; noResultsHint: string;
  showMore: string; viewDetails: string; usedProducts: string;
};

export function ReferanslarClient({
  references, countryOptions, classOptions, dict,
}: {
  references: Reference[]; countryOptions: FilterOption[]; classOptions: FilterOption[]; dict: ReferanslarDict;
}) {
  const [country, setCountry] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedRef, setSelectedRef] = useState<Reference | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    return references.filter((r) => {
      if (country && r.country !== country) return false;
      if (classFilter && r.classKey !== classFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return r.title.toLowerCase().includes(q) || r.countryName.toLowerCase().includes(q) || r.className.toLowerCase().includes(q) || r.productNames.some((p) => p.toLowerCase().includes(q));
      }
      return true;
    });
  }, [references, country, classFilter, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const groupedByCountry = useMemo(() => {
    const map = new Map<string, { name: string; refs: Reference[] }>();
    for (const r of filtered) { const existing = map.get(r.country); if (existing) existing.refs.push(r); else map.set(r.country, { name: r.countryName, refs: [r] }); }
    return Array.from(map.values()).sort((a, b) => b.refs.length - a.refs.length);
  }, [filtered]);

  const resetFilters = useCallback(() => { setCountry(""); setClassFilter(""); setSearch(""); setVisibleCount(20); }, []);
  const hasActiveFilter = country || classFilter || search;

  return (
    <>
      <section className="sticky top-20 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 py-4">
            <div className="relative min-w-[220px] flex-1">
              <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/25" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setVisibleCount(20); }} placeholder={dict.searchPlaceholder} className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-secondary outline-none transition-all duration-200 placeholder:text-secondary/25 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10" />
            </div>
            <select value={country} onChange={(e) => { setCountry(e.target.value); setVisibleCount(20); }} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-secondary outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10">
              <option value="">{dict.allCountries}</option>
              {countryOptions.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </select>
            <select value={classFilter} onChange={(e) => { setClassFilter(e.target.value); setVisibleCount(20); }} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-secondary outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10">
              <option value="">{dict.allClasses}</option>
              {classOptions.map((o) => (<option key={o.value + o.label} value={o.value}>{o.label}</option>))}
            </select>
            <div className="flex overflow-hidden rounded-lg border border-gray-200">
              <button type="button" onClick={() => setViewMode("grid")} className={`flex h-[38px] w-[38px] items-center justify-center transition-all duration-200 ${viewMode === "grid" ? "bg-dark text-white" : "bg-gray-50 text-secondary/40 hover:text-secondary"}`} aria-label={dict.gridViewLabel}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
              </button>
              <button type="button" onClick={() => setViewMode("country")} className={`flex h-[38px] w-[38px] items-center justify-center border-l border-gray-200 transition-all duration-200 ${viewMode === "country" ? "bg-dark text-white" : "bg-gray-50 text-secondary/40 hover:text-secondary"}`} aria-label={dict.countryViewLabel}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              {hasActiveFilter && (
                <button type="button" onClick={resetFilters} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-secondary/60 transition-all duration-200 hover:border-primary/30 hover:text-primary">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  {dict.clear}
                </button>
              )}
              <span className="whitespace-nowrap rounded-lg bg-secondary/5 px-3 py-1.5 text-xs font-semibold text-secondary/50">{filtered.length} {dict.project}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100"><svg className="h-7 w-7 text-secondary/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg></div>
              <p className="mt-4 text-sm font-medium text-secondary/40">{dict.noResults}</p>
              <p className="mt-1 text-xs text-secondary/25">{dict.noResultsHint}</p>
            </div>
          ) : viewMode === "grid" ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((ref) => (<ReferenceCard key={ref.id} ref_={ref} onSelect={setSelectedRef} dict={dict} />))}
              </div>
              {hasMore && (
                <div className="mt-14 text-center">
                  <button type="button" onClick={() => setVisibleCount((c) => c + 20)} className="group inline-flex items-center gap-2.5 rounded-xl bg-dark px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary hover:shadow-lg">
                    {dict.showMore}
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/60">{filtered.length - visibleCount}</span>
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-10">
              {groupedByCountry.map((group) => (
                <div key={group.name}>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark text-white"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg></span>
                      <div><h3 className="text-base font-bold text-dark">{group.name}</h3><p className="text-[11px] text-secondary/40">{group.refs.length} {dict.project}</p></div>
                    </div>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.refs.map((ref) => (<ReferenceCard key={ref.id} ref_={ref} onSelect={setSelectedRef} compact dict={dict} />))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedRef && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/70 p-4 backdrop-blur-sm" onClick={() => setSelectedRef(null)}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/5" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setSelectedRef(null)} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-dark/60 text-white backdrop-blur-sm transition-all duration-200 hover:bg-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative h-72 w-full sm:h-80">
              <Image src={`/images/references/${selectedRef.image}`} alt={selectedRef.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold text-white">{selectedRef.countryName}</span>
                  <span className="rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">{selectedRef.className}</span>
                  <span className="rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">{selectedRef.year}</span>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-dark sm:text-2xl">{selectedRef.title}</h2>
              <p className="mt-4 text-sm leading-7 text-secondary/70">{selectedRef.description}</p>
              <div className="mt-6 rounded-xl bg-gray-50 p-5">
                <h4 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-secondary/40"><span className="h-px w-3 bg-primary" />{dict.usedProducts}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedRef.productNames.map((p, i) => (<span key={i} className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-secondary/70">{p}</span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ReferenceCard({ ref_, onSelect, compact, dict }: { ref_: Reference; onSelect: (r: Reference) => void; compact?: boolean; dict: ReferanslarDict }) {
  return (
    <button type="button" onClick={() => onSelect(ref_)} className="group relative overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-gray-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/20">
      <div className={`relative w-full overflow-hidden ${compact ? "h-40" : "h-52"}`}>
        <Image src={`/images/references/${ref_.image}`} alt={ref_.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-3 top-3 rounded-md bg-dark/70 px-2 py-1 text-[10px] font-bold text-white/80 backdrop-blur-sm">{ref_.year}</div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-semibold text-dark backdrop-blur-sm">
            {dict.viewDetails}
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </span>
        </div>
      </div>
      <div className={compact ? "p-4" : "p-5"}>
        <h3 className="text-[13px] font-bold leading-snug text-dark line-clamp-2">{ref_.title}</h3>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {!compact && (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/8 px-2 py-0.5 text-[11px] font-semibold text-primary">
              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              {ref_.countryName}
            </span>
          )}
          <span className="rounded-md bg-secondary/5 px-2 py-0.5 text-[11px] font-medium text-secondary/60">{ref_.className}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
    </button>
  );
}
