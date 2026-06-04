import { notFound, redirect } from "next/navigation";
import { hasLocale } from "../dictionaries";

const DEFAULT_PRODUCT_CATEGORY_SLUG = "hava-hareketi";

export default async function UrunlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  redirect(`/${locale}/urunler/${DEFAULT_PRODUCT_CATEGORY_SLUG}`);
}
