"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/panel/cn";
import { useToastStore, type ToastItem, type ToastVariant } from "@/lib/panel/stores/toast-store";

const ICONS: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const ACCENT: Record<ToastVariant, string> = {
  default: "text-panel-fg-muted",
  success: "text-panel-success",
  error: "text-panel-danger",
  warning: "text-panel-warning",
  info: "text-panel-info",
};

function ToastRow({ item }: { item: ToastItem }) {
  const dismiss = useToastStore((s) => s.dismiss);
  const Icon = ICONS[item.variant];

  React.useEffect(() => {
    const t = setTimeout(() => dismiss(item.id), item.duration);
    return () => clearTimeout(t);
  }, [item.id, item.duration, dismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className="pointer-events-auto flex w-80 items-start gap-3 rounded-xl border border-panel-border bg-panel-elevated p-3.5 panel-shadow-lg"
      role="status"
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", ACCENT[item.variant])} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-panel-fg">{item.title}</p>
        {item.description && (
          <p className="mt-0.5 text-[12px] leading-snug text-panel-fg-muted">{item.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => dismiss(item.id)}
        className="shrink-0 rounded-md p-1 text-panel-fg-subtle transition-colors hover:bg-panel-surface-2 hover:text-panel-fg"
        aria-label="Kapat"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2.5">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastRow key={t.id} item={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
