/**
 * For each JSON in dictionaries/<target>/, if a string value equals the same path
 * in dictionaries/en/, replace it with dictionaries/<donor>/ (default de).
 * Leaves strings already customized (target !== en) unchanged.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dictRoot = path.join(root, "src", "app", "[locale]", "dictionaries");

const target = process.argv[2];
const donor = process.argv[3] || "de";
if (!target) {
  console.error("Usage: node fill-dict-from-donor-when-equals-en.mjs <locale> [donorLocale]");
  process.exit(1);
}

function fill(enNode, donorNode, targetNode) {
  if (targetNode === null || targetNode === undefined) return;
  if (Array.isArray(targetNode)) {
    if (!Array.isArray(enNode) || !Array.isArray(donorNode)) return;
    for (let i = 0; i < targetNode.length; i++) {
      const te = targetNode[i];
      const ee = enNode[i];
      const de = donorNode[i];
      if (typeof te === "string" && typeof ee === "string" && te === ee && typeof de === "string") {
        targetNode[i] = de;
      } else if (typeof te === "object" && te !== null && typeof ee === "object" && ee !== null && typeof de === "object" && de !== null) {
        fill(ee, de, te);
      }
    }
    return;
  }
  if (typeof targetNode !== "object") return;
  for (const key of Object.keys(targetNode)) {
    const te = targetNode[key];
    const ee = enNode?.[key];
    const de = donorNode?.[key];
    if (typeof te === "string" && typeof ee === "string" && te === ee && typeof de === "string") {
      targetNode[key] = de;
    } else if (Array.isArray(te)) {
      fill(ee, de, te);
    } else if (typeof te === "object" && te !== null) {
      if (typeof ee === "object" && ee !== null && typeof de === "object" && de !== null) {
        fill(ee, de, te);
      }
    }
  }
}

const targetDir = path.join(dictRoot, target);
const files = fs.readdirSync(targetDir).filter((f) => f.endsWith(".json"));
let touched = 0;
for (const file of files) {
  const enPath = path.join(dictRoot, "en", file);
  const donorPath = path.join(dictRoot, donor, file);
  const tgtPath = path.join(targetDir, file);
  if (!fs.existsSync(enPath) || !fs.existsSync(donorPath)) continue;
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const d = JSON.parse(fs.readFileSync(donorPath, "utf8"));
  const tgt = JSON.parse(fs.readFileSync(tgtPath, "utf8"));
  fill(en, d, tgt);
  fs.writeFileSync(tgtPath, JSON.stringify(tgt, null, 2) + "\n", "utf8");
  touched++;
}
console.log(`Patched ${touched} files in ${target} from donor ${donor} where value matched en.`);
