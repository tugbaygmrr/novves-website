import { getLocaleShellDictionary, hasLocale } from "./dictionaries";
import { getHomeReferencePreviewCounts } from "@/lib/home-reference-preview-counts";
import { notFound } from "next/navigation";
import HomeClient from "./home-client";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getLocaleShellDictionary(locale);

  const referencePreviewProjectCounts = getHomeReferencePreviewCounts();

  return (
    <HomeClient
      dict={dict.home}
      common={dict.common}
      locale={locale}
      referencePreviewProjectCounts={referencePreviewProjectCounts}
    />
  );
}
