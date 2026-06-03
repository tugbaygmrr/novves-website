/**
 * Eski çözüm hero görsellerinden Biz Kimiz faaliyet kutusu (4:5) görselleri üretir.
 * node scripts/build-biz-kimiz-from-solution-heroes.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const W = 800;
const H = 1000;
const SOLUTIONS = path.join(process.cwd(), "public/images/solutions");
const OUT_DIR = path.join(process.cwd(), "public/images/corporate/biz-kimiz");

/** focusX/focusY: crop merkezi (0–1), kaynak görsel koordinatları */
const JOBS = [
  {
    out: "konfor-havalandirma.png",
    src: "konfor-iklimlendirme-card-hero.png",
    focusX: 0.76,
    focusY: 0.58,
  },
  {
    out: "iklimlendirme-hvac.png",
    src: "hijyenik-filtrasyon-card-hero.png",
    focusX: 0.5,
    focusY: 0.45,
  },
  {
    out: "endustriyel-sogutma.png",
    src: "endustriyel-hava-yonetimi-card-hero.png",
    focusX: 0.5,
    focusY: 0.32,
  },
  {
    out: "duman-kontrolu.png",
    src: "duman-isi-tahliye-card-hero.png",
    focusX: 0.68,
    focusY: 0.28,
  },
];

async function cropToPortrait(job) {
  const srcPath = path.join(SOLUTIONS, job.src);
  if (!fs.existsSync(srcPath)) throw new Error(`Missing: ${srcPath}`);

  const meta = await sharp(srcPath).metadata();
  const sw = meta.width ?? 0;
  const sh = meta.height ?? 0;
  const targetAspect = W / H;

  let cropW;
  let cropH;

  if (sw / sh > targetAspect) {
    cropH = sh;
    cropW = Math.round(sh * targetAspect);
  } else {
    cropW = sw;
    cropH = Math.round(sw / targetAspect);
  }

  let left = Math.round(job.focusX * sw - cropW / 2);
  let top = Math.round(job.focusY * sh - cropH / 2);
  left = Math.max(0, Math.min(left, sw - cropW));
  top = Math.max(0, Math.min(top, sh - cropH));

  const outPath = path.join(OUT_DIR, job.out);
  await sharp(srcPath)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(W, H, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log("ok:", job.out, `crop ${cropW}x${cropH} @ (${left},${top})`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const job of JOBS) {
  await cropToPortrait(job);
}
console.log(`\n4 görsel → ${OUT_DIR}`);
