#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dec = new TextDecoder("utf-8", { fatal: true });

function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

let bad = 0;
for (const rel of ["src/lib/admin", "src/components/admin", "src/app/novves-panel"]) {
  for (const f of walk(path.join(ROOT, rel))) {
    const buf = fs.readFileSync(f);
    try {
      dec.decode(buf);
    } catch {
      console.log("INVALID", path.relative(ROOT, f));
      bad++;
    }
    const s = buf.toString("utf8");
    if (/listLabel \"/.test(s) || /Ã|Ä/.test(s)) {
      console.log("MOJIBAKE", path.relative(ROOT, f));
      bad++;
    }
  }
}
if (bad) process.exit(1);
console.log("UTF-8 OK");
