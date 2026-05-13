import type { PoolConfig } from "pg";

/**
 * `pg` Pool için SSL: production’da ve uzak host / sslmode=require ile yerel dev’de açılır.
 * Neon, Supabase, RDS vb. için `DATABASE_URL` içinde `?sslmode=require` kullanın veya
 * `DATABASE_SSL=true` verin.
 */
function resolveSsl(connectionString: string | undefined): PoolConfig["ssl"] {
  if (!connectionString) return false;

  const isProd = process.env.NODE_ENV === "production";
  const envForce = process.env.DATABASE_SSL === "true";
  const urlWantsSsl = /sslmode=(require|verify-ca|verify-full)/i.test(connectionString);

  let host = "";
  try {
    host = new URL(connectionString.replace(/^postgresql:/i, "http:")).hostname;
  } catch {
    if (isProd || envForce || urlWantsSsl) {
      return {
        rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true",
      };
    }
    return false;
  }

  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1";

  const useSsl = isProd || envForce || urlWantsSsl || (!isLocal && host.length > 0);
  if (!useSsl) return false;

  return {
    rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true",
  };
}

/** Admin ve arama gibi modüller için ortak Pool ayarları. */
export function getPgPoolConfig(): PoolConfig {
  return {
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ssl: resolveSsl(process.env.DATABASE_URL),
  };
}
