import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const dictionariesRoot = path.join(process.cwd(), "src", "app", "[locale]", "dictionaries");
const fileToUrlPrefix = {
  home: "/",
  products: "/urunler",
  solutions: "/cozumler",
  services: "/hizmetler",
  corporate: "/kurumsal",
  technical: "/teknik-merkez",
  contact: "/iletisim",
  sustainability: "/surdurulebilirlik",
  kvkk: "/kvkk",
  common: "/",
};

function listLocales() {
  if (!fs.existsSync(dictionariesRoot)) return [];
  return fs
    .readdirSync(dictionariesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function flattenStrings(node, keyPath = "", out = []) {
  if (typeof node === "string") {
    const cleaned = node.replace(/\s+/g, " ").trim();
    if (cleaned.length >= 24) out.push({ keyPath, text: cleaned });
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => flattenStrings(item, `${keyPath}[${i}]`, out));
    return out;
  }
  if (node && typeof node === "object") {
    Object.entries(node).forEach(([k, v]) => {
      const nextPath = keyPath ? `${keyPath}.${k}` : k;
      flattenStrings(v, nextPath, out);
    });
  }
  return out;
}

function titleFromPath(sourceFile, keyPath) {
  const leaf = keyPath.split(".").pop() || sourceFile;
  return `${sourceFile} · ${leaf}`.slice(0, 180);
}

function urlFor(locale, sourceFile) {
  const prefix = fileToUrlPrefix[sourceFile] || "/";
  return `/${locale}${prefix}`;
}

async function indexLocaleFile(locale, fileName) {
  const sourceFile = fileName.replace(/\.json$/i, "");
  const filePath = path.join(dictionariesRoot, locale, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const rows = flattenStrings(parsed);
  if (rows.length === 0) return 0;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "DELETE FROM site_search_chunks WHERE locale = $1 AND source_file = $2",
      [locale, sourceFile],
    );

    for (const row of rows) {
      await client.query(
        `INSERT INTO site_search_chunks (locale, source_file, title, url, content, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [locale, sourceFile, titleFromPath(sourceFile, row.keyPath), urlFor(locale, sourceFile), row.text],
      );
    }
    await client.query("COMMIT");
    return rows.length;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function main() {
  const locales = listLocales();
  if (locales.length === 0) {
    throw new Error("No locale dictionaries found.");
  }

  let total = 0;
  for (const locale of locales) {
    const localeDir = path.join(dictionariesRoot, locale);
    const files = fs
      .readdirSync(localeDir)
      .filter((f) => f.endsWith(".json") && !f.endsWith(".checkpoint.json"));

    for (const file of files) {
      const count = await indexLocaleFile(locale, file);
      total += count;
      console.log(`Indexed ${locale}/${file}: ${count}`);
    }
  }
  console.log(`Search indexing complete. Total chunks: ${total}`);
}

main()
  .catch((err) => {
    console.error("search-index-content failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });

