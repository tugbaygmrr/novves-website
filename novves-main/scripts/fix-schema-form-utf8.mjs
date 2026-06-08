#!/usr/bin/env node
/**
 * Restore schema-form + smart-fallback-form from git and re-apply icon support (UTF-8 safe).
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REPO = path.join(ROOT, "..");

function gitShow(rel) {
  return execSync(`git show HEAD:novves-main/${rel}`, { cwd: REPO, encoding: "utf8" });
}

function writeUtf8(rel, content) {
  const file = path.join(ROOT, rel);
  fs.writeFileSync(file, content, "utf8");
  const b = fs.readFileSync(file);
  new TextDecoder("utf-8", { fatal: true }).decode(b);
  console.log("OK", rel, b.length);
}

// --- schema-form.tsx ---
let schema = gitShow("src/components/admin/simple/schema-form.tsx");

schema = schema.replace(
  `import type { FieldSchema, SectionSchema } from "@/lib/admin/field-schemas";
import { getByPath, setByPath } from "@/lib/admin/path-utils";`,
  `import type { FieldSchema, SectionSchema } from "@/lib/admin/field-schemas";
import { IconField } from "@/components/admin/shared/icon-field";
import { getByPath, setByPath } from "@/lib/admin/path-utils";`
);

schema = schema.replace(
  `  if (field.type === "image") {
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

  return (`,
  `  if (field.type === "image") {
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

  return (`
);

// Turkish strings via escapes only
schema = schema
  .replace('?? "Oge"', '?? "\u00d6\u011fe"')
  .replace('?? "oge"', '?? "\u00f6\u011fe"')
  .replace("Gelismis ayarlar", "Geli\u015fmi\u015f ayarlar");

writeUtf8("src/components/admin/simple/schema-form.tsx", schema);

// --- smart-fallback-form.tsx ---
let fallback = gitShow("src/components/admin/simple/smart-fallback-form.tsx");

fallback = fallback.replace(
  `import { getFieldLabel, shouldHideInSimpleMode } from "@/lib/admin/field-labels";
import { setByPath } from "@/lib/admin/path-utils";`,
  `import { IconField } from "@/components/admin/shared/icon-field";
import { getFieldLabel, shouldHideInSimpleMode } from "@/lib/admin/field-labels";
import { setByPath } from "@/lib/admin/path-utils";`
);

fallback = fallback.replace(
  `  if (typeof data === "string") {
    if (isImageField(path, data)) {
      return <ImagePathInput value={data} onChange={(v) => onChange(path, v)} />;
    }`,
  `  if (typeof data === "string") {
    if (fieldKeyFromPath(path) === "icon") {
      return <IconField value={data} onChange={(v) => onChange(path, v)} showCustomImage={false} />;
    }
    if (fieldKeyFromPath(path) === "iconImage") {
      return <ImagePathInput value={data} onChange={(v) => onChange(path, v)} />;
    }
    if (isImageField(path, data)) {
      return <ImagePathInput value={data} onChange={(v) => onChange(path, v)} />;
    }`
);

fallback = fallback
  .replace("Tum alanlari goster", "T\u00fcm alanlar\u0131 g\u00f6ster")
  .replace(" ile acabilirsiniz", " ile a\u00e7abilirsiniz");

writeUtf8("src/components/admin/simple/smart-fallback-form.tsx", fallback);

console.log("schema-form + smart-fallback UTF-8 restored");
