#!/usr/bin/env node
/**
 * Next.js 16: middleware.ts ile proxy.ts birlikte kullanılamaz.
 * Eski middleware dosyası veya .next önbelleği hatayı sürdürebilir.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const kill = (rel) => {
  const p = path.join(root, ...rel.split("/"));
  try {
    fs.rmSync(p, { recursive: true, force: true });
    console.log("removed:", rel);
  } catch (e) {
    console.warn("skip:", rel, (e && e.message) || e);
  }
};

// Next.js 16 — yalnızca src/proxy.ts kullanılmalı
for (const mw of ["src/middleware.ts", "src/middleware.js", "middleware.ts", "middleware.js"]) {
  const p = path.join(root, ...mw.split("/"));
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log("removed file:", mw);
  }
}

kill(".next");
kill("node_modules/.cache");
console.log("clean-next: done");
