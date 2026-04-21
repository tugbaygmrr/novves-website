import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import IletisimClient from "./client";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <IletisimClient dict={dict.contact} locale={locale} />;
}
