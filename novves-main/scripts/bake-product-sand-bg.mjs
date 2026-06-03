/**
 * Beyaz/açık stüdyo arka planını site kum rengine (#ecebe6) çevirir.
 * Kullanım: node scripts/bake-product-sand-bg.mjs [dosya.png ...]
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const SAND_HEX = "#ecebe6";
const PRODUCTS_DIR = path.join(process.cwd(), "public/images/products");

/** Aksesuar kataloğu görselleri */
const ACCESSORY_FILES = [
  "yayli-titresim-izolatoru.png",
  "ae-sf-baglanti-ayaklari.png",
  "ae-pm-tel-kafes.png",
  "ae-ic-giris-konisi.png",
  "ae-cf-karsi-flans.png",
  "ae-fjf.png",
  "ae-fj2f.png",
  "ae-sd100.png",
  "ae-rs.png",
  "ae-ss-soket-susturucu.png",
  "ae-v-yonlendirici-kanat.png",
  "ae-oc-cikis-basligi.png",
  "ae-dfc.png",
  "ae-af-cati-adaptor.png",
  "ae-frs.png",
  "ae-cb-cati-baglanti-kutusu.png",
  "ae-eh-elektrikli-isitici.png",
  "emniyet-salteri.png",
  "korumali-emniyet-salteri.png",
  "monofaze-hiz-kontrol-cihazi.png",
  "frekans-inventoru.png",
  "basinclandirma-kontrol-panosu.png",
  "diferansiyel-basinc-sensoru.png",
  "kanal-tipi-duman-sensoru.png",
  "g4-panel-filtre.png",
  "g2-g3-panel-filtre.png",
  "g2-metal-yag-tutucu-filtre.png",
  "g2-g3-metal-yag-tutucu-filtre.png",
];

async function bakeSandBackground(filePath) {
  const input = sharp(filePath);
  const meta = await input.metadata();
  const { width, height } = meta;
  if (!width || !height) throw new Error(`Invalid image: ${filePath}`);

  const foreground = await input.ensureAlpha().toBuffer();

  const sandCanvas = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: SAND_HEX,
    },
  })
    .png()
    .toBuffer();

  const out = await sharp(sandCanvas)
    .composite([{ input: foreground, blend: "multiply" }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  const tmp = `${filePath}.sand-tmp`;
  await sharp(out).toFile(tmp);
  fs.renameSync(tmp, filePath);
}

const targets =
  process.argv.length > 2
    ? process.argv.slice(2).map((f) => path.resolve(f))
    : ACCESSORY_FILES.map((f) => path.join(PRODUCTS_DIR, f));

let ok = 0;
for (const file of targets) {
  if (!fs.existsSync(file)) {
    console.warn("skip (missing):", path.basename(file));
    continue;
  }
  await bakeSandBackground(file);
  console.log("ok:", path.basename(file));
  ok++;
}

console.log(`\n${ok} görsel → ${SAND_HEX} arka plan`);
