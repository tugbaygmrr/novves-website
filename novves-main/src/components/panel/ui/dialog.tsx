"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/panel/cn";
import { useUiStore } from "@/lib/panel/stores/ui-store";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** İçerik genişliği. */
  size?: "sm" | "md" | "lg" | "xl";
  /** Kapatma butonunu gizle. */
  hideClose?: boolean;
  className?: string;
}

const SIZES: Record<NonNullable<DialogProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  hideClose,
  className,
}: DialogProps) {
  const theme = useUiStore((s) => s.theme);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="panel-shell fixed inset-0 z-[90] flex items-center justify-center p-4"
          data-panel-theme={theme}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={cn(
              "relative w-full overflow-hidden rounded-2xl border border-panel-border bg-panel-elevated panel-shadow-lg",
              SIZES[size],
              className,
            )}
          >
            {(title || !hideClose) && (
              <div className="flex items-start justify-between gap-4 p-5 pb-0">
                <div className="min-w-0">
                  {title && (
                    <h2 className="text-[16px] font-semibold tracking-tight text-panel-fg">{title}</h2>
                  )}
                  {description && (
                    <p className="mt-1 text-[13px] text-panel-fg-muted">{description}</p>
                  )}
                </div>
                {!hideClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="-mr-1 -mt-1 shrink-0 rounded-lg p-1.5 text-panel-fg-subtle transition-colors hover:bg-panel-surface-2 hover:text-panel-fg"
                    aria-label="Kapat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            {children && <div className="p-5">{children}</div>}
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-panel-border bg-panel-surface-2/50 px-5 py-3.5">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
