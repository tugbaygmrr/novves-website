"use client";

import * as React from "react";
import { useUiStore } from "@/lib/panel/stores/ui-store";
import { Toaster } from "./ui/toaster";

/**
 * Panelin en dış sarmalayıcısı: aktif temayı `.panel-shell` üzerinde uygular
 * ve global Toaster'ı monte eder. Tüm panel sayfaları bunun içinde render olur.
 */
export function PanelProviders({ children }: { children: React.ReactNode }) {
  const theme = useUiStore((s) => s.theme);
  return (
    <div className="panel-shell min-h-dvh" data-panel-theme={theme} suppressHydrationWarning>
      {children}
      <Toaster />
    </div>
  );
}
