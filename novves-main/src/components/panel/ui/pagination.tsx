"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  total,
  pageSize,
  onPage,
}: {
  page: number;
  total: number;
  pageSize: number;
  onPage: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  return (
    <div className="flex items-center justify-between gap-3 pt-1">
      <p className="text-[12.5px] text-panel-fg-muted">
        {from}–{to} / {total}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-border text-panel-fg-muted transition-colors hover:bg-panel-surface-2 disabled:opacity-40"
          aria-label="Önceki"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-2 text-[12.5px] font-medium text-panel-fg">
          {page} / {pages}
        </span>
        <button
          type="button"
          onClick={() => onPage(page + 1)}
          disabled={page >= pages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-border text-panel-fg-muted transition-colors hover:bg-panel-surface-2 disabled:opacity-40"
          aria-label="Sonraki"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
