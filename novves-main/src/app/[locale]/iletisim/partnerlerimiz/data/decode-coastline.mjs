// One-off script: decode land-110m TopoJSON into a compact rings JSON.
// Output: rings.json = [ [[lon,lat], [lon,lat], ...], ... ]
// Drops tiny islands (< 8 points after decoding) to keep payload light.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const topo = JSON.parse(
  fs.readFileSync(path.join(__dirname, "land-110m.topo.json"), "utf8"),
);

const { scale, translate } = topo.transform;

// Decode delta-encoded arc into absolute [lon, lat] pairs
function decodeArc(arc) {
  const out = [];
  let x = 0;
  let y = 0;
  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    out.push([x * scale[0] + translate[0], y * scale[1] + translate[1]]);
  }
  return out;
}

const decodedArcs = topo.arcs.map(decodeArc);

function ringFromArcRefs(refs) {
  const out = [];
  for (const ref of refs) {
    const idx = ref < 0 ? ~ref : ref;
    const arc = decodedArcs[idx];
    const seq = ref < 0 ? [...arc].reverse() : arc;
    // Skip duplicate joint point (first of next arc = last of prev)
    if (out.length > 0) seq.shift();
    out.push(...seq);
  }
  return out;
}

const land = topo.objects.land; // MultiPolygon
const allRings = [];
for (const poly of land.geometries[0].arcs) {
  // poly is an array of rings; ring[0] = outer, rest = holes (skip holes)
  const outer = poly[0];
  const ring = ringFromArcRefs(outer);
  if (ring.length >= 8) allRings.push(ring);
}

// Round to 2 decimal places to shrink payload
const rounded = allRings.map((r) =>
  r.map(([lon, lat]) => [Math.round(lon * 100) / 100, Math.round(lat * 100) / 100]),
);

fs.writeFileSync(
  path.join(__dirname, "rings.json"),
  JSON.stringify(rounded),
);

const total = rounded.reduce((s, r) => s + r.length, 0);
console.log(`Wrote ${rounded.length} rings, ${total} points total`);
console.log(`Size: ${(fs.statSync(path.join(__dirname, "rings.json")).size / 1024).toFixed(1)} KB`);
