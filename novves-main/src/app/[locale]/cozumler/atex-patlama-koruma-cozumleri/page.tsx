import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { SolutionDetailClient } from "@/components/solution-detail-client";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return (
    <SolutionDetailClient
      dict={dict.solutions.atexPatlamaKoruma}
      locale={locale}
      commonDict={dict.common}
      slug="atex-patlama-koruma-cozumleri"
    />
  );
}
