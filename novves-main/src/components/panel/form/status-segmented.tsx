"use client";

import { cn } from "@/lib/panel/cn";

export function StatusSegmented({
  value,
  onChange,
}: {
  value: "DRAFT" | "PUBLISHED";
  onChange: (v: "DRAFT" | "PUBLISHED") => void;
}) {
  const opts: { value: "DRAFT" | "PUBLISHED"; label: string }[] = [
    { value: "DRAFT", label: "Taslak" },
    { value: "PUBLISHED", label: "Yayında" },
  ];
  return (
    <div className="inline-flex rounded-lg border border-panel-border bg-panel-surface-2 p-0.5">
      {opts.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors",
            value === o.value
              ? o.value === "PUBLISHED"
                ? "bg-panel-success-soft text-panel-success"
                : "bg-panel-surface text-panel-fg panel-shadow-sm"
              : "text-panel-fg-muted hover:text-panel-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
