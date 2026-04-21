import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import HomeClient from "./home-client";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return <HomeClient dict={dict.home} locale={locale} />;
}
