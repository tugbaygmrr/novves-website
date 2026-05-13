import { Pool } from "pg";
import { getPgPoolConfig } from "@/lib/pg-pool-config";

const pool = new Pool(getPgPoolConfig());

export default pool;
