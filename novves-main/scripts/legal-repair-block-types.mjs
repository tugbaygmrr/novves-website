/**
 * Çeviri sırasında bozulan blocks[].type değerlerini tr.json ile eşitler.
 *   node scripts/legal-repair-block-types.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "data/legal-locales");
const OK = new Set(["paragraph", "list", "ordered", "definitions", "banner"]);

function readJson(fp) {
  return JSON.parse(fs.readFileSync(fp, "utf8").replace(/^\uFEFF/, ""));
}

function collectTypePaths(obj, prefix = "", out = []) {
  if (typeof obj === "string") return out;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectTypePaths(item, `${prefix}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const p = prefix ? `${prefix}.${k}` : k;
      if (k === "type" && typeof v === "string" && OK.has(v)) {
        out.push({ path: prefix, value: v });
      } else {
        collectTypePaths(v, p, out);
      }
    }
  }
  return out;
}

function setByPath(root, pathStr, value) {
  const parts = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
  cur[parts[parts.length - 1]] = value;
}

const tr = readJson(path.join(DIR, "tr.json"));
const typePaths = collectTypePaths(tr);
console.log(`Type paths from tr: ${typePaths.length}`);

for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith(".json") || file === "tr.json" || file.includes("checkpoint")) continue;
  const fp = path.join(DIR, file);
  const bundle = readJson(fp);
  let fixed = 0;
  for (const { path: p, value } of typePaths) {
    const current = p.split(".").reduce((acc, part) => {
      const key = part.replace(/^\[|\]$/g, "");
      return acc == null ? acc : acc[/^\d+$/.test(key) ? Number(key) : key];
    }, bundle);
    // getByPath for .type at p
    const typePath = `${p}.type`;
    const parts = typePath.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
    let cur = bundle;
    for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
    const leaf = parts[parts.length - 1];
    if (cur[leaf] !== value && cur[leaf] !== undefined) {
      cur[leaf] = value;
      fixed++;
    }
  }
  if (fixed > 0) {
    fs.writeFileSync(fp, `${JSON.stringify(bundle, null, 2)}\n`, "utf8");
    console.log(`${file}: fixed ${fixed} type fields`);
  }
}

console.log("Done.");
