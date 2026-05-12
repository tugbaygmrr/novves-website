/**
 * public/images/certificates/ISO14001.png — dış siyah zemini şeffaf yapar (köşelerden BFS; yeşil logo korunur).
 * node scripts/knockout-iso14001-bg.cjs
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

const input = path.join(__dirname, "../public/images/certificates/ISO14001.png");

function isOuterBlack(r, g, b, br, bg, bb) {
  const dr = r - br;
  const dg = g - bg;
  const db = b - bb;
  const di = Math.sqrt(dr * dr + dg * dg + db * db);
  if (di < 38) return true;
  if (r <= 22 && g <= 22 && b <= 22) return true;
  return false;
}

async function main() {
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

  const seen = new Uint8Array(w * h);
  const qx = new Int32Array(w * h);
  const qy = new Int32Array(w * h);
  let qh = 0;
  let qt = 0;

  const push = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const idx = y * w + x;
    if (seen[idx]) return;
    const i = idx * 4;
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    if (!isOuterBlack(r, g, b, br, bg, bb)) return;
    seen[idx] = 1;
    qx[qt] = x;
    qy[qt] = y;
    qt++;
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (qh < qt) {
    const x = qx[qh];
    const y = qy[qh];
    qh++;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!seen[idx]) continue;
      const i = idx * 4;
      d[i + 3] = 0;
      n++;
    }
  }

  const tmp = path.join(__dirname, "../public/images/certificates/ISO14001.tmp.png");
  await sharp(d, { raw: { width: w, height: h, channels: 4 } }).png().toFile(tmp);
  try {
    fs.unlinkSync(input);
  } catch {
    /* */
  }
  fs.renameSync(tmp, input);
  console.log("ISO14001.png güncellendi (kenardan siyah zemin). Şeffaf piksel:", n, input);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
