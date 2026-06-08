"use client";

import { localeUi, locales } from "@/i18n/config";
import type { AdminPageGroup } from "@/lib/admin/content-sections";

const LOCALES = locales.map((code) => ({
  code,
  label: localeUi[code].label,
  flag: localeUi[code].flagEmoji,
}));

export function AdvancedSidebar({
  groups,
  activeFile,
  activeSection,
  locale,
  expandedGroup,
  sidebarSearch,
  username,
  isPartnerRecords,
  onLocaleChange,
  onSearchChange,
  onExpandGroup,
  onSelectSection,
  onLogout,
}: {
  groups: AdminPageGroup[];
  activeFile: string;
  activeSection: string;
  locale: string;
  expandedGroup: string;
  sidebarSearch: string;
  username: string;
  isPartnerRecords: boolean;
  onLocaleChange: (locale: string) => void;
  onSearchChange: (q: string) => void;
  onExpandGroup: (file: string) => void;
  onSelectSection: (file: string, section: string) => void;
  onLogout: () => void;
}) {
  const filteredGroups = groups
    .map((g) => ({
      ...g,
      sections: sidebarSearch
        ? g.sections.filter((s) => s.label.toLowerCase().includes(sidebarSearch.toLowerCase()))
        : g.sections,
    }))
    .filter((g) =>
      sidebarSearch
        ? g.sections.length > 0 || g.label.toLowerCase().includes(sidebarSearch.toLowerCase())
        : true
    );

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-[280px] flex-col border-r border-gray-200/80 bg-white max-md:hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <img src="/images/novves-icon.svg" alt="Novves" className="h-8 w-8" />
          <div>
            <h1 className="text-[13px] font-bold text-gray-900">NOVVES CMS</h1>
            <p className="text-[10px] text-gray-400">Gelişmiş Mod</p>
          </div>
        </div>
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">v3</span>
      </div>

      {!isPartnerRecords && (
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => onLocaleChange(l.code)}
                title={l.label}
                className={`flex min-w-[3rem] flex-1 basis-[30%] items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] font-semibold transition-all sm:py-2 sm:text-[11px] ${
                  locale === l.code
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
              >
                <span className="text-[13px]">{l.flag}</span>
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-b border-gray-100 px-4 py-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Bölüm ara..."
            value={sidebarSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-100 bg-gray-50/50 py-2 pl-9 pr-3 text-[12px] text-gray-700 placeholder-gray-300 outline-none focus:border-orange-300 focus:bg-white focus:ring-1 focus:ring-orange-200"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {filteredGroups.map((group) => {
          const isExpanded = expandedGroup === group.file || !!sidebarSearch;
          const isActiveGroup = activeFile === group.file;
          return (
            <div key={group.file} className="mb-1">
              <button
                type="button"
                onClick={() => onExpandGroup(group.file)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all ${
                  isActiveGroup ? "bg-orange-50 text-orange-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <svg className={`h-4 w-4 shrink-0 ${isActiveGroup ? "text-orange-500" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={group.icon} />
                </svg>
                <span className="flex-1 text-[12px] font-semibold">{group.label}</span>
                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-400">
                  {group.sections.length}
                </span>
              </button>
              {isExpanded && (
                <div className="ml-5 mt-0.5 space-y-px border-l border-gray-100 pl-3">
                  {group.sections.map((s) => {
                    const isActive = activeFile === group.file && activeSection === s.key;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => onSelectSection(group.file, s.key)}
                        className={`block w-full rounded-lg px-3 py-1.5 text-left text-[11px] transition-all ${
                          isActive
                            ? "bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20"
                            : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-[11px] font-bold text-white">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-700">{username}</p>
              <p className="text-[10px] text-gray-300">Yönetici</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg p-2 text-gray-300 hover:bg-red-50 hover:text-red-500"
            title="Çıkış"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
