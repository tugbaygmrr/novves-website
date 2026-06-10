import { cn } from "@/lib/panel/cn";

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-panel-border bg-panel-surface-2 px-1.5 font-sans text-[11px] font-medium text-panel-fg-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
