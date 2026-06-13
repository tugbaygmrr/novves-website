import fs from "node:fs";
import path from "node:path";

const refs = fs.readFileSync(
  path.join(import.meta.dirname, "../src/data/references.ts"),
  "utf8",
);
const countries = [...new Set([...refs.matchAll(/"country": "([^"]+)"/g)].map((m) => m[1]))].sort();
const flags = fs.readFileSync(
  path.join(import.meta.dirname, "../src/lib/references/reference-country-flag.ts"),
  "utf8",
);
const mapped = [...flags.matchAll(/^\s+([\w-]+):/gm)].map((m) => m[1]);
console.log("countries:", countries.join(", "));
console.log("count:", countries.length);
for (const c of countries) {
  if (!mapped.includes(c)) console.log("MISSING:", c);
}
