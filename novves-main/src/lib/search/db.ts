import { Pool } from "pg";
import { getPgPoolConfig } from "@/lib/pg-pool-config";

const globalForSearchDb = globalThis as unknown as { searchDbPool?: Pool };

export const searchDbPool =
  globalForSearchDb.searchDbPool ?? new Pool(getPgPoolConfig());

if (process.env.NODE_ENV !== "production") {
  globalForSearchDb.searchDbPool = searchDbPool;
}

