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
const name = files.find((f) => f.includes("fotor-bg-remover") && f.endsWith(".png"));
if (!name) {
  console.error("fotor-bg-remover PNG bulunamadı. assets:", files.slice(0, 5).join(", "), "…");
  process.exit(1);
}

const src = path.join(assets, name);
const dst = path.join(__dirname, "../public/images/certificates/CE.png");
fs.copyFileSync(src, dst);
console.log("Kopyalandı:\n ", src, "\n→", dst);
