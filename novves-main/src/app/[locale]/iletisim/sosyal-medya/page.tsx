import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SosyalMedyaPage } from "@/components/sosyal-medya/sosyal-medya-page";
import { resolveSosyalMedyaCopy, type SosyalMedyaHubJson } from "@/lib/sosyal-medya/copy";
import { getInstagramFeedPosts } from "@/lib/sosyal-medya/instagram";
import { getDictionary, hasLocale } from "../../dictionaries";
import { withPageSeo } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const copy = resolveSosyalMedyaCopy(dict.contact?.sosyalMedyaHub as SosyalMedyaHubJson | undefined, locale);

  return withPageSeo({
    locale,
    pathAfterLocale: "iletisim/sosyal-medya",
    title: `${copy.heroTitle1} ${copy.heroTitle2} | Novves`,
    description: copy.heroDesc,
  });
}

export default async function SosyalMedya({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const hub = dict.contact?.sosyalMedyaHub as SosyalMedyaHubJson | undefined;
  const copy = resolveSosyalMedyaCopy(hub, locale);
  const instagramPosts = await getInstagramFeedPosts();

  return <SosyalMedyaPage locale={locale} copy={copy} hub={hub} feedPosts={instagramPosts} />;
}
