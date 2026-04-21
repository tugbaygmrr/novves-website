import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { ProductDetailPage } from "@/components/product-detail-page";

export const metadata: Metadata = {
  title: "Dragonfly - Duman ve Isı Tahliye Fanları | Novves",
  description: "F300 sınıfı yangın dayanım sertifikasına sahip, 300°C sıcaklığa 2 saat boyunca dayanacak şekilde tasarlanmış duman ve ısı tahliye fan serisi.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.dumanIsiTahliyeFanlari;

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
