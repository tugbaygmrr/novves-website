import "server-only";
import { prisma } from "@/lib/prisma";

export interface DashboardData {
  ok: boolean;
  counts: {
    products: number;
    articles: number;
    references: number;
    team: number;
    technicalDocs: number;
    media: number;
    menu: number;
  };
  contactNew: number;
  contactTotal: number;
  published: number;
  draft: number;
  seoIssues: number;
  recentAudit: {
    id: number;
    username: string | null;
    action: string;
    entity: string;
    createdAt: Date;
  }[];
  recentSubmissions: {
    id: number;
    name: string;
    company: string | null;
    subject: string | null;
    status: string;
    createdAt: Date;
  }[];
}

const EMPTY: DashboardData = {
  ok: false,
  counts: { products: 0, articles: 0, references: 0, team: 0, technicalDocs: 0, media: 0, menu: 0 },
  contactNew: 0,
  contactTotal: 0,
  published: 0,
  draft: 0,
  seoIssues: 0,
  recentAudit: [],
  recentSubmissions: [],
};

/** Gösterge paneli için tek seferde tüm sayım/özetleri çeker. DB hatasında boş veri döner. */
export async function getDashboardData(): Promise<DashboardData> {
  try {
    const [
      products,
      articles,
      references,
      team,
      technicalDocs,
      media,
      menu,
      contactNew,
      contactTotal,
      publishedAgg,
      draftAgg,
      seoIssues,
      recentAudit,
      recentSubmissions,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.article.count(),
      prisma.reference.count(),
      prisma.teamMember.count(),
      prisma.technicalDocument.count(),
      prisma.media.count(),
      prisma.menuItem.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.contactSubmission.count(),
      // Yayında: status = PUBLISHED olan içerikler (5 modül toplamı)
      Promise.all([
        prisma.product.count({ where: { status: "PUBLISHED" } }),
        prisma.article.count({ where: { status: "PUBLISHED" } }),
        prisma.reference.count({ where: { status: "PUBLISHED" } }),
        prisma.teamMember.count({ where: { status: "PUBLISHED" } }),
        prisma.technicalDocument.count({ where: { status: "PUBLISHED" } }),
      ]).then((a) => a.reduce((x, y) => x + y, 0)),
      // Taslak
      Promise.all([
        prisma.product.count({ where: { status: "DRAFT" } }),
        prisma.article.count({ where: { status: "DRAFT" } }),
        prisma.reference.count({ where: { status: "DRAFT" } }),
        prisma.teamMember.count({ where: { status: "DRAFT" } }),
        prisma.technicalDocument.count({ where: { status: "DRAFT" } }),
      ]).then((a) => a.reduce((x, y) => x + y, 0)),
      // SEO eksik: title veya description boş meta kayıtları
      prisma.seoMeta.count({ where: { OR: [{ title: null }, { description: null }] } }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: { id: true, username: true, action: true, entity: true, createdAt: true },
      }),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, company: true, subject: true, status: true, createdAt: true },
      }),
    ]);

    return {
      ok: true,
      counts: { products, articles, references, team, technicalDocs, media, menu },
      contactNew,
      contactTotal,
      published: publishedAgg,
      draft: draftAgg,
      seoIssues,
      recentAudit,
      recentSubmissions,
    };
  } catch {
    return EMPTY;
  }
}
