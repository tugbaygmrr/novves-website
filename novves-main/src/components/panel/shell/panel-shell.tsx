"use client";

import * as React from "react";
import { cn } from "@/lib/panel/cn";
import { useUiStore } from "@/lib/panel/stores/ui-store";
import type { AuthedUser } from "@/lib/admin/rbac";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { CommandPalette } from "./command-palette";

export function PanelShell({
  user,
  children,
}: {
  user: AuthedUser;
  children: React.ReactNode;
}) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <div className="min-h-dvh bg-panel-bg text-panel-fg">
      <Sidebar role={user.role} />
      <CommandPalette role={user.role} />

      <div className={cn("transition-all duration-200 ease-out", collapsed ? "md:pl-[76px]" : "md:pl-64")}>
        <Navbar user={user} />
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
