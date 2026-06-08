import { headers } from "next/headers";
import {
  breadcrumbItemsFromPathname,
  buildBreadcrumbListSchema,
  jsonLdGraph,
  type NavSegmentLabels,
} from "@/lib/seo/json-ld";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { jumpNavHomeLabel } from "@/i18n/jump-nav-labels";
import type { Locale } from "@/i18n/config";

type RouteBreadcrumbJsonLdProps = {
  locale: string;
  navbar: {
    products: string;
    solutions: string;
    services: string;
    corporate: string;
    technicalCenter: string;
    contact: string;
  };
  sustainabilityLabel: string;
};

/** BreadcrumbList from current URL (via x-pathname header). */
export async function RouteBreadcrumbJsonLd({
  locale,
  navbar,
  sustainabilityLabel,
}: RouteBreadcrumbJsonLdProps) {
  const pathname = (await headers()).get("x-pathname");
  if (!pathname) return null;

  const labels: NavSegmentLabels = {
    home: jumpNavHomeLabel(locale as Locale),
    products: navbar.products,
    solutions: navbar.solutions,
    services: navbar.services,
    corporate: navbar.corporate,
    technicalCenter: navbar.technicalCenter,
    contact: navbar.contact,
    sustainability: sustainabilityLabel,
  };

  const items = breadcrumbItemsFromPathname(pathname, labels);
  if (items.length <= 1) return null;

  const schema = jsonLdGraph(buildBreadcrumbListSchema(items));
  return <JsonLdScript data={schema} />;
}
