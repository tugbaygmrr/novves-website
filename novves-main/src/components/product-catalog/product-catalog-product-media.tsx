import type { ReactNode } from "react";
import { ProductStandardMedia } from "@/components/product-standard-media";

/** Ürün kataloğu kart görseli — site standardı */
export function ProductCatalogProductMedia({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <ProductStandardMedia src={src} alt={alt} aspect="3/2" className="mb-4">
      {children}
    </ProductStandardMedia>
  );
}
