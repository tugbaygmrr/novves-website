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
    <div className="group/panel relative overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_30px_70px_-42px_rgba(15,22,36,0.28),0_8px_24px_-18px_rgba(15,22,36,0.18)] ring-1 ring-black/[0.02]">
      {/* Üst ince marka çizgisi */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70"
        aria-hidden
      />

      <div className="flex flex-col lg:grid lg:min-h-[min(72vh,560px)] lg:grid-cols-[minmax(260px,320px)_1fr]">
        {/* Sol — ağaç / panel */}
        <aside className="relative flex max-h-[min(52vh,420px)] flex-col border-b border-ink/10 bg-gradient-to-b from-[#eef0f3] to-[#e8ebef] lg:max-h-none lg:border-b-0 lg:border-e lg:border-ink/10">
          <div className="flex items-center justify-between border-b border-ink/10 bg-[#e2e6ec]/85 px-4 py-3 backdrop-blur-sm">
            <p className="flex items-center gap-2 font-mono-eng text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_3px_rgba(239,95,23,0.12)]" />
              {treeTitle}
            </p>
            <span className="font-mono-eng text-[10px] font-bold tabular-nums text-ink/35">
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 py-3 [-webkit-overflow-scrolling:touch]">
            <ul className="relative space-y-1 ps-2">
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
                      className={`group relative flex w-full items-center gap-2 overflow-hidden rounded-lg py-2.5 pe-3 ps-6 text-start transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-white via-white to-white/85 shadow-[inset_3px_0_0_0,0_2px_8px_-4px_rgba(15,22,36,0.12)] shadow-primary ring-1 ring-ink/8"
                          : "hover:translate-x-0.5 hover:bg-white/70 hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {/* Tree branch (yatay çizgi) */}
                      <span
                        className={`absolute start-2.5 top-1/2 h-px w-2.5 -translate-y-1/2 rounded-full transition-colors ${
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

                      {/* İndeks numarası */}
                      <span
                        className={`shrink-0 font-mono-eng text-[10px] font-bold tabular-nums tracking-wider transition-colors ${
                          isActive ? "text-primary" : "text-ink/30 group-hover:text-ink/55"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Başlık */}
                      <span
                        className={`min-w-0 flex-1 truncate text-[13px] font-semibold leading-snug transition-colors ${
                          isActive ? "text-ink" : "text-secondary/80 group-hover:text-ink"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Sağ ok — aktifte sabit, hover'da kayar */}
                      <svg
                        className={`h-3 w-3 shrink-0 transition-all duration-200 ${
                          isActive
                            ? "translate-x-0 text-primary opacity-100"
                            : "-translate-x-1 text-ink/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Sağ — özet panel */}
        <div className="relative flex flex-col overflow-hidden bg-[#faf9f6] p-6 sm:p-8 lg:p-10">
          {/* Hafif dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(15,22,36,0.6) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          {/* Sağ üst köşe yumuşak parıltı */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.06] blur-2xl"
            style={{ background: "radial-gradient(circle, #ef5f17, transparent 70%)" }}
            aria-hidden
          />

          {/* Kategori chip */}
          <div className="relative mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_3px_rgba(239,95,23,0.12)]" />
            <span className="font-mono-eng text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary/70">
              {treeTitle}
            </span>
            <span className="font-mono-eng text-[10px] font-bold tabular-nums text-ink/40">
              · {String(items.findIndex((i) => i.key === active.key) + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
            </span>
          </div>

          <div className="relative">
            <h3 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-card">
              {active.name}
            </h3>
            <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-secondary/80">
              {active.description}
            </p>
          </div>

          {active.stats && active.stats.length > 0 ? (
            <dl className="relative mt-7 grid gap-3 sm:grid-cols-2">
              {active.stats.map((s) => (
                <div
                  key={`${active.key}-${s.label}`}
                  className="group/stat relative overflow-hidden rounded-xl border border-ink/8 bg-white/95 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(15,22,36,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_-10px_rgba(239,95,23,0.35)]"
                >
                  <span
                    className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60 transition-opacity group-hover/stat:opacity-100"
                    aria-hidden
                  />
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary/55">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-mono-eng text-lg font-bold tabular-nums text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="relative mt-auto pt-8">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={href}
                className="group/cta inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(239,95,23,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:bg-primary-deep hover:shadow-[0_14px_30px_-12px_rgba(239,95,23,0.7),inset_0_1px_0_rgba(255,255,255,0.18)]"
              >
                {openLabel}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="font-mono-eng text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary/45">
                / {basePath}/{active.slug}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
