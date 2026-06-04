import { notFound, redirect } from "next/navigation";
import { hasLocale } from "../dictionaries";

const DEFAULT_SOLUTION_SLUG = "duman-isi-tahliye-sistemleri";

export default async function CozumlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  redirect(`/${locale}/cozumler/${DEFAULT_SOLUTION_SLUG}`);
}
