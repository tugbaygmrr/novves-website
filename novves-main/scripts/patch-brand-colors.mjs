import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src");

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p, files);
    else if (/\.(tsx|ts|css)$/.test(name.name)) files.push(p);
  }
  return files;
}

const reps = [
  [/hover:bg-\[#e55a28\]/g, "hover:bg-primary-deep"],
  [/hover:text-\[#e55a28\]/g, "hover:text-primary-deep"],
  [/#FF6B35/gi, "#ef5f17"],
  [/rgba\(231,\s*106,\s*57/g, "rgba(239, 95, 23"],
  [/rgba\(255,\s*107,\s*53/g, "rgba(239, 95, 23"],
];

let nFiles = 0;
for (const file of walk(root)) {
  let s = fs.readFileSync(file, "utf8");
  const orig = s;
  for (const [re, to] of reps) s = s.replace(re, to);
  if (s !== orig) {
    fs.writeFileSync(file, s, "utf8");
    nFiles++;
  }
}
console.log("Updated", nFiles, "files");
