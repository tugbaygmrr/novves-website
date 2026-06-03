"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/** Tüm ürün kartları — tek tip bej kanvas (çözüm kütüphanesi ile aynı) */
export const PRODUCT_STANDARD_MEDIA_BG = "#ecebe6";

export type ProductMediaAspect = "3/2" | "4/3" | "square" | "none";

/** `fill` — kart grid; `intrinsic` — ürün tam görünsün (üst kesilmesin) */
export type ProductMediaFit = "fill" | "intrinsic";

const ASPECT_CLASS: Record<Exclude<ProductMediaAspect, "none">, string> = {
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  square: "aspect-square",
};

/** `public/images/products` altındaki katalog PNG’leri (aksesuar, otomasyon vb.) */
export function isCatalogProductPng(src: string): boolean {
  const pathOnly = src.split(/[?#]/)[0];
  return (
    pathOnly.startsWith("/images/products/") &&
    !pathOnly.includes("/categories/") &&
    /\.png$/i.test(pathOnly)
  );
}

/** Yalnızca JPEG — PNG’ler doğrudan bej kanvas üzerinde (fan/aksesuar/otomasyon standardı) */
export function productImageNeedsMultiply(src: string): boolean {
  if (isCatalogProductPng(src)) return false;
  return /\.(jpe?g)(\?|#|$)/i.test(src);
}

export function ProductStandardMedia({
  src,
  alt,
  aspect = "3/2",
  className = "",
  containerClassName = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  multiply,
  backgroundColor,
  fit = "fill",
  fallbackSrc = "/images/products/categories/aksesuarlar-card-hero.png",
  children,
}: {
  src: string;
  alt: string;
  /** 404 veya bozuk URL’de gösterilecek yedek */
  fallbackSrc?: string;
  aspect?: ProductMediaAspect;
  fit?: ProductMediaFit;
  /** Dış sarmalayıcı (mb-4 vb.) */
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  multiply?: boolean;
  /** Varsayılan: `PRODUCT_STANDARD_MEDIA_BG` — doküman kütüphanesi gibi sayfalarda `var(--sand-200)` */
  backgroundColor?: string;
  children?: ReactNode;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);
  const useMultiply = multiply ?? productImageNeedsMultiply(currentSrc);
  const usePngSource = isCatalogProductPng(currentSrc);
  const aspectClass = aspect === "none" ? "relative min-h-[12rem] w-full" : `relative ${ASPECT_CLASS[aspect]} w-full`;
  const canvasBg = backgroundColor ?? PRODUCT_STANDARD_MEDIA_BG;

  if (fit === "intrinsic") {
    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-visible rounded-xl ring-1 ring-inset ring-ink/[0.06] ${aspectClass} ${containerClassName} ${className}`}
        style={{ backgroundColor: canvasBg }}
      >
        <div className="flex h-full min-h-[inherit] w-full items-center justify-center px-5 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8">
          <Image
            src={currentSrc}
            alt={alt}
            width={400}
            height={400}
            priority={priority}
            unoptimized={usePngSource}
            onError={() => {
              if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
            }}
            className={`h-auto max-h-[min(13.5rem,42vw)] w-auto max-w-full object-contain object-center ${
              useMultiply ? "mix-blend-multiply" : ""
            } ${imageClassName}`}
            sizes={sizes}
          />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`${aspectClass} overflow-hidden rounded-xl ring-1 ring-inset ring-ink/[0.06] ${containerClassName} ${className}`}
      style={{ backgroundColor: canvasBg }}
    >
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority={priority}
        unoptimized={usePngSource}
        onError={() => {
          if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        }}
        className={`object-contain object-center p-4 transition duration-500 group-hover:scale-[1.03] sm:p-5 ${
          useMultiply ? "mix-blend-multiply" : ""
        } ${imageClassName}`}
        sizes={sizes}
      />
      {children}
    </div>
  );
}
