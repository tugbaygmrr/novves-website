import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { solutionDetailMetadata } from "@/lib/i18n-metadata";
import {
  SolutionDetailPillarClient,
  type PillarPdf,
  type PillarProduct,
  type PillarStat,
  type SidebarItem,
} from "@/components/solution-detail-pillar-client";
import { SOLUTION_NAV } from "@/lib/hub-nav-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return solutionDetailMetadata(locale, "dumanIsiTahliye");
}

const SLUG = "duman-isi-tahliye-sistemleri";

const STATS_BY_LOCALE: Record<string, PillarStat[]> = {
  tr: [
    { label: "Can Güvenliği", icon: "shield" },
    { label: "Görüş Mesafesi", icon: "eye" },
    { label: "Isı Kontrolü", icon: "thermometer" },
  ],
  en: [
    { label: "Life Safety", icon: "shield" },
    { label: "Visibility", icon: "eye" },
    { label: "Heat Control", icon: "thermometer" },
  ],
  ru: [
    { label: "Безопасность", icon: "shield" },
    { label: "Видимость", icon: "eye" },
    { label: "Контроль тепла", icon: "thermometer" },
  ],
};

const PDFS_BY_LOCALE: Record<string, PillarPdf[]> = {
  tr: [
    { title: "Teknik Föy", size: "2.4 MB" },
    { title: "Montaj Kılavuzu", size: "5.1 MB" },
    { title: "Sertifikalar", size: "3.7 MB" },
  ],
  en: [
    { title: "Technical Datasheet", size: "2.4 MB" },
    { title: "Installation Guide", size: "5.1 MB" },
    { title: "Certificates", size: "3.7 MB" },
  ],
  ru: [
    { title: "Технический паспорт", size: "2.4 MB" },
    { title: "Руководство по монтажу", size: "5.1 MB" },
    { title: "Сертификаты", size: "3.7 MB" },
  ],
};

const PRODUCTS: PillarProduct[] = [
  {
    code: "NAX-1000",
    name: "Duman Tahliye Fanı",
    image: "/images/products/dragonfly-c.png",
    href: "/urunler/duman-isi-tahliye-fanlari",
    icon: "fan",
  },
  {
    code: "NVD-500",
    name: "Motorlu Damper",
    image: "/images/products/hound-al.png",
    href: "/urunler/damperler",
    icon: "damper",
  },
  {
    code: "NVK-300",
    name: "Kontrol Paneli",
    image: "/images/products/basinclandirma-kontrol-panosu.png",
    href: "/urunler/otomasyon-malzemeleri",
    icon: "panel",
  },
];

function pickByLocale<T>(map: Record<string, T>, locale: string): T {
  return map[locale] ?? map.en ?? map.tr;
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const solutionDict = dict.solutions.dumanIsiTahliye;
  if (!solutionDict) notFound();

  const sidebar: SidebarItem[] = SOLUTION_NAV.map((entry) => {
    const item = dict.solutions[entry.key as keyof typeof dict.solutions] as
      | { breadcrumbCurrent?: string }
      | undefined;
    const label =
      typeof item?.breadcrumbCurrent === "string" && item.breadcrumbCurrent.length > 0
        ? item.breadcrumbCurrent
        : entry.key;
    return { slug: entry.slug, label };
  });

  const products: PillarProduct[] = PRODUCTS.map((p) => ({
    ...p,
    href: p.href ? `/${locale}${p.href}` : undefined,
  }));

  return (
    <SolutionDetailPillarClient
      dict={solutionDict}
      locale={locale}
      commonDict={dict.common}
      slug={SLUG}
      sidebar={sidebar}
      heroImage="/images/solutions/duman-isi-tahliye-01-bg.png"
      pillar01Image="/images/solutions/duman-isi-tahliye-01-bg.png"
      products={products}
      pdfs={pickByLocale(PDFS_BY_LOCALE, locale)}
      stats={pickByLocale(STATS_BY_LOCALE, locale)}
    />
  );
}
