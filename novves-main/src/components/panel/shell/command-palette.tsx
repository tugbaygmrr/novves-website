"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/panel/cn";
import { useUiStore } from "@/lib/panel/stores/ui-store";
import { filterNavForRole } from "@/lib/panel/nav";
import type { Role } from "@/lib/admin/rbac";
import { Kbd } from "../ui/kbd";

export function CommandPalette({ role }: { role: Role }) {
  const router = useRouter();
  const open = useUiStore((s) => s.commandOpen);
  const setOpen = useUiStore((s) => s.setCommandOpen);
  const theme = useUiStore((s) => s.theme);

  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const items = React.useMemo(
    () => filterNavForRole(role).flatMap((g) => g.items.map((it) => ({ ...it, group: g.title }))),
    [role],
  );

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.group.toLowerCase().includes(q) ||
        it.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [items, query]);

  // ⌘K / Ctrl+K aç-kapat
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  React.useEffect(() => setActive(0), [query]);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router, setOpen],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="panel-shell fixed inset-0 z-[95] flex items-start justify-center p-4 pt-[12vh]"
          data-panel-theme={theme}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-panel-border bg-panel-elevated panel-shadow-lg"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 border-b border-panel-border px-4">
              <Search className="h-4 w-4 shrink-0 text-panel-fg-subtle" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Sayfa ara veya bir komut yaz…"
                className="h-12 w-full bg-transparent text-[14px] text-panel-fg outline-none placeholder:text-panel-fg-subtle"
              />
              <Kbd>ESC</Kbd>
            </div>

            <div className="panel-scroll max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-[13px] text-panel-fg-muted">
                  Sonuç bulunamadı.
                </p>
              ) : (
                results.map((it, i) => {
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.href}
                      type="button"
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(it.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] transition-colors",
                        i === active ? "bg-panel-surface-2 text-panel-fg" : "text-panel-fg-muted",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0 text-panel-fg-subtle" />
                      <span className="flex-1 font-medium">{it.label}</span>
                      <span className="text-[11px] text-panel-fg-subtle">{it.group}</span>
                      {i === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-panel-fg-subtle" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
