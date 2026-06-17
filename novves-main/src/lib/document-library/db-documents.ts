import "server-only";
import { prisma } from "@/lib/prisma";
import { hasDatabaseUrl, isDatabaseUnavailable } from "@/lib/prisma-database";
import type { DocumentLibraryItem, DocumentLibraryUi } from "./types";

// DB kategori slug → doküman kütüphanesi ağaç etiket anahtarı
const CAT_TO_TREE_KEY: Record<string, keyof DocumentLibraryUi["sidebar"]["tree"]> = {
  katalog: "catalogs",
  "teknik-dokuman": "dataSheets",
  brosur: "brochures",
  "montaj-kilavuzu": "usageManuals",
  sertifika: "certifications",
  "test-raporu": "testPerformance",
  "cfd-raporu": "energyEfficiency",
};

const DEFAULT_PREVIEW = "/images/products/marlin.png";

function ext(path: string): string {
  return (path.split(".").pop() ?? "").toUpperCase();
}

function logDbUnavailable(context: string): void {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      `[${context}] PostgreSQL unavailable; continuing with JSON/static documents only. Start DB: npm run db:up`,
    );
    return;
  }
  console.error(`[${context}] PostgreSQL unavailable.`);
}

/**
 * Admin panelinden yayınlanmış (PUBLISHED) teknik dokümanları,
 * mevcut doküman kütüphanesi bileşeninin beklediği şekle map'ler.
 * DB erişilemezse boş dizi döner (sayfa JSON dokümanlarıyla yine çalışır).
 */
export async function getDbLibraryDocuments(
  ui: DocumentLibraryUi,
  locale: string,
): Promise<DocumentLibraryItem[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  let docs;
  try {
    docs = await prisma.technicalDocument.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ order: "asc" }, { publishDate: "desc" }, { createdAt: "desc" }],
      include: {
        category: true,
        file: { select: { path: true } },
        cover: { select: { path: true } },
        translations: true,
      },
    });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      logDbUnavailable("document-library");
      return [];
    }
    console.error("[document-library] DB read failed:", error);
    return [];
  }

  const tree = ui.sidebar.tree;

  return docs.map((d): DocumentLibraryItem => {
    const tr =
      d.translations.find((t) => t.locale === locale) ??
      d.translations.find((t) => t.locale === "tr") ??
      d.translations[0];
    const treeKey = CAT_TO_TREE_KEY[d.category.slug];
    const label = (treeKey ? tree[treeKey] : tree.documentLibrary) as string;

    return {
      id: `db-${d.id}`,
      language: locale,
      category: label,
      code: d.version ?? d.slug.toUpperCase().slice(0, 24),
      title: tr?.title ?? d.slug,
      status: "current",
      downloadHref: d.file.path,
      fileFormat: ext(d.file.path),
      treeCategory: label,
      previewImage: d.cover?.path ?? DEFAULT_PREVIEW,
      lastModified: d.publishDate ? d.publishDate.toISOString().slice(0, 10) : undefined,
    };
  });
}
