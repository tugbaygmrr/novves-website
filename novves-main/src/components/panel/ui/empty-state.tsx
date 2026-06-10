import * as React from "react";
import { cn } from "@/lib/panel/cn";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-panel-border bg-panel-surface px-6 py-14 text-center",
        className,
      )}
    >
      {Icon && (
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-panel-surface-2 text-panel-fg-subtle [&_svg]:h-6 [&_svg]:w-6">
          <Icon />
        </span>
      )}
      <p className="text-[14px] font-semibold text-panel-fg">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[13px] text-panel-fg-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
