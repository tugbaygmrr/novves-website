"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { HubTreeRow } from "@/lib/hub-tree-rows";

export type { HubTreeRow } from "@/lib/hub-tree-rows";

export function HubTreePanel({
  locale,
  basePath,
  items,
  treeTitle,
  openLabel,
}: {
  locale: string;
  basePath: string;
  items: HubTreeRow[];
  treeTitle: string;
  openLabel: string;
}) {
  const [activeKey, setActiveKey] = useState(items[0]?.key ?? "");

  useEffect(() => {
    if (items.length && !items.some((i) => i.key === activeKey)) {
      setActiveKey(items[0].key);
    }
  }, [items, activeKey]);

  const active = items.find((i) => i.key === activeKey) ?? items[0];
  if (!active) return null;

  const href = `/${locale}/${basePath}/${active.slug}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_22px_50px_-34px_rgba(15,22,36,0.22)]">
      <div className="flex flex-col lg:grid lg:min-h-[min(72vh,560px)] lg:grid-cols-[minmax(240px,300px)_1fr]">
        {/* Sol — ağaç / panel */}
        <aside className="flex max-h-[min(52vh,420px)] flex-col border-b border-ink/10 bg-[#eef0f3] lg:max-h-none lg:border-b-0 lg:border-e lg:border-ink/10">
          <div className="border-b border-ink/10 bg-[#e4e7ec]/90 px-4 py-3">
            <p className="font-mono-eng text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              {treeTitle}
            </p>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 py-2 [-webkit-overflow-scrolling:touch]">
            <ul className="relative space-y-0.5 ps-2">
              <span
                className="pointer-events-none absolute start-4 top-2 bottom-2 w-px bg-ink/12"
                aria-hidden
              />
              {items.map((item, index) => {
                const isActive = item.key === active.key;
                const isLast = index === items.length - 1;
                return (
                  <li key={item.key} className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveKey(item.key)}
                      className={`group flex w-full items-start gap-2 rounded-lg py-2.5 pe-2 ps-6 text-start transition-colors ${
                        isActive
                          ? "bg-white shadow-[inset_3px_0_0_0] shadow-primary ring-1 ring-ink/8"
                          : "hover:bg-white/70"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span
                        className={`absolute start-2.5 top-1/2 h-px w-2.5 -translate-y-1/2 rounded-full ${
                          isActive ? "bg-primary" : "bg-ink/20 group-hover:bg-ink/35"
                        }`}
                        aria-hidden
                      />
                      {!isLast ? (
                        <span
                          className="pointer-events-none absolute start-4 top-[calc(50%+6px)] bottom-0 w-px bg-ink/10"
                          aria-hidden
                        />
                      ) : null}
                      <span
                        className={`mt-0.5 shrink-0 font-mono-eng text-[10px] font-bold tabular-nums tracking-wider ${
                          isActive ? "text-primary" : "text-ink/30"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`min-w-0 text-[13px] font-semibold leading-snug ${
                          isActive ? "text-ink" : "text-secondary/80 group-hover:text-ink"
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Sağ — özet panel */}
        <div className="flex flex-col bg-[#faf9f6] p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none mb-4 hidden h-px w-16 bg-gradient-to-r from-primary/80 to-transparent sm:block" />
          <h3 className="text-balance text-xl font-bold tracking-tight text-ink sm:text-2xl">{active.name}</h3>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary/75">{active.description}</p>

          {active.stats && active.stats.length > 0 ? (
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {active.stats.map((s) => (
                <div
                  key={`${active.key}-${s.label}`}
                  className="rounded-xl border border-ink/8 bg-white/90 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary/50">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-mono-eng text-lg font-bold tabular-nums text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/18 transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/28"
            >
              {openLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
