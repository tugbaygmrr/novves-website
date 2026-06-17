/**
 * Google Places API (New) ile lokasyon fotoğraflarını indirir.
 *
 * Gerekli: .env.local içinde GOOGLE_MAPS_API_KEY=
 * Places API + Places API (New) etkin olmalı.
 *
 * Kullanım: node scripts/fetch-iletisim-google-photos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const LOCATIONS = [
  {
    id: "istanbul-ofis",
    query: "NOVVES Elektrik Motor Kadıköy İstanbul",
    out: "istanbul-ofis.jpg",
  },
  {
    id: "yalova-fabrika",
    query: "NOVVES Elektrik Motor Çiftlikköy Yalova",
    out: "yalova-fabrika.jpg",
  },
];

const outDir = path.join(root, "public", "images", "iletisim", "locations");

async function searchPlace(query) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.photos",
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: "tr",
      regionCode: "TR",
      maxResultCount: 1,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`searchText failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  const place = data.places?.[0];
  if (!place?.photos?.length) {
    throw new Error(`No photos for: ${query}`);
  }
  return place.photos[0].name;
}

async function downloadPhoto(photoName, destPath) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=800&maxWidthPx=1200&key=${API_KEY}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`photo download failed (${res.status})`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
}

async function main() {
  if (!API_KEY) {
    console.error("GOOGLE_MAPS_API_KEY bulunamadı (.env.local).");
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  for (const loc of LOCATIONS) {
    const dest = path.join(outDir, loc.out);
    console.log(`→ ${loc.query}`);
    try {
      const photoName = await searchPlace(loc.query);
      await downloadPhoto(photoName, dest);
      console.log(`  ✓ ${loc.out} (${(fs.statSync(dest).size / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`  ✗ ${loc.id}:`, e.message);
    }
  }
}

main();
