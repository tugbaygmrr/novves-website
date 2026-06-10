"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import { getFieldLabel, shouldHideInSimpleMode } from "@/lib/admin/field-labels";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { IconField } from "../fields/icon-field";
import { ImageField } from "../fields/image-field";

// ── İçerik-sözleşmesi alan tespiti (AutoForm ile aynı kurallar) ──────────────
const IMAGE_KEY = /(image|img|logo|poster|photo|cover|thumbnail|favicon|gorsel|resim|avatar)/i;
const IMAGE_EXT = /\.(png|webp|avif|jpe?g|svg|gif)$/i;
const TEXT_DESCRIPTOR_KEY = /(alt|label|title|caption|name|desc|text|aria)/i;

const isIconKey = (key: string) => /icon$/i.test(key);
const imageKeyFor = (iconKey: string) => `${iconKey}Image`;

function looksLikeImage(key: string, value: string): boolean {
  if (isIconKey(key)) return false;
  if (TEXT_DESCRIPTOR_KEY.test(key)) return false;
  if (IMAGE_KEY.test(key)) return true;
  return IMAGE_EXT.test(value.trim());
}

// Dosya yolu / medya kaynağı (video, pdf, src/href/url…) — sade modda gizlenir.
const FILE_PATH_KEY = /(src|href|url|video|file|iframe)$/i;
const FILE_PATH_VALUE =
  /^(\/|https?:\/\/).+\.(mp4|webm|mov|ogg|ogv|mp3|wav|pdf|zip|rar|docx?|xlsx?|pptx?|json|dwg|dxf)$/i;

function looksLikeFilePath(key: string, value: string): boolean {
  if (looksLikeImage(key, value)) return false; // görseller picker olarak kalır
  return FILE_PATH_KEY.test(key) || FILE_PATH_VALUE.test(value.trim());
}

// Erişilebilirlik / görünmez metinler (alt, aria…) — sade modda gizlenir.
const A11Y_TEXT_KEY = /(alt$|aria)/i;

function itemSummary(item: unknown): string | null {
  if (typeof item === "string") return item.trim() ? item.trim().slice(0, 48) : null;
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    for (const k of ["title", "label", "name", "question", "q", "sector", "year", "value", "heading"]) {
      const v = obj[k];
      if (typeof v === "string" && v.trim()) return v.trim().slice(0, 48);
    }
  }
  return null;
}

type ChangeFn = (path: string, value: unknown) => void;

const NO_HIDE: ReadonlySet<string> = new Set();

function SmartField({
  data,
  path,
  onChange,
  showAll,
  fieldKey = "",
  hideKeys = NO_HIDE,
}: {
  data: unknown;
  path: string;
  onChange: ChangeFn;
  showAll: boolean;
  fieldKey?: string;
  hideKeys?: ReadonlySet<string>;
}): React.ReactNode {
  if (data === null || data === undefined) {
    if (isIconKey(fieldKey)) {
      return <IconField value="" onChange={(v) => onChange(path, v)} showCustomImage={false} />;
    }
    if (fieldKey && IMAGE_KEY.test(fieldKey) && !TEXT_DESCRIPTOR_KEY.test(fieldKey)) {
      return <ImageField value="" onChange={(v) => onChange(path, v)} />;
    }
    return null;
  }

  if (typeof data === "string") {
    if (isIconKey(fieldKey)) {
      return <IconField value={data} onChange={(v) => onChange(path, v)} showCustomImage={false} />;
    }
    if (looksLikeImage(fieldKey, data)) {
      return <ImageField value={data} onChange={(v) => onChange(path, v)} />;
    }
    const isLong = data.length > 80 || data.includes("\n");
    return isLong ? (
      <Textarea value={data} onChange={(e) => onChange(path, e.target.value)} rows={4} />
    ) : (
      <Input value={data} onChange={(e) => onChange(path, e.target.value)} />
    );
  }

  if (typeof data === "number") {
    return (
      <Input
        type="number"
        value={data}
        onChange={(e) => onChange(path, e.target.value === "" ? 0 : Number(e.target.value))}
      />
    );
  }

  if (typeof data === "boolean") {
    return <Switch checked={data} onCheckedChange={(v) => onChange(path, v)} />;
  }

  if (Array.isArray(data)) {
    const move = (from: number, to: number) => {
      if (to < 0 || to >= data.length) return;
      const arr = [...data];
      const [m] = arr.splice(from, 1);
      arr.splice(to, 0, m);
      onChange(path, arr);
    };
    return (
      <div className="space-y-3">
        {data.map((item, i) => {
          const summary = itemSummary(item);
          return (
            <div key={i} className="rounded-xl border border-panel-border bg-panel-surface-2 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 text-[13px] font-bold text-panel-fg-muted">
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-panel-surface px-1.5 text-[11px] text-panel-fg-subtle">
                    {i + 1}
                  </span>
                  {summary && <span className="truncate font-normal text-panel-fg-subtle">{summary}</span>}
                </span>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    aria-label="Yukarı taşı"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-panel-fg-subtle transition-colors hover:bg-panel-surface hover:text-panel-fg disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, i + 1)}
                    disabled={i === data.length - 1}
                    aria-label="Aşağı taşı"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-panel-fg-subtle transition-colors hover:bg-panel-surface hover:text-panel-fg disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const arr = [...data];
                      arr.splice(i, 1);
                      onChange(path, arr);
                    }}
                    aria-label="Sil"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-panel-fg-subtle transition-colors hover:bg-panel-danger-soft hover:text-panel-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <SmartField data={item} path={`${path}[${i}]`} onChange={onChange} showAll={showAll} fieldKey={fieldKey} hideKeys={hideKeys} />
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            const template =
              data.length > 0
                ? JSON.parse(JSON.stringify(data[0], (_k, v) => (typeof v === "string" ? "" : v)))
                : "";
            onChange(path, [...data, template]);
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-panel-accent/40 py-2.5 text-[13px] font-semibold text-panel-accent transition-colors hover:bg-panel-accent-soft"
        >
          <Plus className="h-4 w-4" />
          Yeni ekle
        </button>
      </div>
    );
  }

  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const allKeys = Object.keys(obj);
    const pairedImageKeys = new Set<string>();
    for (const k of allKeys) {
      if (!isIconKey(k)) continue;
      const imgK = allKeys.find((x) => x.toLowerCase() === imageKeyFor(k).toLowerCase());
      if (imgK) pairedImageKeys.add(imgK);
    }

    const entries = Object.entries(obj).filter(([key, value]) => {
      if (path === "" && hideKeys.has(key)) return false; // section kökünde gizlenen (ölü) alanlar
      if (!showAll && shouldHideInSimpleMode(key)) return false;
      if (!showAll && A11Y_TEXT_KEY.test(key)) return false; // alt / aria metinleri
      if (pairedImageKeys.has(key)) return false;
      if (typeof value === "string" && looksLikeFilePath(key, value)) return false;
      return true;
    });

    return (
      <div className="space-y-4">
        {entries.map(([key, value]) => {
          const fieldPath = path ? `${path}.${key}` : key;

          if (isIconKey(key) && (typeof value === "string" || value == null)) {
            const imgK = allKeys.find((x) => x.toLowerCase() === imageKeyFor(key).toLowerCase());
            const imgVal = imgK ? obj[imgK] : undefined;
            const imgPath = imgK ? (path ? `${path}.${imgK}` : imgK) : undefined;
            return (
              <div key={key}>
                <label className="mb-1.5 block text-[13px] font-medium text-panel-fg">{getFieldLabel(key)}</label>
                <IconField
                  value={typeof value === "string" ? value : ""}
                  onChange={(v) => onChange(fieldPath, v)}
                  imageValue={typeof imgVal === "string" ? imgVal : ""}
                  onImageChange={imgPath ? (v) => onChange(imgPath, v) : undefined}
                  showCustomImage={Boolean(imgK)}
                />
              </div>
            );
          }

          if (typeof value === "string" && looksLikeImage(key, value)) {
            return (
              <div key={key}>
                <label className="mb-1.5 block text-[13px] font-medium text-panel-fg">{getFieldLabel(key)}</label>
                <ImageField value={value} onChange={(v) => onChange(fieldPath, v)} />
              </div>
            );
          }

          const isNested = typeof value === "object" && value !== null;
          return (
            <div key={key}>
              <label className="mb-1.5 block text-[13px] font-medium text-panel-fg">{getFieldLabel(key)}</label>
              {isNested ? (
                <div className="rounded-xl border border-panel-border bg-panel-surface p-4">
                  <SmartField data={value} path={fieldPath} onChange={onChange} showAll={showAll} fieldKey={key} hideKeys={hideKeys} />
                </div>
              ) : (
                <SmartField data={value} path={fieldPath} onChange={onChange} showAll={showAll} fieldKey={key} hideKeys={hideKeys} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export function FieldRenderer({
  data,
  onChange,
  hiddenKeys = [],
}: {
  data: unknown;
  /** path "" ise tüm veri değişir. */
  onChange: ChangeFn;
  /** Section kökünde gizlenecek (ölü) alan adları. */
  hiddenKeys?: string[];
}) {
  return (
    <SmartField data={data} path="" onChange={onChange} showAll={false} hideKeys={new Set(hiddenKeys)} />
  );
}
