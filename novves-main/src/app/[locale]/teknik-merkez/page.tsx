import { redirect } from "next/navigation";
import { hasLocale } from "../dictionaries";

type PageProps = { params: Promise<{ locale: string }> };

/** Teknik Merkez yalnızca Doküman Kütüphanesi — kök URL doğrudan oraya yönlendirir. */
export default async function TeknikMerkezPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(locale)) redirect("/tr/teknik-merkez/dokuman-kutuphanesi");
  redirect(`/${locale}/teknik-merkez/dokuman-kutuphanesi`);
}
