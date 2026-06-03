import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { solutionDetailMetadata } from "@/lib/i18n-metadata";
import { SolutionLibraryPage } from "@/components/solution-library/solution-library-page";
import {
  allSolutionSlugs,
  buildSolutionLibraryPageData,
  getSolutionEntryBySlug,
} from "@/lib/solution-library";
import { locales } from "@/i18n/config";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = allSolutionSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getSolutionEntryBySlug(slug);
  if (!entry) return {};
  return solutionDetailMetadata(locale, entry.key);
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  if (!getSolutionEntryBySlug(slug)) notFound();

  const dict = await getDictionary(locale);
  const solutionsDict = dict.solutions as Record<string, unknown>;
  const data = buildSolutionLibraryPageData(locale, slug, solutionsDict);
  if (!data) notFound();

  const nav = dict.common?.navbar;
  const solutionsHubLabel = typeof nav?.solutions === "string" ? nav.solutions : "Çözümler";

  return (
    <SolutionLibraryPage data={data} locale={locale} solutionsHubLabel={solutionsHubLabel} />
  );
}
