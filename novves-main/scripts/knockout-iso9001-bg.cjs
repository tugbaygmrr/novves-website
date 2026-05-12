/**
 * public/images/certificates/ISO9001.png — siyah / koyu köşe zeminini şeffaf yapar (köşe örneklemesi + saf siyah).
 * node scripts/knockout-iso9001-bg.cjs
 */
const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("sharp yok: npm install sharp --no-save");
  process.exit(1);
}

const input = path.join(__dirname, "../public/images/certificates/ISO9001.png");

async function main() {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const d = Buffer.from(data);
  const w = info.width;
  const h = info.height;
  const pick = (x, y) => {
    const i = (Math.min(Math.max(y, 0), h - 1) * w + Math.min(Math.max(x, 0), w - 1)) * 4;
    return [d[i], d[i + 1], d[i + 2]];
  };
  const samples = [pick(2, 2), pick(w - 3, 2), pick(2, h - 3), pick(w - 3, h - 3)];
  const br = samples.reduce((s, c) => s + c[0], 0) / 4;
  const bg = samples.reduce((s, c) => s + c[1], 0) / 4;
  const bb = samples.reduce((s, c) => s + c[2], 0) / 4;
  const cornerLum = 0.299 * br + 0.587 * bg + 0.114 * bb;

  const dist = (r, g, b) => {
    const dr = r - br;
    const dg = g - bg;
    const db = b - bb;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const di = dist(r, g, b);
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      let clear = false;
      if (r <= 18 && g <= 18 && b <= 18) {
        clear = true;
      } else if (di < 42 && lum < 95) {
        clear = true;
      } else if (cornerLum < 35 && lum < 52 && di < 72) {
        clear = true;
      }

      if (clear) {
        d[i + 3] = 0;
        n++;
      }
    }
  }

  const tmp = path.join(__dirname, "../public/images/certificates/ISO9001.tmp.png");
  await sharp(d, { raw: { width: w, height: h, channels: 4 } }).png().toFile(tmp);
  try {
    fs.unlinkSync(input);
  } catch {
    /* */
  }
  fs.renameSync(tmp, input);
  console.log("ISO9001.png güncellendi. Köşe lum≈", cornerLum.toFixed(1), "şeffaf:", n, input);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
