import { buildFaqPageSchema, jsonLdGraph, type FaqItem } from "@/lib/seo/json-ld";
import { JsonLdScript } from "@/components/seo/json-ld-script";

type FaqJsonLdProps = {
  items: FaqItem[];
};

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  const schema = jsonLdGraph(buildFaqPageSchema(items));
  return <JsonLdScript data={schema} />;
}
