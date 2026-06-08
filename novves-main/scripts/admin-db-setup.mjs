import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { Pool } from "pg";

function loadEnvFiles() {
  for (const name of [".env.local", ".env"]) {
    const p = resolve(process.cwd(), name);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8");
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnvFiles();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL bulunamadi. .env.local dosyasini kontrol edin.");
  process.exit(1);
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  file VARCHAR(100) NOT NULL,
  locale VARCHAR(10) NOT NULL,
  section VARCHAR(100) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  updated_by VARCHAR(255),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (file, locale, section)
);

CREATE TABLE IF NOT EXISTS login_logs (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  ip_address VARCHAR(100),
  success BOOLEAN NOT NULL DEFAULT false,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

function poolSsl(connectionString) {
  const isProd = process.env.NODE_ENV === "production";
  const envForce = process.env.DATABASE_SSL === "true";
  const urlWants = /sslmode=(require|verify-ca|verify-full)/i.test(connectionString);
  let host = "";
  try {
    host = new URL(connectionString.replace(/^postgresql:/i, "http:")).hostname;
  } catch {
    return isProd || envForce || urlWants
      ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true" }
      : false;
  }
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1";
  const useSsl = isProd || envForce || urlWants || (!isLocal && host.length > 0);
  if (!useSsl) return false;
  return { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true" };
}

async function ensureDatabase() {
  let parsed;
  try {
    parsed = new URL(databaseUrl.replace(/^postgresql:/i, "http:"));
  } catch {
    console.error("DATABASE_URL gecersiz.");
    process.exit(1);
  }

  const dbName = parsed.pathname.replace(/^\//, "") || "novves";
  const adminUrl = new URL(parsed);
  adminUrl.pathname = "/postgres";

  const adminPool = new Pool({
    connectionString: adminUrl.toString().replace(/^http:/i, "postgresql:"),
    ssl: poolSsl(databaseUrl),
  });

  try {
    const exists = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName],
    );
    if (exists.rowCount === 0) {
      await adminPool.query(`CREATE DATABASE "${dbName.replace(/"/g, "")}"`);
      console.log(`Veritabani olusturuldu: ${dbName}`);
    } else {
      console.log(`Veritabani zaten var: ${dbName}`);
    }
  } finally {
    await adminPool.end();
  }
}

async function runSchema() {
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: poolSsl(databaseUrl),
  });

  try {
    await pool.query(SCHEMA_SQL);
    console.log("Admin tablolari hazir (admin_users, page_content, login_logs).");
  } finally {
    await pool.end();
  }
}

try {
  await ensureDatabase();
  await runSchema();
  console.log("\nSonraki adim: npm run admin:create");
} catch (error) {
  console.error("Kurulum basarisiz.");
  if (error?.code === "28P01") {
    console.error("Sifre hatali. .env.local icindeki DATABASE_URL sifresini Postgres kurulum sifrenizle guncelleyin.");
  } else if (error?.code === "ECONNREFUSED") {
    console.error("Postgres calismiyor. Windows Hizmetlerinden postgresql servisini baslatin.");
  } else {
    console.error(error);
  }
  process.exit(1);
}
