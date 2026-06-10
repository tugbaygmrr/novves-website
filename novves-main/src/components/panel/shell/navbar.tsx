"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, Sun, Moon, LogOut, User, Monitor } from "lucide-react";
import { useUiStore } from "@/lib/panel/stores/ui-store";
import { ROLE_LABELS, type AuthedUser } from "@/lib/admin/rbac";
import { Kbd } from "../ui/kbd";
import { Tooltip } from "../ui/tooltip";
import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from "../ui/dropdown";
import { Breadcrumb } from "./breadcrumb";

export function Navbar({ user }: { user: AuthedUser }) {
  const router = useRouter();
  const setMobileOpen = useUiStore((s) => s.setMobileNavOpen);
  const setCommandOpen = useUiStore((s) => s.setCommandOpen);
  const theme = useUiStore((s) => s.theme);
  const toggleTheme = useUiStore((s) => s.toggleTheme);

  async function logout() {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.replace("/novves-panel");
    }
  }

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-panel-border bg-panel-surface/85 px-4 backdrop-blur-md sm:px-6">
      {/* Mobil menü */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="rounded-lg p-2 text-panel-fg-muted transition-colors hover:bg-panel-surface-2 md:hidden"
        aria-label="Menüyü aç"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden min-w-0 md:block">
        <Breadcrumb />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {/* Arama / Command palette */}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="hidden items-center gap-2 rounded-lg border border-panel-border bg-panel-surface-2 py-1.5 pl-2.5 pr-2 text-[13px] text-panel-fg-subtle transition-colors hover:border-panel-border-strong hover:text-panel-fg-muted sm:flex"
        >
          <Search className="h-4 w-4" />
          <span className="pr-6">Ara…</span>
          <Kbd>⌘K</Kbd>
        </button>
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="rounded-lg p-2 text-panel-fg-muted transition-colors hover:bg-panel-surface-2 sm:hidden"
          aria-label="Ara"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Tema */}
        <Tooltip content={theme === "light" ? "Koyu tema" : "Açık tema"} side="bottom">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-panel-fg-muted transition-colors hover:bg-panel-surface-2"
            aria-label="Temayı değiştir"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </Tooltip>

        {/* Kullanıcı menüsü */}
        <Dropdown
          align="end"
          trigger={
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-1.5 transition-colors hover:bg-panel-surface-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-panel-accent-soft text-[12px] font-bold text-panel-accent">
                {initials}
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[13px] font-semibold text-panel-fg">{user.username}</span>
                <span className="block text-[11px] text-panel-fg-subtle">
                  {ROLE_LABELS[user.role]}
                </span>
              </span>
            </button>
          }
        >
          <DropdownLabel>{user.username}</DropdownLabel>
          <DropdownItem icon={User}>Profil</DropdownItem>
          <DropdownItem icon={theme === "light" ? Moon : Sun} onClick={toggleTheme} keepOpen>
            {theme === "light" ? "Koyu tema" : "Açık tema"}
          </DropdownItem>
          <DropdownItem icon={Monitor}>Sistem tercihleri</DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={LogOut} variant="danger" onClick={logout}>
            Çıkış Yap
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
