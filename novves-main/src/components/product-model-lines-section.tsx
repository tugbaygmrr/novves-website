import { ProductModelCardsGrid } from "@/components/product-model-cards-grid";
import type { ProductModel } from "@/components/product-detail-page";
import { resolvePublicImage } from "@/lib/resolve-public-image";

export type ProductModelLinesLabels = {
  productFamilies: string;
  productRange: string;
  productFamily: string;
  inspect: string;
  detailedView: string;
  readLess: string;
  technicalSupportRequest?: string;
};

export function ProductModelLinesSection({
  id = "product-lines",
  productLines,
  labels,
  familyTitle,
  locale,
  contactHref,
}: {
  id?: string;
  productLines: ProductModel[];
  labels: ProductModelLinesLabels;
  familyTitle: string;
  locale: string;
  contactHref?: string;
}) {
  if (!productLines.length) return null;

  return (
    <section id={id} className="relative scroll-mt-24 overflow-hidden bg-sand-200 py-9 sm:scroll-mt-28 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.22em]">
              {labels.productFamilies}
            </p>
            <h2 className="mt-2 font-eurostile text-[1.8rem] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
              {labels.productRange}
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
        </div>
        <ProductModelCardsGrid
          models={productLines.map((model) => ({
            ...model,
            image: resolvePublicImage(model.image, { label: model.name }),
          }))}
          familyTitle={familyTitle}
          locale={locale}
          labels={{
            productFamily: labels.productFamily,
            inspect: labels.inspect,
            detailedView: labels.detailedView,
            readLess: labels.readLess,
            technicalSupportRequest: labels.technicalSupportRequest,
          }}
          contactHref={contactHref}
        />
      </div>
    </section>
  );
}
