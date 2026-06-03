import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

let cachedPublicDir: string | undefined;

function dirHasProductImages(publicDir: string): boolean {
  try {
    return fs.statSync(path.join(publicDir, "images", "products")).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Next uygulamasının `public/` klasörü — `npm run dev` bazen üst monorepo kökünden çalışır.
 */
export function getPublicDir(): string {
  if (cachedPublicDir) return cachedPublicDir;

  const candidates: string[] = [];
  const cwd = process.cwd();
  candidates.push(path.join(cwd, "public"));
  candidates.push(path.join(cwd, "novves-main", "public"));

  try {
    const fromLib = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "public");
    candidates.push(fromLib);
  } catch {
    // CJS / esbuild without import.meta
  }

  for (const dir of candidates) {
    if (dirHasProductImages(dir)) {
      cachedPublicDir = dir;
      return dir;
    }
  }

  cachedPublicDir = path.join(cwd, "public");
  return cachedPublicDir;
}
