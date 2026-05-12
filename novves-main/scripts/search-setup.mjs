import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const sql = `
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS site_search_chunks (
  id BIGSERIAL PRIMARY KEY,
  locale TEXT NOT NULL,
  source_file TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  content TEXT NOT NULL,
  content_tsv tsvector GENERATED ALWAYS AS (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(content, ''))) STORED,
  embedding vector(1536),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_search_chunks_locale ON site_search_chunks(locale);
CREATE INDEX IF NOT EXISTS idx_site_search_chunks_url ON site_search_chunks(url);
CREATE INDEX IF NOT EXISTS idx_site_search_chunks_tsv ON site_search_chunks USING GIN(content_tsv);
CREATE INDEX IF NOT EXISTS idx_site_search_chunks_content_trgm ON site_search_chunks USING GIN(content gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_site_search_chunks_title_trgm ON site_search_chunks USING GIN(title gin_trgm_ops);
`;

async function main() {
  await pool.query(sql);
  console.log("Search schema ready.");
}

main()
  .catch((err) => {
    console.error("search-setup failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });

