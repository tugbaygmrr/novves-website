import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "src/app/[locale]/dictionaries");

function contextForAccessory(lines, imageLineIndex) {
  const start = Math.max(0, imageLineIndex - 5);
  return lines.slice(start, imageLineIndex + 1).join("\n");
}

function mapFreeImage(ctx) {
  if (/AE-V|AE V |Leitschaufel|Guide Vane|Yönlendirici|istiqamətləndirici|aube directrice|ريشة موجهة|Łopatka prowadząca|Łopatki kierujące/i.test(ctx)) {
    return "ae-v-yonlendirici-kanat.png";
  }
  if (/AE-OC|Austritts|Outlet Cap|Çıkış|çıxış|Chapeau de sortie|غطاء مخرج|Zatyczka wylotowa|Zaślepki wylotowe/i.test(ctx)) {
    return "ae-oc-cikis-basligi.png";
  }
  if (/AE-AF|Dachadapter|Roof Adapter|Adaptör|adapter çərçiv|Cadre d.adaptation|إطار محول|Rama adaptera/i.test(ctx)) {
    return "ae-af-cati-adaptor.png";
  }
  if (/AE-CB|Anschlusskasten|Connection Box|Bağlantı Kutusu|qoşma qutusu|Boîtier de raccordement|صندوق اتصال|Skrzynka przyłączeniowa|Puszki dachowe/i.test(ctx)) {
    return "ae-cb-cati-baglanti-kutusu.png";
  }
  return null;
}

for (const loc of fs.readdirSync(root)) {
  const file = path.join(root, loc, "products.json");
  if (!fs.existsSync(file)) continue;

  const lines = fs.readFileSync(file, "utf8").split("\n");
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (/AE-SS|Socket Silencer|Silencieux à emboîtement|rozet tipli|Tłumik gniazdowy|Katım|gniazdowy/i.test(contextForAccessory(lines, i)) && line.includes("emniyet-salteri")) {
      line = line.replace(/emniyet-salteri\.(jpg|png)/, "ae-ss-soket-susturucu.png");
      changed = true;
    }

    if (!line.includes("free.jpg") && !line.includes("emniyet-salteri")) continue;

    if (line.includes("free.jpg")) {
      const mapped = mapFreeImage(contextForAccessory(lines, i));
      if (mapped) {
        line = line.replace("free.jpg", mapped);
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, lines.join("\n"));
    console.log("fixed", loc);
  }
}
