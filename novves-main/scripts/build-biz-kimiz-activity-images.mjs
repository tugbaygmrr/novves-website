/**
 * Biz Kimiz faaliyet alanı kutuları için 4:5 kum zeminli ürün görselleri üretir.
 * node scripts/build-biz-kimiz-activity-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const SAND = { r: 236, g: 235, b: 230 };
const SAND_HEX = "#ecebe6";
const W = 800;
const H = 1000;
const PRODUCTS = path.join(process.cwd(), "public/images/products");
const OUT_DIR = path.join(process.cwd(), "public/images/corporate/biz-kimiz");

const JOBS = [
  {
    out: "konfor-havalandirma.png",
    src: path.join(PRODUCTS, "categories/hava-hareketi-card-hero.png"),
    cropSquare: true,
    scale: 0.88,
  },
  {
    out: "iklimlendirme-hvac.png",
    src: path.join(PRODUCTS, "categories/iklimlendirme-card-hero.png"),
    cropSquare: true,
    scale: 0.86,
  },
  {
    out: "endustriyel-sogutma.png",
    src: path.join(PRODUCTS, "categories/sogutma-ve-isitma-card-hero.png"),
    cropSquare: true,
    scale: 0.84,
  },
  {
    out: "duman-kontrolu.png",
    src: path.join(PRODUCTS, "dragonfly-t.png"),
    cropSquare: false,
    scale: 0.88,
  },
];

function isBackground(r, g, b) {
  if (r > 242 && g > 242 && b > 242) return true;
  if (r < 22 && g < 22 && b < 22) return true;
  return false;
}

async function neutralizeBuffer(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const a = data[i + 3] ?? 255;
    if (a < 8) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isBackground(r, g, b)) {
      data[i] = SAND.r;
      data[i + 1] = SAND.g;
      data[i + 2] = SAND.b;
      if (ch === 4) data[i + 3] = 255;
    }
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: ch },
  }).png();
}

async function cropCenterSquare(input) {
  const meta = await input.metadata();
  const size = Math.min(meta.width ?? 0, meta.height ?? 0);
  const left = Math.floor(((meta.width ?? 0) - size) / 2);
  const top = Math.floor(((meta.height ?? 0) - size) / 2);
  return input.extract({ left, top, width: size, height: size });
}

async function buildJob(job) {
  if (!fs.existsSync(job.src)) throw new Error(`Missing source: ${job.src}`);

  let pipeline = sharp(job.src);
  if (job.cropSquare) pipeline = await cropCenterSquare(pipeline);

  const neutral = await neutralizeBuffer(await pipeline.toBuffer());
  const trimmed = await neutral.trim({ threshold: 12 }).toBuffer();
  const meta = await sharp(trimmed).metadata();

  const maxW = Math.round(W * job.scale);
  const maxH = Math.round(H * job.scale);
  const fit = Math.min(maxW / (meta.width ?? 1), maxH / (meta.height ?? 1));
  const targetW = Math.round((meta.width ?? 1) * fit);
  const targetH = Math.round((meta.height ?? 1) * fit);

  const product = await sharp(trimmed)
    .resize(targetW, targetH, { fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();

  const left = Math.round((W - targetW) / 2);
  const top = Math.round((H - targetH) / 2);

  const canvas = await sharp({
    create: { width: W, height: H, channels: 3, background: SAND_HEX },
  })
    .composite([{ input: product, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  const outPath = path.join(OUT_DIR, job.out);
  await sharp(canvas).toFile(outPath);
  console.log("ok:", job.out, `${targetW}x${targetH} @ ${W}x${H}`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const job of JOBS) {
  await buildJob(job);
}
console.log(`\n4 görsel → ${OUT_DIR}`);
