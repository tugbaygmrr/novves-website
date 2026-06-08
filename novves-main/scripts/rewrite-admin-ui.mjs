#!/usr/bin/env node
/** Rewrite admin UI files with guaranteed UTF-8 Turkish (Unicode escapes only in source). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function w(rel, content) {
  fs.writeFileSync(path.join(ROOT, rel), content, "utf8");
  console.log("wrote", rel);
}

w(
  "src/components/admin/simple/page-grid.tsx",
  `"use client";

import type { AdminPageGroup } from "@/lib/admin/content-sections";
import { PAGE_GROUP_DESCRIPTIONS } from "@/lib/admin/page-group-meta";

export function PageGrid({
  group,
  onSelectSection,
}: {
  group: AdminPageGroup;
  onSelectSection: (sectionKey: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{group.label}</h2>
      <p className="mb-8 text-[15px] text-gray-500">
        {PAGE_GROUP_DESCRIPTIONS[group.file] ?? "D\u00fczenlemek istedi\u011finiz sayfay\u0131 se\u00e7in"}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.sections.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => onSelectSection(section.key)}
            className="group flex min-h-[120px] flex-col rounded-2xl border-2 border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:border-orange-300 hover:shadow-md active:scale-[0.98]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition-colors group-hover:bg-orange-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-[16px] font-bold text-gray-900">{section.label}</h3>
            <span className="mt-auto pt-3 text-[12px] font-medium text-orange-500">
              D\u00fczenle &rarr;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
`,
);

w(
  "src/components/admin/simple/section-list.tsx",
  `"use client";

import type { AdminPageGroup } from "@/lib/admin/content-sections";

export function SectionList({
  group,
  onSelect,
  onBack,
}: {
  group: AdminPageGroup;
  onSelect: (sectionKey: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex min-h-[44px] items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-orange-600"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Geri
      </button>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{group.label}</h2>
      <p className="mb-8 text-[15px] text-gray-500">D\u00fczenlemek istedi\u011finiz b\u00f6l\u00fcm\u00fc se\u00e7in</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {group.sections.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => onSelect(section.key)}
            className="flex min-h-[56px] items-center justify-between rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 text-left transition-all hover:border-orange-300 hover:bg-orange-50/30 active:scale-[0.99]"
          >
            <span className="text-[16px] font-semibold text-gray-800">{section.label}</span>
            <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
`,
);

// Patch corrupted lines in other files
const patches = [
  ["src/components/admin/simple/smart-fallback-form.tsx", [
    ["Tum alanlari goster (teknik)", "T\u00fcm alanlar\u0131 g\u00f6ster (teknik)"],
    ['&quot;Tum alanlari goster&quot; ile acabilirsiniz', '&quot;T\u00fcm alanlar\u0131 g\u00f6ster&quot; ile a\u00e7abilirsiniz'],
  ]],
  ["src/components/admin/simple/save-bar.tsx", [
    [/Siteyi G.r/, "Siteyi G\u00f6r"],
    [/Kaydedilmemi. de.i.iklikler/, "Kaydedilmemi\u015f de\u011fi\u015fiklikler"],
    [/De.i.iklikleri kaydetmek istedi.inize/, "De\u011fi\u015fiklikleri kaydetmek istedi\u011finize"],
  ]],
  ["src/components/admin/simple/locale-picker.tsx", [
    ["Turkce'den kopyala", "T\u00fcrk\u00e7e'den kopyala"],
    ["Kopyalaniyor...", "Kopyalan\u0131yor..."],
  ]],
  ["src/components/admin/admin-shell.tsx", "FULL"],
  ["src/components/admin/advanced/sidebar.tsx", [
    [/Geli.mi. Mod/, "Geli\u015fmi\u015f Mod"],
    [/B.l.m ara/, "B\u00f6l\u00fcm ara"],
    [/Y.netici/, "Y\u00f6netici"],
    [/title="[^"]*"/, 'title="\u00c7\u0131k\u0131\u015f"'],
  ]],
  ["src/components/admin/advanced/field-editor.tsx", [
    [/ \?e/, " \u00f6\u011fe"],
  ]],
  ["src/app/novves-panel/dashboard/page.tsx", [
    [/Ana Menu/, "Ana Men\u00fc"],
    [/Yedekleme hatasi/, "Yedekleme hatas\u0131"],
  ]],
];

w(
  "src/components/admin/admin-shell.tsx",
  `"use client";

import type { ReactNode } from "react";
import { LocalePicker } from "./simple/locale-picker";

export type AdminMode = "simple" | "advanced";

export function AdminShell({
  mode,
  onModeChange,
  username,
  locale,
  onLocaleChange,
  onCopyFromTr,
  copying,
  hideLocale,
  breadcrumb,
  pageTabs,
  onLogout,
  children,
  headerExtra,
}: {
  mode: AdminMode;
  onModeChange: (mode: AdminMode) => void;
  username: string;
  locale: string;
  onLocaleChange: (locale: string) => void;
  onCopyFromTr?: () => void;
  copying?: boolean;
  hideLocale?: boolean;
  breadcrumb?: ReactNode;
  pageTabs?: {
    items: { id: string; label: string }[];
    activeId: string;
    onSelect: (id: string) => void;
  };
  onLogout: () => void;
  children: ReactNode;
  headerExtra?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/images/novves-icon.svg" alt="" className="h-9 w-9" />
            <div>
              <h1 className="text-[15px] font-bold text-gray-900">NOVVES \u0130\u00e7erik Paneli</h1>
              <p className="text-[11px] text-gray-400">Ho\u015f geldin, {username}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => onModeChange("simple")}
                className={\`rounded-lg px-4 py-2 text-[13px] font-semibold transition-all \${
                  mode === "simple" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }\`}
              >
                Basit
              </button>
              <button
                type="button"
                onClick={() => onModeChange("advanced")}
                className={\`rounded-lg px-4 py-2 text-[13px] font-semibold transition-all \${
                  mode === "advanced" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }\`}
              >
                Geli\u015fmi\u015f
              </button>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              \u00c7\u0131k\u0131\u015f
            </button>
          </div>
        </div>

        {pageTabs && (
          <div className="border-t border-gray-100 bg-white px-4 sm:px-6">
            <div className="mx-auto max-w-6xl overflow-x-auto">
              <div className="flex min-w-max gap-1 py-2.5">
                {pageTabs.items.map((tab) => {
                  const active = pageTabs.activeId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => pageTabs.onSelect(tab.id)}
                      className={\`shrink-0 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all \${
                        active
                          ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                      }\`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {(breadcrumb || !hideLocale || headerExtra) && (
          <div className="border-t border-gray-100 bg-white px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
              {breadcrumb && <div className="text-[14px] text-gray-600">{breadcrumb}</div>}
              <div className="flex flex-wrap items-center gap-4">
                {!hideLocale && (
                  <LocalePicker
                    locale={locale}
                    onChange={onLocaleChange}
                    onCopyFromTr={onCopyFromTr}
                    copying={copying}
                  />
                )}
                {headerExtra}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
`,
);

for (const [rel, reps] of patches) {
  if (reps === "FULL") continue;
  const file = path.join(ROOT, rel);
  let text = fs.readFileSync(file, "utf8");
  for (const [pat, rep] of reps) {
    text = typeof pat === "string" ? text.split(pat).join(rep) : text.replace(pat, rep);
  }
  fs.writeFileSync(file, text, "utf8");
  console.log("patched", rel);
}

// verify
const pg = fs.readFileSync(path.join(ROOT, "src/components/admin/simple/page-grid.tsx"), "utf8");
if (!pg.includes("onSelectSection")) throw new Error("page-grid verify fail");
console.log("verify OK: tabbed section grid");
