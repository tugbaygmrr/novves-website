"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/panel/cn";

/** Native <select> tabanlı, stillenmiş seçim alanı (erişilebilir + sağlam). */
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        "h-9 w-full appearance-none rounded-lg border border-panel-border bg-panel-surface pl-3 pr-9 text-[13px] text-panel-fg shadow-sm transition-colors",
        "focus-visible:border-panel-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panel-fg-subtle"
      aria-hidden
    />
  </div>
));
Select.displayName = "Select";
