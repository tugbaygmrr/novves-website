"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

/** Tüm ürün kartları — site CSS değişkeni ile birebir aynı ton */
export const PRODUCT_STANDARD_MEDIA_BG = "var(--sand-200)";

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
  const pathOnly = src.split(/[?#]/)[0];
  if (isCatalogProductPng(src)) {
    // Beyaz stüdyo zemini kalan katalog PNG’leri bej kanvasla birleşir
    if (
      /bear-reb\.png$/i.test(pathOnly) ||
      /heron-rv\.png$/i.test(pathOnly) ||
      /banyo-fan-1\.png$/i.test(pathOnly) ||
      /fox-c\.png$/i.test(pathOnly) ||
      /chicken\.png$/i.test(pathOnly) ||
      /elephant\.png$/i.test(pathOnly) ||
      /chiller\.png$/i.test(pathOnly) ||
      /elektrikli-isitici\.png$/i.test(pathOnly) ||
      /ae-eh-elektrikli-isitici\.png$/i.test(pathOnly) ||
      /alpaca-am\.png$/i.test(pathOnly) ||
      /cyclone\.png$/i.test(pathOnly) ||
      /frekans-inventoru\.png$/i.test(pathOnly)
    ) {
      return true;
    }
    return false;
  }
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
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const currentSrc = failedSrc === src ? fallbackSrc : src;
  const loaded = loadedSrc === currentSrc;
  const useMultiply = multiply ?? productImageNeedsMultiply(currentSrc);
  const usePngSource = isCatalogProductPng(currentSrc);
  const aspectClass = aspect === "none" ? "relative min-h-[12rem] w-full" : `relative ${ASPECT_CLASS[aspect]} w-full`;
  const canvasBg = backgroundColor ?? PRODUCT_STANDARD_MEDIA_BG;
  const skeleton = (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${
        loaded ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-white/10 to-ink/[0.04]" />
      <div className="absolute inset-y-0 -left-1/2 w-1/2 animate-[productMediaSkeleton_1.25s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-ink/5 bg-white/25 shadow-sm sm:h-20 sm:w-20" />
    </div>
  );

  if (fit === "intrinsic") {
    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-visible rounded-xl ring-1 ring-inset ring-ink/[0.06] ${aspectClass} ${containerClassName} ${className}`}
        style={{ backgroundColor: canvasBg }}
      >
        {skeleton}
        <div className="flex h-full min-h-[inherit] w-full items-center justify-center px-5 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8">
          <Image
            src={currentSrc}
            alt={alt}
            width={400}
            height={400}
            priority={priority}
            unoptimized={usePngSource}
            onError={() => {
              if (currentSrc !== fallbackSrc) setFailedSrc(src);
            }}
            onLoad={() => setLoadedSrc(currentSrc)}
            className={`h-auto max-h-[min(13.5rem,42vw)] w-auto max-w-full object-contain object-center transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            } ${
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
      {skeleton}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority={priority}
        unoptimized={usePngSource}
        onError={() => {
          if (currentSrc !== fallbackSrc) setFailedSrc(src);
        }}
        onLoad={() => setLoadedSrc(currentSrc)}
        className={`object-contain object-center p-4 transition duration-500 group-hover:scale-[1.03] sm:p-5 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${
          useMultiply ? "mix-blend-multiply" : ""
        } ${imageClassName}`}
        sizes={sizes}
      />
      {children}
    </div>
  );
}
