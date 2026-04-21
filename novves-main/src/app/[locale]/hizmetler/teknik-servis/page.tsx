import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { TeknikServisClient } from "./client";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <TeknikServisClient dict={dict.services.teknikServis} locale={locale} />;
}
