import { redirect } from "next/navigation";
import { hasLocale } from "../dictionaries";

type PageProps = { params: Promise<{ locale: string }> };

export default async function LegalHubPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) redirect("/tr/privacy");
  redirect(`/${locale}/privacy`);
}
