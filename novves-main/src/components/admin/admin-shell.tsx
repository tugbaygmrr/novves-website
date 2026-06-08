"use client";

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
              <h1 className="text-[15px] font-bold text-gray-900">NOVVES İçerik Paneli</h1>
              <p className="text-[11px] text-gray-400">Hoş geldin, {username}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => onModeChange("simple")}
                className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition-all ${
                  mode === "simple" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Basit
              </button>
              <button
                type="button"
                onClick={() => onModeChange("advanced")}
                className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition-all ${
                  mode === "advanced" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Gelişmiş
              </button>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Çıkış
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
                      className={`shrink-0 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
                        active
                          ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                      }`}
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
