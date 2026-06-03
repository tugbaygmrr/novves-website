import type { ReactNode } from "react";
import {
  PRODUCT_STANDARD_MEDIA_BG,
  ProductStandardMedia,
} from "@/components/product-standard-media";

/** @deprecated — `PRODUCT_STANDARD_MEDIA_BG` kullanın */
export const SOLUTION_LIBRARY_PRODUCT_MEDIA_BG = PRODUCT_STANDARD_MEDIA_BG;

export function SolutionLibraryProductMedia({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <ProductStandardMedia src={src} alt={alt} aspect="3/2" className="mb-4 rounded-lg">
      {children}
    </ProductStandardMedia>
  );
}
