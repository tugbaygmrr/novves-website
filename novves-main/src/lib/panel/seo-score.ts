export interface SeoMetaLike {
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  ogImage?: string | null;
  keywords?: string[];
}

export interface SeoIssue {
  level: "error" | "warn" | "info";
  msg: string;
}

export interface SeoScore {
  score: number;
  level: "good" | "ok" | "bad";
  issues: SeoIssue[];
}

/** Basit ama anlamlı SEO skoru (0–100) + uyarılar. */
export function scoreMeta(m: SeoMetaLike): SeoScore {
  const issues: SeoIssue[] = [];
  let score = 100;

  const title = (m.title ?? "").trim();
  if (!title) {
    issues.push({ level: "error", msg: "SEO başlığı yok" });
    score -= 35;
  } else if (title.length < 30) {
    issues.push({ level: "warn", msg: `Başlık kısa (${title.length}/30–60)` });
    score -= 10;
  } else if (title.length > 60) {
    issues.push({ level: "warn", msg: `Başlık uzun (${title.length}/30–60)` });
    score -= 10;
  }

  const desc = (m.description ?? "").trim();
  if (!desc) {
    issues.push({ level: "error", msg: "Meta açıklama yok" });
    score -= 30;
  } else if (desc.length < 70) {
    issues.push({ level: "warn", msg: `Açıklama kısa (${desc.length}/70–160)` });
    score -= 8;
  } else if (desc.length > 160) {
    issues.push({ level: "warn", msg: `Açıklama uzun (${desc.length}/70–160)` });
    score -= 8;
  }

  if (!m.ogImage) {
    issues.push({ level: "warn", msg: "OG görseli yok" });
    score -= 8;
  }
  if (!m.canonical) {
    issues.push({ level: "info", msg: "Canonical URL yok" });
    score -= 4;
  }
  if (!m.keywords || m.keywords.length === 0) {
    issues.push({ level: "info", msg: "Anahtar kelime yok" });
    score -= 4;
  }

  score = Math.max(0, score);
  const level: SeoScore["level"] = score >= 80 ? "good" : score >= 50 ? "ok" : "bad";
  return { score, level, issues };
}
