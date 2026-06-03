/**
 * Beyaz veya siyah stüdyo arka planını site kum rengine (#ecebe6) çevirir.
 * node scripts/neutralize-product-bg.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const SAND = [236, 235, 230];
const PRODUCTS_DIR = path.join(process.cwd(), "public/images/products");

const FILES = [
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
  "otomasyon-pano.png",
  "otomasyon-plc.png",
  "otomasyon-sensor.png",
  "otomasyon-kontrol-kartlari.png",
];

function isBackground(r, g, b) {
  if (r > 242 && g > 242 && b > 242) return true;
  if (r < 22 && g < 22 && b < 22) return true;
  return false;
}

async function neutralize(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const a = data[i + 3] ?? 255;
    if (a < 8) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isBackground(r, g, b)) {
      data[i] = SAND[0];
      data[i + 1] = SAND[1];
      data[i + 2] = SAND[2];
      if (ch === 4) data[i + 3] = 255;
    }
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
  await neutralize(file);
  console.log("ok:", name);
}
