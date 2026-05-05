/**
 * Re-run en→lt with --fresh for the large dictionary files that are often
 * left in German if an earlier full run stopped mid-way (after home/solutions).
 *
 * Usage: node scripts/i18n-en-to-lt-remaining.mjs
 * npm:    npm run i18n:en-to-lt:remaining
 */
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const FILES = [
  "corporate",
  "technical",
  "products",
  "services",
  "solutions",
  "contact",
  "sustainability",
  "kvkk",
];

for (const f of FILES) {
  console.error(`\n=== ${f} ===\n`);
  const r = spawnSync(
    process.execPath,
    ["scripts/i18n-en-to-lt.mjs", "--file", f, "--fresh"],
    { cwd: ROOT, stdio: "inherit", shell: false },
  );
  if (r.status !== 0) {
    console.error(`Stopped: ${f} exited`, r.status);
    process.exit(r.status ?? 1);
  }
}
console.error("\nAll remainder files done. Run: npm run i18n:sync-lt-product-codes\n");
