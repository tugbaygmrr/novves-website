"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/panel/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold leading-tight [&_svg]:h-3 [&_svg]:w-3",
  {
    variants: {
      variant: {
        neutral: "bg-panel-surface-2 text-panel-fg-muted border border-panel-border",
        accent: "bg-panel-accent-soft text-panel-accent",
        success: "bg-panel-success-soft text-panel-success",
        warning: "bg-panel-warning-soft text-panel-warning",
        danger: "bg-panel-danger-soft text-panel-danger",
        info: "bg-panel-info-soft text-panel-info",
        outline: "border border-panel-border-strong text-panel-fg-muted",
      },
      dot: { true: "pl-1.5", false: "" },
    },
    defaultVariants: { variant: "neutral", dot: false },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, dot }), className)} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
