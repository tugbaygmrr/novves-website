import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  jsonLdGraph,
} from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/metadata";
import { JsonLdScript } from "@/components/seo/json-ld-script";

type SiteJsonLdProps = {
  locale: string;
};

/** Sitewide Organization + WebSite structured data. */
export function SiteJsonLd({ locale }: SiteJsonLdProps) {
  const siteUrl = getSiteUrl();
  const schema = jsonLdGraph(
    buildOrganizationSchema(siteUrl),
    buildWebSiteSchema(siteUrl, locale),
  );

  return <JsonLdScript data={schema} />;
}
