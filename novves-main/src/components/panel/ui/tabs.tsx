"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/panel/cn";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  /** Animasyonlu vurgu için benzersiz layoutId. */
  layoutId?: string;
}

export function Tabs({ items, value, onValueChange, className, layoutId = "panel-tab" }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-panel-border bg-panel-surface-2 p-1",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors [&_svg]:h-4 [&_svg]:w-4",
              active ? "text-panel-fg" : "text-panel-fg-muted hover:text-panel-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-lg bg-panel-surface panel-shadow-sm"
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {Icon && <Icon />}
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
