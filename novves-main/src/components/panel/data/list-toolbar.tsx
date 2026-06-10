"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";

export function ListToolbar({
  q,
  onQ,
  status,
  onStatus,
  statusOptions,
  newHref,
  newLabel = "Yeni",
  children,
}: {
  q: string;
  onQ: (v: string) => void;
  status?: string;
  onStatus?: (v: string) => void;
  statusOptions?: { value: string; label: string }[];
  newHref?: string;
  newLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="relative min-w-[200px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panel-fg-subtle" />
        <Input value={q} onChange={(e) => onQ(e.target.value)} placeholder="Ara…" className="pl-9" />
      </div>
      {statusOptions && onStatus && (
        <Select value={status ?? ""} onChange={(e) => onStatus(e.target.value)} className="w-auto min-w-[140px]">
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      )}
      {children}
      {newHref && (
        <Link href={newHref} className="ml-auto">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            {newLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}

export function RowActions({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-end gap-1">{children}</div>;
}
