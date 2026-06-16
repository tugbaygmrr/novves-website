/**
 * REMORA görselleri: stüdyo zemini ?effaf PNG — kanvas rengi siteden gelir.
 * node scripts/setup-remora-pngs.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

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

function isProductPixel(r, g, b) {
  const mean = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return mean < 228 || chroma > 28;
}

function isBackgroundPixel(r, g, b) {
  if (r < 22 && g < 22 && b < 22) return true;
  if (r > 242 && g > 242 && b > 242) return true;
  const mean = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return mean >= 229 && chroma <= 14;
}

async function stripBackground(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isProductPixel(r, g, b)) continue;
    if (!isBackgroundPixel(r, g, b)) continue;
    data[i + 3] = 0;
  }

  const tmp = `${filePath}.tmp`;
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: ch },
  })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, filePath);
}

for (const [src, dest] of COPY_MAP) {
  const srcPath = path.join(PRODUCTS_DIR, src);
  const destPath = path.join(PRODUCTS_DIR, dest);
  if (!fs.existsSync(srcPath)) {
    console.warn("skip missing:", src);
    continue;
  }
  fs.copyFileSync(srcPath, destPath);
  await stripBackground(destPath);
  console.log("ok:", dest);
}

const remoraSrc = path.join(PRODUCTS_DIR, "remora.png");
const remoraRed = path.join(PRODUCTS_DIR, "remora-red.png");
if (fs.existsSync(remoraSrc)) {
  fs.copyFileSync(remoraSrc, remoraRed);
  await stripBackground(remoraRed);
  console.log("ok: remora-red.png");
}

for (const name of ["remora.png", "nav/remora.png"]) {
  const file = path.join(PRODUCTS_DIR, name);
  if (!fs.existsSync(file)) continue;
  await stripBackground(file);
  console.log("card ok:", name);
}
