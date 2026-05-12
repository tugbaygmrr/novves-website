import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { solutionDetailMetadata } from "@/lib/i18n-metadata";
import { SolutionDetailClient } from "@/components/solution-detail-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return solutionDetailMetadata(locale, "atexPatlamaKoruma");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const solutionDict = dict.solutions.atexPatlamaKoruma;
  if (!solutionDict) notFound();
  return (
    <SolutionDetailClient
      dict={solutionDict}
      locale={locale}
      commonDict={dict.common}
      slug="atex-patlama-koruma-cozumleri"
      heroImage="/images/solutions/atex-patlama-koruma-card-hero.png"
    />
  );
}
