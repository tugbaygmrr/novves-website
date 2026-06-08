/**
 * St�dyo zemini (kum #ecebe6 veya �ok a�?k gri) -> saf beyaz; �r�n piksellerine dokunmaz.
 * node scripts/product-bg-to-white.mjs yayli-titresim-izolatoru.png
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const WHITE = [255, 255, 255];
const SAND = [236, 235, 230];
const PRODUCTS_DIR = path.join(process.cwd(), "public/images/products");

function isSand(r, g, b) {
  return (
    Math.abs(r - SAND[0]) <= 5 &&
    Math.abs(g - SAND[1]) <= 5 &&
    Math.abs(b - SAND[2]) <= 5
  );
}

/** neutralize-product-bg.mjs ile ayn? st�dyo beyaz? */
function isStudioWhite(r, g, b) {
  if (r > 242 && g > 242 && b > 242) return true;
  return false;
}

/** Orta gri metal � yanl??l?kla boyanmas?n */
function isProductMetal(r, g, b) {
  const mean = (r + g + b) / 3;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return mean < 228 || chroma > 28;
}

function shouldPaintWhite(r, g, b) {
  if (isProductMetal(r, g, b)) return false;
  return isSand(r, g, b) || isStudioWhite(r, g, b);
}

async function toWhite(filePath) {
  const { data, info } = await sharp(filePath)
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

  const tmp = `${filePath}.tmp`;
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: ch },
  })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, filePath);
}

const names = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["yayli-titresim-izolatoru.png"];

for (const name of names) {
  const file = path.join(PRODUCTS_DIR, name);
  if (!fs.existsSync(file)) {
    console.warn("skip:", name);
    continue;
  }
  await toWhite(file);
  console.log("ok:", name);
}
