/**
 * public/images/certificates/CE.png — köşe rengine göre beyaz veya siyah zemini şeffaf yapar.
 * node scripts/knockout-ce-background.cjs
 */
const path = require("path");
const fs = require("fs");

const input = path.join(__dirname, "../public/images/certificates/CE.png");

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error("sharp yok: npm install sharp --no-save");
    process.exit(1);
  }

  if (!fs.existsSync(input)) {
    console.error("Dosya yok:", input);
    process.exit(1);
  }

  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const d = Buffer.from(data);
  const w = info.width;
  const h = info.height;

  const pick = (x, y) => {
    const xi = Math.min(Math.max(x, 0), w - 1);
    const yi = Math.min(Math.max(y, 0), h - 1);
    const i = (yi * w + xi) * 4;
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

  /** Sertifika şeridi — ana sayfa sand-200 #e9eae2 ile aynı zemine yakın matı temizler */
  const stripR = 233;
  const stripG = 234;
  const stripB = 226;
  const distStrip = (r, g, b) => {
    const dr = r - stripR;
    const dg = g - stripG;
    const db = b - stripB;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const di = dist(r, g, b);
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;
      const dStrip = distStrip(r, g, b);

      let a = 255;
      // Saf beyaz / açık zemin
      if (r >= 248 && g >= 248 && b >= 248) {
        a = 0;
      } else if (dStrip < 38 && lum < 58 && sat < 0.14) {
        a = 0;
      } else if (cornerLum < 100) {
        // Köşeler koyu → siyah / lacivert zemin
        if (r <= 22 && g <= 22 && b <= 22) {
          a = 0;
        } else if (lum < 58 && di < 72) {
          a = 0;
        }
      } else {
        // Açık köşe: ekstra koyu leke (gölge) — çok sıkı değil
        if (lum < 28 && di < 35) {
          a = 0;
        }
      }

      if (a === 0) {
        d[i + 3] = 0;
        n++;
      }
    }
  }

  const tmp = path.join(__dirname, "../public/images/certificates/CE.tmp.png");
  await sharp(d, { raw: { width: w, height: h, channels: 4 } }).png().toFile(tmp);
  try {
    fs.unlinkSync(input);
  } catch {
    /* */
  }
  fs.renameSync(tmp, input);
  console.log("CE.png güncellendi (şeffaf zemin). Köşe lum≈", cornerLum.toFixed(1), "şeffaf piksel:", n, input);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
