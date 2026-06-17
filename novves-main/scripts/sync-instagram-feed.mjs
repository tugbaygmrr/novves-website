#!/usr/bin/env node
/**
 * Instagram Graph API -> data/sosyal-medya/instagram-feed.json
 *
 * Kullanim:
 *   INSTAGRAM_ACCESS_TOKEN=... npm run instagram:sync
 *   INSTAGRAM_ACCESS_TOKEN=... INSTAGRAM_USER_ID=... npm run instagram:sync
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outFile = path.join(root, "data", "sosyal-medya", "instagram-feed.json");

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

loadEnvFile(path.join(root, ".env"));
loadEnvFile(path.join(root, ".env.local"));

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
const userId = process.env.INSTAGRAM_USER_ID?.trim();
const limit = Math.min(Math.max(Number.parseInt(process.env.INSTAGRAM_POST_LIMIT ?? "6", 10) || 6, 1), 12);

if (!accessToken) {
  console.error("INSTAGRAM_ACCESS_TOKEN gerekli (.env.local veya ortam degiskeni).");
  process.exit(1);
}

const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username";

async function fetchJson(url) {
  const response = await fetch(url);
  const body = await response.json();
  if (!response.ok) {
    const message = body?.error?.message ?? response.statusText;
    throw new Error(message);
  }
  return body;
}

async function fetchPosts() {
  if (userId) {
    const url = new URL(`https://graph.facebook.com/v21.0/${userId}/media`);
    url.searchParams.set("fields", fields);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", accessToken);
    const payload = await fetchJson(url);
    return payload.data ?? [];
  }

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);
  const payload = await fetchJson(url);
  return payload.data ?? [];
}

try {
  const posts = await fetchPosts();
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(
    outFile,
    `${JSON.stringify({ syncedAt: new Date().toISOString(), posts }, null, 2)}\n`,
    "utf-8",
  );
  console.log(`Instagram akisi kaydedildi: ${posts.length} gonderi -> ${outFile}`);
} catch (error) {
  console.error("Instagram senkronizasyonu basarisiz:", error instanceof Error ? error.message : error);
  process.exit(1);
}
