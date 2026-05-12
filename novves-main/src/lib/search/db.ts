import { Pool } from "pg";

const globalForSearchDb = globalThis as unknown as { searchDbPool?: Pool };

export const searchDbPool =
  globalForSearchDb.searchDbPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForSearchDb.searchDbPool = searchDbPool;
}

