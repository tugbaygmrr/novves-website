"use client";

import * as React from "react";
import { cn } from "@/lib/panel/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 4, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn(
      "w-full rounded-lg border border-panel-border bg-panel-surface px-3 py-2 text-[13px] leading-relaxed text-panel-fg shadow-sm transition-colors panel-scroll",
      "placeholder:text-panel-fg-subtle",
      "focus-visible:border-panel-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent/35",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-[invalid=true]:border-panel-danger aria-[invalid=true]:ring-panel-danger/30",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
