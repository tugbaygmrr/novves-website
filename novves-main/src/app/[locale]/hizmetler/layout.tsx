import { notFound } from "next/navigation";
import { HizmetlerShell } from "@/components/hizmetler/hizmetler-shell";
import { hasLocale } from "../dictionaries";

export default async function HizmetlerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <HizmetlerShell locale={locale}>{children}</HizmetlerShell>;
}
