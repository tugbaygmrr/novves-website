"use client";

import { useState, type ReactNode } from "react";
import { getFieldLabel, shouldHideInSimpleMode } from "@/lib/admin/field-labels";
import { setByPath } from "@/lib/admin/path-utils";

const inputClass =
  "w-full min-h-[44px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

function updateAtPath(data: unknown, path: string, value: unknown): unknown {
  return setByPath(data, path, value);
}

function SmartField({
  data,
  path,
  onChange,
  showAll,
  depth = 0,
}: {
  data: unknown;
  path: string;
  onChange: (path: string, value: unknown) => void;
  showAll: boolean;
  depth?: number;
}): ReactNode {
  if (data === null || data === undefined) return null;

  if (typeof data === "string") {
    const isLong = data.length > 80 || data.includes("\n");
    return isLong ? (
      <textarea
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        rows={4}
        className={inputClass}
      />
    ) : (
      <input type="text" value={data} onChange={(e) => onChange(path, e.target.value)} className={inputClass} />
    );
  }

  if (typeof data === "number") {
    return (
      <input
        type="number"
        value={data}
        onChange={(e) => onChange(path, Number(e.target.value))}
        className={inputClass}
      />
    );
  }

  if (typeof data === "boolean") {
    return (
      <button
        type="button"
        onClick={() => onChange(path, !data)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full ${data ? "bg-orange-500" : "bg-gray-200"}`}
      >
        <span className={`inline-block h-6 w-6 rounded-full bg-white shadow transition-transform ${data ? "translate-x-7" : "translate-x-1"}`} />
      </button>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="rounded-2xl border-2 border-gray-100 bg-gray-50/50 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[14px] font-bold text-gray-600">#{i + 1}</span>
              <button
                type="button"
                onClick={() => {
                  const arr = [...data];
                  arr.splice(i, 1);
                  onChange(path, arr);
                }}
                className="text-[12px] font-medium text-red-500 hover:underline"
              >
                Sil
              </button>
            </div>
            <SmartField
              data={item}
              path={`${path}[${i}]`}
              onChange={onChange}
              showAll={showAll}
              depth={depth + 1}
            />
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
          className="flex min-h-[48px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 text-[14px] font-semibold text-orange-600 hover:bg-orange-50"
        >
          + Yeni ekle
        </button>
      </div>
    );
  }

  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>).filter(
      ([key]) => showAll || !shouldHideInSimpleMode(key)
    );
    const hiddenCount = Object.keys(data as object).length - entries.length;

    return (
      <div className={`space-y-5 ${depth > 0 ? "" : ""}`}>
        {entries.map(([key, value]) => {
          const fieldPath = path ? `${path}.${key}` : key;
          const isNested = typeof value === "object" && value !== null;

          return (
            <div key={key}>
              <label className="mb-2 block text-[15px] font-semibold text-gray-800">
                {getFieldLabel(key)}
              </label>
              {isNested ? (
                <div className="rounded-xl border border-gray-100 bg-white p-4">
                  <SmartField data={value} path={fieldPath} onChange={onChange} showAll={showAll} depth={depth + 1} />
                </div>
              ) : (
                <SmartField data={value} path={fieldPath} onChange={onChange} showAll={showAll} depth={depth + 1} />
              )}
            </div>
          );
        })}
        {hiddenCount > 0 && !showAll && (
          <p className="text-[12px] text-gray-400">
            {hiddenCount} teknik alan gizlendi. &quot;Tum alanlari goster&quot; ile acabilirsiniz.
          </p>
        )}
      </div>
    );
  }

  return null;
}

export function SmartFallbackForm({
  data,
  onChange,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
}) {
  const [showAll, setShowAll] = useState(false);

  function handleFieldChange(path: string, value: unknown) {
    if (!path) {
      onChange(value);
      return;
    }
    onChange(updateAtPath(data, path, value));
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
        <input
          type="checkbox"
          checked={showAll}
          onChange={(e) => setShowAll(e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-orange-500"
        />
        <span className="text-[14px] text-gray-600">Tum alanlari goster (teknik)</span>
      </label>
      <SmartField data={data} path="" onChange={handleFieldChange} showAll={showAll} />
    </div>
  );
}
