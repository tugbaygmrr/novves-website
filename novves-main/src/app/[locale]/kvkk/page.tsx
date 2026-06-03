import { redirect } from "next/navigation";
import { hasLocale } from "../dictionaries";

export default async function KvkkHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) redirect("/tr/legal");
  redirect(`/${locale}/legal`);
}
