"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/panel/cn";

export function TagInput({
  value,
  onChange,
  placeholder = "Etiket ekle, Enter…",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState("");

  function add(raw: string) {
    const t = raw.trim().replace(/,$/, "");
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 rounded-lg border border-panel-border bg-panel-surface p-1.5 focus-within:border-panel-accent focus-within:ring-2 focus-within:ring-panel-accent/35",
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-panel-surface-2 py-1 pl-2 pr-1 text-[12.5px] font-medium text-panel-fg"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="rounded p-0.5 text-panel-fg-subtle hover:text-panel-danger"
            aria-label={`${tag} kaldır`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft && add(draft)}
        placeholder={placeholder}
        className="min-w-[120px] flex-1 bg-transparent px-1.5 py-1 text-[13px] text-panel-fg outline-none placeholder:text-panel-fg-subtle"
      />
    </div>
  );
}
