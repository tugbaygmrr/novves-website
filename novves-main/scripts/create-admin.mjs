import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

/** `.env.local` / `.env` içinden DATABASE_URL vb. (yalnızca tanımsız anahtarları doldurur). */
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
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!databaseUrl) {
  console.error("Missing DATABASE_URL environment variable.");
  process.exit(1);
}

if (!username || !password) {
  console.error(
    "Missing credentials. Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables."
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

/** `src/lib/pg-pool-config.ts` ile aynı mantık (Neon vb. yerel `npm run admin:create`). */
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
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1";
  const useSsl =
    isProd || envForce || urlWants || (!isLocal && host.length > 0);
  if (!useSsl) return false;
  return {
    rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true",
  };
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: poolSsl(databaseUrl),
  connectionTimeoutMillis: 10_000,
});

try {
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await pool.query(
    "SELECT id FROM admin_users WHERE username = $1 LIMIT 1",
    [username]
  );

  if (existing.rowCount && existing.rowCount > 0) {
    await pool.query(
      `UPDATE admin_users
       SET password_hash = $1,
           role = 'admin',
           is_active = true,
           failed_attempts = 0,
           locked_until = NULL,
           updated_at = NOW()
       WHERE username = $2`,
      [passwordHash, username]
    );
    console.log(`Updated admin user: ${username}`);
  } else {
    await pool.query(
      `INSERT INTO admin_users (username, password_hash, role, is_active, failed_attempts)
       VALUES ($1, $2, 'admin', true, 0)`,
      [username, passwordHash]
    );
    console.log(`Created admin user: ${username}`);
  }
} catch (error) {
  console.error("Failed to create/update admin user.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
