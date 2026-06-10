"use client";

import * as React from "react";
import { cn } from "@/lib/panel/cn";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-9 w-full rounded-lg border border-panel-border bg-panel-surface px-3 text-[13px] text-panel-fg shadow-sm transition-colors",
        "placeholder:text-panel-fg-subtle",
        "focus-visible:border-panel-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-panel-danger aria-[invalid=true]:ring-panel-danger/30",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
