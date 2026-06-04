/**
 * Katalog PNG'lerinden navbar onizleme kopyalari (beyaz zemin).
 * Orijinale dokunmaz: public/images/products/nav/
 * node scripts/build-navbar-product-previews.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const WHITE = [255, 255, 255];
const SAND = [236, 235, 230];
const SRC_DIR = path.join(process.cwd(), "public/images/products");
const NAV_DIR = path.join(SRC_DIR, "nav");

const SOURCES = [
  "chiller.png",
  "hound-al.png",
  "alpaca-am.png",
  "cyclone.png",
  "remora.png",
  "otomasyon-pano.png",
  "yayli-titresim-izolatoru.png",
];

function isSand(r, g, b) {
  return (
    Math.abs(r - SAND[0]) <= 5 &&
    Math.abs(g - SAND[1]) <= 5 &&
    Math.abs(b - SAND[2]) <= 5
  );
}

function isStudioWhite(r, g, b) {
  return r > 242 && g > 242 && b > 242;
}

function isProductMetal(r, g, b) {
  const mean = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return mean < 228 || chroma > 28;
}

function shouldPaintWhite(r, g, b) {
  if (isProductMetal(r, g, b)) return false;
  return isSand(r, g, b) || isStudioWhite(r, g, b);
}

async function buildNavPreview(srcName) {
  const src = path.join(SRC_DIR, srcName);
  const dest = path.join(NAV_DIR, srcName);
  if (!fs.existsSync(src)) {
    console.warn("skip missing:", srcName);
    return;
  }

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (!shouldPaintWhite(r, g, b)) continue;
    data[i] = WHITE[0];
    data[i + 1] = WHITE[1];
    data[i + 2] = WHITE[2];
    if (ch === 4) data[i + 3] = 255;
  }

  fs.mkdirSync(NAV_DIR, { recursive: true });
  const tmp = `${dest}.tmp`;
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: ch },
  })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, dest);
  console.log("ok:", path.relative(process.cwd(), dest));
}

for (const name of SOURCES) {
  await buildNavPreview(name);
}
