import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { ProductDetailPage } from "@/components/product-detail-page";

export const metadata: Metadata = {
  title: "Turtle - Hücreli Fanlar | Novves",
  description: "Turtle serisi hücreli fanlar — kayış kasnak, plug fan, radyal ve aksiyal hücreli fan çözümleri.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.hucreliFanlar;

  return (
    <ProductDetailPage
      title={t.title}
      subtitle={t.subtitle}
      intro={t.intro}
      models={t.models}
      locale={locale}
      dict={dict.products}
    />
  );
}
