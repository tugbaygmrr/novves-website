"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/panel/cn";

const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[13px] font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent/45 disabled:pointer-events-none disabled:opacity-50 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-panel-accent text-panel-accent-fg shadow-sm hover:brightness-[1.06] active:brightness-95",
        secondary:
          "border border-panel-border bg-panel-surface text-panel-fg hover:bg-panel-surface-2",
        outline:
          "border border-panel-border-strong bg-transparent text-panel-fg hover:bg-panel-surface-2",
        ghost: "bg-transparent text-panel-fg-muted hover:bg-panel-surface-2 hover:text-panel-fg",
        subtle: "bg-panel-surface-2 text-panel-fg hover:bg-panel-border",
        danger: "bg-panel-danger text-white hover:brightness-[1.06] active:brightness-95",
        "danger-soft": "bg-panel-danger-soft text-panel-danger hover:brightness-95",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-11 px-5 text-[14px]",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export { buttonVariants };
