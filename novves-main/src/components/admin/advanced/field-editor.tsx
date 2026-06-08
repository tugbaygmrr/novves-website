"use client";

import type { ReactNode } from "react";

function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/([0-9]+)/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function isLongText(value: string): boolean {
  return value.length > 80 || value.includes("\n");
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

export function FieldEditor({
  data,
  path,
  onChange,
  depth = 0,
}: {
  data: unknown;
  path: string;
  onChange: (path: string, value: unknown) => void;
  depth?: number;
}): ReactNode {
  if (data === null || data === undefined) return null;

  if (typeof data === "string") {
    return isLongText(data) ? (
      <textarea
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        rows={3}
        className={inputClass}
      />
    ) : (
      <input
        type="text"
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        className={inputClass}
      />
    );
  }

  if (typeof data === "number") {
    return (
      <input
        type="number"
        value={data}
        onChange={(e) => onChange(path, Number(e.target.value))}
        className="w-40 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-800 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
    );
  }

  if (typeof data === "boolean") {
    return (
      <button
        type="button"
        onClick={() => onChange(path, !data)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data ? "bg-orange-500" : "bg-gray-200"}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${data ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400">#{i + 1}</span>
              <button
                type="button"
                onClick={() => {
                  const arr = [...data];
                  arr.splice(i, 1);
                  onChange(path, arr);
                }}
                className="rounded p-1 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
                title="Sil"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FieldEditor data={item} path={`${path}[${i}]`} onChange={onChange} depth={depth + 1} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const template =
              data.length > 0
                ? JSON.parse(JSON.stringify(data[0], (_k, v) => (typeof v === "string" ? "" : v)))
                : "";
            onChange(path, [...data, template]);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-2.5 text-[12px] font-medium text-gray-400 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Yeni ekle
        </button>
      </div>
    );
  }

  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    return (
      <div className="space-y-4">
        {entries.map(([key, value]) => {
          const isNested = typeof value === "object" && value !== null && !Array.isArray(value);
          const isArray = Array.isArray(value);
          const fieldPath = path ? `${path}.${key}` : key;

          return (
            <div key={key}>
              <label className="mb-1.5 flex items-center gap-2">
                <span className="text-[12px] font-semibold text-gray-600">{humanize(key)}</span>
                {isArray && (
                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium text-blue-500">
                    {(value as unknown[]).length} öğe
                  </span>
                )}
              </label>
              {isNested ? (
                <div className="rounded-xl border border-gray-100 bg-[#fafbfc] p-4">
                  <FieldEditor data={value} path={fieldPath} onChange={onChange} depth={depth + 1} />
                </div>
              ) : (
                <FieldEditor data={value} path={fieldPath} onChange={onChange} depth={depth + 1} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return <span className="text-[12px] text-gray-400">{String(data)}</span>;
}
