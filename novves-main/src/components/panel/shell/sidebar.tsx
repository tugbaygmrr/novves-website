"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/lib/panel/cn";
import { useUiStore } from "@/lib/panel/stores/ui-store";
import { filterNavForRole, type NavItem } from "@/lib/panel/nav";
import type { Role } from "@/lib/admin/rbac";
import { Tooltip } from "../ui/tooltip";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);
  const Icon = item.icon;

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
        collapsed && "justify-center px-0",
        active
          ? "bg-panel-sidebar-active text-panel-accent"
          : "text-panel-sidebar-fg/80 hover:bg-panel-surface-2 hover:text-panel-sidebar-fg",
      )}
    >
      {active && !collapsed && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-panel-accent" />
      )}
      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0",
          active ? "text-panel-accent" : "text-panel-sidebar-muted group-hover:text-panel-sidebar-fg",
        )}
      />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );

  return collapsed ? (
    <Tooltip content={item.label} side="right">
      {link}
    </Tooltip>
  ) : (
    link
  );
}

export function Sidebar({ role }: { role: Role }) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggle = useUiStore((s) => s.toggleSidebar);
  const mobileOpen = useUiStore((s) => s.mobileNavOpen);
  const setMobileOpen = useUiStore((s) => s.setMobileNavOpen);

  const groups = React.useMemo(() => filterNavForRole(role), [role]);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobil arka plan örtüsü */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-panel-sidebar-border bg-panel-sidebar transition-all duration-200 ease-out",
          collapsed ? "w-[76px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center gap-2.5 border-b border-panel-sidebar-border px-5",
            collapsed && "justify-center px-0",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/novves-icon.svg" alt="" className="h-8 w-8 shrink-0" />
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-[14px] font-bold tracking-tight text-panel-sidebar-fg">NOVVES</p>
              <p className="text-[10px] uppercase tracking-wider text-panel-sidebar-muted">
                İçerik Yönetimi
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={closeMobile}
            className="ml-auto rounded-lg p-1.5 text-panel-sidebar-muted hover:bg-panel-surface-2 md:hidden"
            aria-label="Menüyü kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigasyon */}
        <nav className="panel-scroll flex-1 space-y-5 overflow-y-auto px-3 py-5">
          {groups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-panel-sidebar-muted">
                  {group.title}
                </p>
              )}
              {collapsed && <div className="mx-3 mb-2 h-px bg-panel-sidebar-border first:hidden" />}
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavLink item={item} collapsed={collapsed} onNavigate={closeMobile} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Daralt/genişlet (yalnızca masaüstü) */}
        <div className="hidden shrink-0 border-t border-panel-sidebar-border p-3 md:block">
          <button
            type="button"
            onClick={toggle}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-panel-sidebar-muted transition-colors hover:bg-panel-surface-2 hover:text-panel-sidebar-fg",
              collapsed && "justify-center px-0",
            )}
            aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px]" />
            ) : (
              <>
                <PanelLeftClose className="h-[18px] w-[18px]" />
                <span>Daralt</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
