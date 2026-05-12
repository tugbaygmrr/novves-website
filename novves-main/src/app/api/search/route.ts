import { NextRequest, NextResponse } from "next/server";
import { searchDbPool } from "@/lib/search/db";

export const dynamic = "force-dynamic";

type SearchRow = {
  id: number;
  locale: string;
  title: string;
  url: string;
  content: string;
  score: number;
};

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").trim();
  const locale = (request.nextUrl.searchParams.get("locale") ?? "tr").trim();
  const limitRaw = Number(request.nextUrl.searchParams.get("limit") ?? 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 20) : 10;

  if (q.length < 2) {
    return NextResponse.json({ results: [], total: 0 });
  }

  try {
    const sql = `
      WITH ranked AS (
        SELECT
          id,
          locale,
          title,
          url,
          content,
          (
            ts_rank_cd(content_tsv, websearch_to_tsquery('simple', $1)) * 1.0
            + similarity(title, $1) * 0.6
            + similarity(content, $1) * 0.4
          ) AS score
        FROM site_search_chunks
        WHERE locale = $2
          AND (
            content_tsv @@ websearch_to_tsquery('simple', $1)
            OR title % $1
            OR content % $1
          )
      )
      SELECT id, locale, title, url, content, score
      FROM ranked
      ORDER BY score DESC
      LIMIT $3
    `;

    const { rows } = await searchDbPool.query<SearchRow>(sql, [q, locale, limit]);
    return NextResponse.json({
      query: q,
      locale,
      total: rows.length,
      results: rows.map((r) => ({
        id: r.id,
        title: r.title,
        url: r.url,
        snippet: r.content.slice(0, 220),
        score: Number(r.score.toFixed(4)),
      })),
    });
  } catch (err) {
    console.error("Search API failed:", err);
    return NextResponse.json(
      { error: "Search failed. Ensure search table is created and indexed." },
      { status: 500 },
    );
  }
}

