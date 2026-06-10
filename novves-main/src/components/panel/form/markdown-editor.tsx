"use client";

import * as React from "react";
import { Bold, Italic, Heading2, List, Quote, Link2, Code } from "lucide-react";
import { Tooltip } from "../ui/tooltip";

type Wrap = { before: string; after?: string; block?: boolean };

const TOOLS: { icon: React.ComponentType<{ className?: string }>; label: string; wrap: Wrap }[] = [
  { icon: Bold, label: "Kalın", wrap: { before: "**", after: "**" } },
  { icon: Italic, label: "İtalik", wrap: { before: "*", after: "*" } },
  { icon: Heading2, label: "Başlık", wrap: { before: "## ", block: true } },
  { icon: List, label: "Liste", wrap: { before: "- ", block: true } },
  { icon: Quote, label: "Alıntı", wrap: { before: "> ", block: true } },
  { icon: Code, label: "Kod", wrap: { before: "`", after: "`" } },
  { icon: Link2, label: "Bağlantı", wrap: { before: "[", after: "](https://)" } },
];

export function MarkdownEditor({
  value,
  onChange,
  rows = 14,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  function apply(wrap: Wrap) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    let insert: string;
    if (wrap.block) {
      insert = wrap.before + (selected || "");
    } else {
      insert = wrap.before + (selected || "") + (wrap.after ?? "");
    }
    const next = value.slice(0, start) + insert + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + insert.length;
      el.setSelectionRange(pos, pos);
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-panel-border bg-panel-surface focus-within:border-panel-accent focus-within:ring-2 focus-within:ring-panel-accent/35">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-panel-border bg-panel-surface-2/50 p-1">
        {TOOLS.map((t) => (
          <Tooltip key={t.label} content={t.label}>
            <button
              type="button"
              onClick={() => apply(t.wrap)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-panel-fg-muted transition-colors hover:bg-panel-surface hover:text-panel-fg [&_svg]:h-4 [&_svg]:w-4"
            >
              <t.icon />
            </button>
          </Tooltip>
        ))}
        <span className="ml-auto px-2 text-[11px] text-panel-fg-subtle">Markdown</span>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="panel-scroll w-full resize-y bg-transparent px-3 py-2.5 text-[13.5px] leading-relaxed text-panel-fg outline-none placeholder:text-panel-fg-subtle"
        placeholder="İçeriği buraya yazın… Başlık için ## , liste için - kullanın."
      />
    </div>
  );
}
