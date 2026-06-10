"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/panel/cn";

interface DropdownContextValue {
  close: () => void;
}
const DropdownContext = React.createContext<DropdownContextValue>({ close: () => {} });

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  /** Menü genişliği (Tailwind sınıfı). */
  widthClassName?: string;
  className?: string;
}

export function Dropdown({
  trigger,
  children,
  align = "end",
  widthClassName = "w-56",
  className,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -2 }}
            transition={{ duration: 0.12 }}
            className={cn(
              "absolute z-50 mt-1.5 overflow-hidden rounded-xl border border-panel-border bg-panel-elevated p-1 panel-shadow-lg",
              align === "end" ? "right-0" : "left-0",
              widthClassName,
              className,
            )}
          >
            <DropdownContext.Provider value={{ close: () => setOpen(false) }}>
              {children}
            </DropdownContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "danger";
  disabled?: boolean;
  /** true ise tıklamada menü kapanmaz. */
  keepOpen?: boolean;
}

export function DropdownItem({
  icon: Icon,
  variant = "default",
  className,
  children,
  onClick,
  keepOpen,
  disabled,
  ...props
}: DropdownItemProps) {
  const { close } = React.useContext(DropdownContext);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (!keepOpen) close();
      }}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
        variant === "danger"
          ? "text-panel-danger hover:bg-panel-danger-soft"
          : "text-panel-fg hover:bg-panel-surface-2",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className={variant === "danger" ? "" : "text-panel-fg-subtle"} />}
      {children}
    </button>
  );
}

export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-panel-fg-subtle">
      {children}
    </div>
  );
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-panel-border" />;
}
