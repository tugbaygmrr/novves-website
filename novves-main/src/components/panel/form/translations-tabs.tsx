"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { locales } from "@/i18n/config";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MarkdownEditor } from "./markdown-editor";
import { LocalePicker } from "./locale-picker";
import { Field } from "./field";

export interface TransFieldDef {
  key: string;
  label: string;
  type?: "text" | "textarea" | "markdown";
  rows?: number;
  required?: boolean;
}

export interface Translation {
  locale: string;
  [key: string]: string | null | undefined;
}

export function TranslationsTabs({
  value,
  onChange,
  fields,
}: {
  value: Translation[];
  onChange: (t: Translation[]) => void;
  fields: TransFieldDef[];
}) {
  const [active, setActive] = React.useState("tr");

  const map = React.useMemo(() => {
    const m: Record<string, Translation> = {};
    for (const t of value) m[t.locale] = t;
    return m;
  }, [value]);

  function emit(next: Record<string, Translation>) {
    const arr = locales
      .map((code) => next[code])
      .filter((t): t is Translation => Boolean(t))
      .filter(
        (t) => t.locale === "tr" || fields.some((f) => String(t[f.key] ?? "").trim() !== ""),
      );
    onChange(arr);
  }

  function setField(locale: string, key: string, val: string) {
    const next = { ...map };
    next[locale] = { ...(next[locale] ?? { locale }), locale, [key]: val };
    emit(next);
  }

  function copyFromTr() {
    const tr = map.tr;
    if (!tr) return;
    const next = { ...map };
    next[active] = { ...(next[active] ?? { locale: active }), locale: active };
    for (const f of fields) next[active][f.key] = tr[f.key] ?? "";
    emit(next);
  }

  const cur = map[active] ?? { locale: active };
  const filled = value
    .filter((t) => fields.some((f) => String(t[f.key] ?? "").trim() !== ""))
    .map((t) => t.locale);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <LocalePicker value={active} onChange={setActive} filled={filled} />
        {active !== "tr" && (
          <button
            type="button"
            onClick={copyFromTr}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-panel-fg-muted transition-colors hover:text-panel-fg"
          >
            <Copy className="h-3.5 w-3.5" />
            TR&apos;den kopyala
          </button>
        )}
      </div>
      <div className="mt-4 space-y-4">
        {fields.map((f) => (
          <Field key={f.key} label={f.label} required={f.required && active === "tr"}>
            {f.type === "markdown" ? (
              <MarkdownEditor
                value={String(cur[f.key] ?? "")}
                onChange={(v) => setField(active, f.key, v)}
                rows={f.rows ?? 14}
              />
            ) : f.type === "textarea" ? (
              <Textarea
                value={String(cur[f.key] ?? "")}
                onChange={(e) => setField(active, f.key, e.target.value)}
                rows={f.rows ?? 4}
              />
            ) : (
              <Input
                value={String(cur[f.key] ?? "")}
                onChange={(e) => setField(active, f.key, e.target.value)}
              />
            )}
          </Field>
        ))}
      </div>
    </div>
  );
}
