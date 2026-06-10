"use client";

import * as React from "react";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaPickerDialog } from "../media/media-picker";

/** Path tabanlı görsel galerisi (string[]). */
export function ImageList({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  function move(from: number, to: number) {
    if (to < 0 || to >= value.length) return;
    const arr = [...value];
    const [m] = arr.splice(from, 1);
    arr.splice(to, 0, m);
    onChange(arr);
  }

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
        {value.map((path, i) => (
          <div
            key={`${path}-${i}`}
            className="group relative overflow-hidden rounded-xl border border-panel-border bg-panel-surface-2"
          >
            <div className="flex aspect-square items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={path} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/45 px-1 py-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => move(i, i - 1)}
                disabled={i === 0}
                className="rounded p-0.5 text-white/80 hover:text-white disabled:opacity-30"
                aria-label="Sola"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, x) => x !== i))}
                className="rounded p-0.5 text-white/80 hover:text-panel-danger"
                aria-label="Kaldır"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(i, i + 1)}
                disabled={i === value.length - 1}
                className="rounded p-0.5 text-white/80 hover:text-white disabled:opacity-30"
                aria-label="Sağa"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-panel-border text-panel-fg-subtle transition-colors hover:border-panel-accent hover:text-panel-accent"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
      <MediaPickerDialog
        open={open}
        onClose={() => setOpen(false)}
        kind="IMAGE"
        onSelect={(m) => onChange([...value, m.path])}
      />
    </div>
  );
}
