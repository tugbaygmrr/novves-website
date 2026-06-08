"use client";

import type { FieldSchema, SectionSchema } from "@/lib/admin/field-schemas";
import { IconField } from "@/components/admin/shared/icon-field";
import { getByPath, setByPath } from "@/lib/admin/path-utils";

const inputClass =
  "w-full min-h-[44px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const str = typeof value === "string" ? value : value === null || value === undefined ? "" : String(value);

  if (field.type === "toggle") {
    return (
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${value ? "bg-orange-500" : "bg-gray-200"}`}
      >
        <span
          className={`inline-block h-6 w-6 rounded-full bg-white shadow transition-transform ${value ? "translate-x-7" : "translate-x-1"}`}
        />
      </button>
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        value={typeof value === "number" ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        value={str}
        onChange={(e) => onChange(e.target.value)}
        rows={field.rows ?? 3}
        maxLength={field.maxLength}
        className={inputClass}
      />
    );
  }

  if (field.type === "image") {
    return (
      <div className="space-y-2">
        {str && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={str} alt="" className="h-16 w-auto rounded-lg border border-gray-100 object-contain" />
        )}
        <input type="text" value={str} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder="/images/..." />
      </div>
    );
  }

  if (field.type === "icon") {
    return <IconField value={str} onChange={(v) => onChange(v)} showCustomImage={false} />;
  }

  return (
    <input
      type="text"
      value={str}
      onChange={(e) => onChange(e.target.value)}
      maxLength={field.maxLength}
      className={inputClass}
    />
  );
}

function ListField({
  field,
  data,
  onChange,
  showAdvanced,
}: {
  field: FieldSchema;
  data: unknown;
  onChange: (v: unknown) => void;
  showAdvanced: boolean;
}) {
  const arr = Array.isArray(data) ? data : [];
  const itemFields = (field.itemFields ?? []).filter((f) => showAdvanced || !f.advancedOnly);

  return (
    <div className="space-y-4">
      {arr.map((item, i) => (
        <div key={i} className="rounded-2xl border-2 border-gray-100 bg-gray-50/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[14px] font-bold text-gray-700">
              {field.listLabel ?? "Öğe"} #{i + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const next = [...arr];
                next.splice(i, 1);
                onChange(next);
              }}
              className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-red-500 hover:bg-red-50"
            >
              Sil
            </button>
          </div>
          <div className="space-y-4">
            {itemFields.map((sub) => (
              <div key={sub.path}>
                <label className="mb-2 block text-[14px] font-semibold text-gray-700">{sub.label}</label>
                {sub.help && <p className="mb-2 text-[12px] text-gray-400">{sub.help}</p>}
                <FieldInput
                  field={sub}
                  value={getByPath(item, sub.path)}
                  onChange={(v) => {
                    const next = [...arr];
                    next[i] = setByPath(item, sub.path, v);
                    onChange(next);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const template =
            arr.length > 0
              ? JSON.parse(JSON.stringify(arr[0], (_k, v) => (typeof v === "string" ? "" : v)))
              : Object.fromEntries(itemFields.map((f) => [f.path, ""]));
          onChange([...arr, template]);
        }}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/50 text-[14px] font-semibold text-orange-600 hover:bg-orange-50"
      >
        + Yeni {field.listLabel?.toLowerCase() ?? "öğe"} ekle
      </button>
    </div>
  );
}

export function SchemaForm({
  schema,
  data,
  onChange,
  showAdvanced = false,
}: {
  schema: SectionSchema;
  data: unknown;
  onChange: (data: unknown) => void;
  showAdvanced?: boolean;
}) {
  const simpleFields = schema.fields.filter((f) => showAdvanced || !f.advancedOnly || f.type === "list");
  const advancedFields = schema.fields.filter((f) => f.advancedOnly && f.type !== "list");

  const resolveData = (path: string) => {
    if (path === "" && schema.rootIsArray) return data;
    return getByPath(data, path);
  };

  const updateData = (path: string, value: unknown) => {
    if (path === "" && schema.rootIsArray) {
      onChange(value);
      return;
    }
    onChange(setByPath(data, path, value));
  };

  return (
    <div className="space-y-6">
      {schema.description && (
        <p className="rounded-xl bg-blue-50 px-4 py-3 text-[14px] text-blue-700">{schema.description}</p>
      )}

      {simpleFields.map((field) => {
        if (field.type === "list") {
          return (
            <div key={field.path || "list"}>
              <label className="mb-3 block text-[16px] font-bold text-gray-800">{field.label}</label>
              <ListField
                field={field}
                data={resolveData(field.path)}
                onChange={(v) => updateData(field.path, v)}
                showAdvanced={showAdvanced}
              />
            </div>
          );
        }

        if (field.advancedOnly && !showAdvanced) return null;

        return (
          <div key={field.path}>
            <label className="mb-2 block text-[16px] font-semibold text-gray-800">{field.label}</label>
            {field.help && <p className="mb-2 text-[13px] text-gray-400">{field.help}</p>}
            <FieldInput
              field={field}
              value={resolveData(field.path)}
              onChange={(v) => updateData(field.path, v)}
            />
            {field.maxLength && typeof resolveData(field.path) === "string" && (
              <p className="mt-1 text-[11px] text-gray-300">
                {(resolveData(field.path) as string).length}/{field.maxLength}
              </p>
            )}
          </div>
        );
      })}

      {advancedFields.length > 0 && !showAdvanced && (
        <details className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer text-[14px] font-semibold text-gray-500">
            Gelişmiş ayarlar (linkler, teknik alanlar)
          </summary>
          <div className="mt-4 space-y-4">
            {advancedFields.map((field) => (
              <div key={field.path}>
                <label className="mb-2 block text-[14px] font-semibold text-gray-600">{field.label}</label>
                <FieldInput
                  field={field}
                  value={resolveData(field.path)}
                  onChange={(v) => updateData(field.path, v)}
                />
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
