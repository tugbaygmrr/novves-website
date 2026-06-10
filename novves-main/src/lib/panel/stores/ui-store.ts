"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PanelTheme = "light" | "dark";

interface UiState {
  /** Aktif tema (kalıcı). */
  theme: PanelTheme;
  /** Masaüstü sidebar daraltılmış mı (kalıcı). */
  sidebarCollapsed: boolean;
  /** Mobil drawer açık mı (kalıcı değil). */
  mobileNavOpen: boolean;
  /** Command palette (⌘K) açık mı. */
  commandOpen: boolean;

  setTheme: (t: PanelTheme) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  setMobileNavOpen: (v: boolean) => void;
  setCommandOpen: (v: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "light",
      sidebarCollapsed: false,
      mobileNavOpen: false,
      commandOpen: false,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
    }),
    {
      name: "novves-panel-ui",
      // Yalnızca kalıcı tercihler saklanır.
      partialize: (s) => ({ theme: s.theme, sidebarCollapsed: s.sidebarCollapsed }),
    },
  ),
);
