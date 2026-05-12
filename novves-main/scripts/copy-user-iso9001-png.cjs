const fs = require("fs");
const path = require("path");
const os = require("os");

const assets = path.join(
  os.homedir(),
  ".cursor",
  "projects",
  "c-Users-Tu-ba-Desktop-novves-main",
  "assets",
);

if (!fs.existsSync(assets)) {
  console.error("Klasör yok:", assets);
  process.exit(1);
}

const files = fs.readdirSync(assets);
const name =
  files.find((f) => f.includes("151045") && f.endsWith(".png")) ||
  files.find((f) => f.includes("dc89b4c0") && f.endsWith(".png")) ||
  files.find((f) => f.includes("Ekran_g_r_nt_s__2026-05-11_151045") && f.endsWith(".png"));

if (!name) {
  console.error("ISO 9001 referans PNG bulunamadı.");
  process.exit(1);
}

const src = path.join(assets, name);
const dst = path.join(__dirname, "../public/images/certificates/ISO9001.png");
fs.copyFileSync(src, dst);
console.log("Kopyalandı:\n ", src, "\n→", dst);
