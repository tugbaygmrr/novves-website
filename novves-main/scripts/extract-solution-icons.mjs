// Extracts each of the 13 colorful icons from the master icon-set SVG into
// stand-alone files, recoloring every fill/stroke to white. Sidebar uses these
// directly via <Image>.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public/images/Novves-Çözümler_fernus_icon_set_v2_colorful.svg");
const outDir = path.join(root, "public/images/solution-icons");

fs.mkdirSync(outDir, { recursive: true });

const raw = fs.readFileSync(src, "utf8");

// Top-level icon groups: each starts with <g transform="translate(X, Y)" ...> and
// contains a card rect + inner <g transform="translate(45.5, 28)"> with the icon.
// Slug order matches the icon set's reading order (rows of 4, then 1).
const SLUGS = [
  "duman-isi-tahliye-sistemleri",
  "konfor-iklimlendirme-sistemleri",
  "hijyenik-filtrasyonlu-havalandirma",
  "endustriyel-hava-yonetimi",
  "hayvancilik-tesisleri-icin-havalandirma-sistemleri",
  "trafo-enerji-odalari-fanlari",
  "sera-tarimsal-havalandirma-sistemleri",
  "atex-patlama-koruma-cozumleri",
  "akilli-otomasyon-ve-kontrol-sistemleri",
  "konut-tipi-havalandirma-sistemleri",
  "marin-offshore-havalandirma-sistemleri",
  "proje-bazli-ozel-imalatlar",
  "cfd-muhendislik-danismanligi",
];

// Walk the raw text and collect every <g transform="translate(...)"> block at the
// top level. We need to balance angle-bracket nesting since groups contain other
// <g> children.
function findIconGroups(text) {
  const re = /<g\s+transform="translate\(([\d.]+),\s*([\d.]+)\)"/g;
  const candidates = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    candidates.push({ idx: m.index, x: parseFloat(m[1]), y: parseFloat(m[2]) });
  }
  // Top-level icon cards live in a rough 4×4 grid:
  //   x ∈ {20, 185, 350, 515}, y ∈ {80, 250, 420, 590}.
  // The inner content uses translate(45.5, 28), translate(4 4) etc., so filter
  // by the known x positions.
  const xs = new Set([20, 185, 350, 515]);
  return candidates.filter((c) => xs.has(c.x)).sort((a, b) => a.y - b.y || a.x - b.x);
}

function sliceGroup(text, startIdx) {
  // Find the closing </g> that balances the opening <g> at startIdx.
  let i = text.indexOf(">", startIdx) + 1;
  let depth = 1;
  while (depth > 0 && i < text.length) {
    const nextOpen = text.indexOf("<g", i);
    const nextClose = text.indexOf("</g>", i);
    if (nextClose === -1) throw new Error("Unbalanced <g>");
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = text.indexOf(">", nextOpen) + 1;
    } else {
      depth--;
      i = nextClose + 4;
    }
  }
  return text.slice(startIdx, i);
}

function extractInnerIcon(groupText) {
  // The first inner <g transform="translate(45.5, 28)"> ... </g> holds the actual
  // icon, drawn in a 64×64 area.
  const innerStart = groupText.indexOf('<g transform="translate(45.5, 28)"');
  if (innerStart === -1) throw new Error("Inner icon group not found");
  return sliceGroup(groupText, innerStart);
}

// Source palette → readable-on-dark mapping. Keeps the 5-layer dimensionality
// (drop shadow → mid fill → light highlight → orange accent → cream highlight)
// instead of collapsing everything to pure white, which made icons unreadable on
// the #0e1117 sidebar.
const COLOR_MAP = {
  "#1F4A5C": "#7c8694", // back-shadow → muted slate
  "#5DA3BB": "#ffffff", // main fill → white
  "#B7DDE8": "#cdd6e0", // light highlight → cool grey-white
  "#E68B6A": "#ef5f17", // accent → project primary orange
  "#F5E3CB": "#fbe6c8", // cream highlight
};
const COLOR_MAP_LC = Object.fromEntries(
  Object.entries(COLOR_MAP).map(([k, v]) => [k.toLowerCase(), v]),
);

function remapColor(value) {
  if (!value || value === "none") return value;
  return COLOR_MAP_LC[value.toLowerCase()] ?? value;
}

function recolor(svgFragment) {
  let out = svgFragment;
  // Strip the bulky inline `style="…"` attributes — they re-encode the color
  // anyway and bloat the file.
  out = out.replace(/\s+style="[^"]*"/g, "");
  // Recolor known fills/strokes via the palette map.
  out = out.replace(/(fill|stroke)="([^"]+)"/g, (_, attr, val) => {
    return `${attr}="${remapColor(val)}"`;
  });
  // Drop the mask reference; the mask is defined in the master file and won't
  // resolve in standalone SVGs.
  out = out.replace(/\s+mask="url\(#[^)]+\)"/g, "");
  return out;
}

function buildStandalone(inner) {
  // The inner group still has its translate(45.5, 28); we wrap with that offset
  // accounted for so the icon sits at (0,0) inside the new 0–64 viewBox.
  // Replace the outermost wrapping group with a clean translate(0, 0).
  const body = inner.replace(/^<g\s+transform="translate\(45\.5,\s*28\)"[^>]*>/, "<g>");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="none">\n  ${body}\n</svg>\n`;
}

const groups = findIconGroups(raw);
if (groups.length !== SLUGS.length) {
  console.warn(`Found ${groups.length} icon groups but ${SLUGS.length} slugs declared. Continuing with min.`);
}

const n = Math.min(groups.length, SLUGS.length);
for (let i = 0; i < n; i++) {
  const slug = SLUGS[i];
  const group = sliceGroup(raw, groups[i].idx);
  const inner = extractInnerIcon(group);
  const recolored = recolor(inner);
  const svg = buildStandalone(recolored);
  const outFile = path.join(outDir, `${slug}.svg`);
  fs.writeFileSync(outFile, svg, "utf8");
  console.log(`wrote ${path.relative(root, outFile)}`);
}

console.log(`done. ${n} icons emitted to ${path.relative(root, outDir)}`);
