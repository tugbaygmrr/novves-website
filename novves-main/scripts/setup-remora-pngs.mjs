/**
 * REMORA g�rselleri: ae-* kaynaklar?ndan remora-*.png kopyala, ?effaf PNG �ret.
 * node scripts/setup-remora-pngs.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PRODUCTS_DIR = path.join(process.cwd(), "public/images/products");

const COPY_MAP = [
  ["ae-sf-baglanti-ayaklari.png", "remora-sf.png"],
  ["ae-fjf.png", "remora-fj.png"],
  ["ae-cf-karsi-flans.png", "remora-cf.png"],
  ["ae-fj2f.png", "remora-fj2f.png"],
  ["ae-pm-tel-kafes.png", "remora-pm.png"],
  ["ae-ic-giris-konisi.png", "remora-ic.png"],
  ["ae-sd100.png", "remora-s.png"],
  ["ae-rs.png", "remora-rs.png"],
  ["ae-ss-soket-susturucu.png", "remora-ss.png"],
];

for (const [src, dest] of COPY_MAP) {
  const srcPath = path.join(PRODUCTS_DIR, src);
  const destPath = path.join(PRODUCTS_DIR, dest);
  if (!fs.existsSync(srcPath)) {
    console.warn("skip missing:", src);
    continue;
  }
  fs.copyFileSync(srcPath, destPath);
  console.log("copied:", dest);
}

const remoraSrc = path.join(PRODUCTS_DIR, "remora.png");
const remoraRed = path.join(PRODUCTS_DIR, "remora-red.png");
if (fs.existsSync(remoraSrc)) {
  fs.copyFileSync(remoraSrc, remoraRed);
  console.log("copied: remora-red.png");
}

const targets = [
  ...COPY_MAP.map(([, dest]) => dest),
  "remora-red.png",
  "remora.png",
  "nav/remora.png",
];

const py = spawnSync("python", ["scripts/strip-catalog-product-bg.py", ...targets], {
  stdio: "inherit",
  cwd: process.cwd(),
});
if (py.status !== 0) {
  process.exit(py.status ?? 1);
}
