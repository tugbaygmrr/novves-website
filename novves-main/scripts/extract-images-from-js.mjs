import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const path = join(tmpdir(), "tg.js");
const t = readFileSync(path, "utf8");
const re = /["']([^"']*\.(?:png|svg|jpg|webp|ico))["']/gi;
const found = new Set();
let m;
while ((m = re.exec(t)) !== null) found.add(m[1]);
console.log([...found].slice(0, 40).join("\n"));
