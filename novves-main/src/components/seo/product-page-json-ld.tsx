import { headers } from "next/headers";
import {
  absoluteSiteUrl,
  buildProductSchema,
  jsonLdGraph,
} from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/metadata";
import { JsonLdScript } from "@/components/seo/json-ld-script";

type ProductPageJsonLdProps = {
  name: string;
  description: string;
  image?: string;
  models?: Array<{ name: string; type?: string; description?: string }>;
};

/** Product schema for product detail pages (reads URL from x-pathname). */
export async function ProductPageJsonLd({
  name,
  description,
  image,
  models,
}: ProductPageJsonLdProps) {
  const pathname = (await headers()).get("x-pathname");
  if (!pathname) return null;

  const siteUrl = getSiteUrl();
  const additionalProperties =
    models?.flatMap((model) => {
      const props: Array<{ name: string; value: string }> = [];
      if (model.type) props.push({ name: "Model Type", value: model.type });
      if (model.description) {
        props.push({ name: model.name, value: model.description.slice(0, 500) });
      }
      return props;
    }) ?? [];

  const schema = jsonLdGraph(
    buildProductSchema(siteUrl, {
      name,
      description,
      url: absoluteSiteUrl(pathname),
      image,
      additionalProperties: additionalProperties.length ? additionalProperties : undefined,
    }),
  );

  return <JsonLdScript data={schema} />;
}
