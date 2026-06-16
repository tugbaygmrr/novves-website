/**
 * Otomasyon katalog görselleri — stüdyo zemini ?effaf PNG.
 * node scripts/setup-otomasyon-pngs.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const PRODUCTS_DIR = path.join(process.cwd(), "public/images/products");

const FILES = [
  "otomasyon-pano.png",
  "otomasyon-plc.png",
  "otomasyon-sensor.png",
  "otomasyon-kontrol-kartlari.png",
  "frekans-inventoru.png",
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

for (const name of FILES) {
  const file = path.join(PRODUCTS_DIR, name);
  if (!fs.existsSync(file)) {
    console.warn("skip:", name);
    continue;
  }
  await stripBackground(file);
  console.log("ok:", name);
}
