import type { Metadata } from "next";
import { LegalCenterRoute } from "@/components/legal-center/legal-center-route";
import { legalCenterMetadata } from "@/lib/legal-center/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return legalCenterMetadata(locale, "product-safety");
}

export default function ProductSafetyPage(props: PageProps) {
  return <LegalCenterRoute docId="product-safety" params={props.params} />;
}
