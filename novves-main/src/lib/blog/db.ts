import "server-only";
import { prisma } from "@/lib/prisma";

export type PublicArticle = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover: string | null;
  category: string | null;
  author: string | null;
  publishAt: Date | null;
};

export type PublicArticleDetail = PublicArticle & {
  body: string | null;
  tags: string[];
};

function pickTr<T extends { locale: string }>(list: T[], locale: string): T | undefined {
  return list.find((t) => t.locale === locale) ?? list.find((t) => t.locale === "tr") ?? list[0];
}

/** Yayınlanmış yazılar (en yeni önce). DB erişilemezse boş dizi. */
export async function getPublishedArticles(locale: string, limit = 24): Promise<PublicArticle[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishAt: "desc" }, { createdAt: "desc" }],
      take: limit,
      include: { cover: { select: { path: true } }, translations: true },
    });
    return rows.map((a) => {
      const tr = pickTr(a.translations, locale);
      return {
        slug: a.slug,
        title: tr?.title ?? a.slug,
        excerpt: tr?.excerpt ?? null,
        cover: a.cover?.path ?? null,
        category: a.category,
        author: a.author,
        publishAt: a.publishAt,
      };
    });
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string, locale: string): Promise<PublicArticleDetail | null> {
  try {
    const a = await prisma.article.findUnique({
      where: { slug },
      include: { cover: { select: { path: true } }, translations: true },
    });
    if (!a || a.status !== "PUBLISHED") return null;
    const tr = pickTr(a.translations, locale);
    return {
      slug: a.slug,
      title: tr?.title ?? a.slug,
      excerpt: tr?.excerpt ?? null,
      body: tr?.body ?? null,
      cover: a.cover?.path ?? null,
      category: a.category,
      author: a.author,
      tags: a.tags,
      publishAt: a.publishAt,
    };
  } catch {
    return null;
  }
}
