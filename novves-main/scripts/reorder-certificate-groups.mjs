/**
 * Kurumsal sertifikalar sayfası: grup sırasını standart mantığına göre düzenler.
 * 1) ISO yönetim sistemleri  2) TSE hizmet  3) Ürün uygunluk (TSE+CE)
 * 4) EN kar yükü  5) ATEX  6) CE (EN 12101-3) ürün belgeleri
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dictRoot = path.join(__dirname, "../src/app/[locale]/dictionaries");

function groupOrder(g) {
  const p = g?.items?.[0]?.pdf ?? "";
  if (p.includes("iso-9001.pdf")) return 0;
  if (p.includes("tse-novves-hizmet-yeterlilik-belgesi.pdf")) return 1;
  if (p.includes("ts60355-2.pdf")) return 2;
  if (p.includes("kar-yuku-testi.pdf")) return 3;
  if (p.includes("aksiyal-exproof.pdf")) return 4;
  if (p.includes("RA-F300-WEG.pdf")) return 5;
  return 99;
}

function productGroupItemOrder(items) {
  if (!Array.isArray(items)) return items;
  const ce = items.filter((i) => String(i.pdf).includes("CE-sertifikasi"));
  const rest = items.filter((i) => !String(i.pdf).includes("CE-sertifikasi"));
  return [...rest, ...ce];
}

for (const locale of fs.readdirSync(dictRoot)) {
  const file = path.join(dictRoot, locale, "corporate.json");
  if (!fs.existsSync(file)) continue;
  const raw = fs.readFileSync(file, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.warn("Skip (parse error):", file);
    continue;
  }
  const groups = data?.sertifikalar?.groups;
  if (!Array.isArray(groups) || groups.length < 6) continue;

  const sorted = [...groups].sort((a, b) => groupOrder(a) - groupOrder(b));
  const productIdx = sorted.findIndex(
    (g) => g?.items?.[0]?.pdf?.includes("ts60355-2.pdf")
  );
  if (productIdx >= 0 && sorted[productIdx].items) {
    sorted[productIdx] = {
      ...sorted[productIdx],
      items: productGroupItemOrder(sorted[productIdx].items),
    };
  }

  data.sertifikalar.groups = sorted;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("OK", locale);
}
