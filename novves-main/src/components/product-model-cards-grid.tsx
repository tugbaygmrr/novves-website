"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ProductStandardMedia } from "@/components/product-standard-media";
import { useQuoteBasket } from "@/components/quote-basket/quote-basket-provider";
import type { ProductModel } from "@/components/product-detail-page";
import {
  formatModelNumber,
  parseModelImages,
  productImageShadowClass,
} from "@/lib/product-model-media";
import { getQuoteBasketUi } from "@/lib/quote-basket/ui";
export type ProductModelCardsLabels = {
  productFamily: string;
  inspect: string;
  detailedView: string;
  readLess: string;
  technicalSupportRequest?: string;
};

type ProductModelCardsGridProps = {
  models: ProductModel[];
  labels: ProductModelCardsLabels;
  familyTitle: string;
  locale: string;
  contactHref?: string;
};

export function ProductModelCardsGrid({
  models,
  labels,
  familyTitle,
  locale,
  contactHref,
}: ProductModelCardsGridProps) {
  const pathname = usePathname();
  const basketUi = getQuoteBasketUi(locale);
  const { items, addItem, hasItem } = useQuoteBasket();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [inBasket, setInBasket] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const closePanel = useCallback(() => {
    setPanelVisible(false);
    window.setTimeout(() => setSelectedIndex(null), 200);
  }, []);

  const openPanel = useCallback((index: number) => {
    setSelectedIndex(index);
    requestAnimationFrame(() => setPanelVisible(true));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      setPanelVisible(false);
      return;
    }

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closePanel, selectedIndex]);

  const handleCardKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel(index);
    }
  };

  const selectedModel = selectedIndex !== null ? models[selectedIndex] : null;
  const selectedImages = selectedModel ? parseModelImages(selectedModel.image) : [];
  const selectedImage = selectedImages[0] ?? "";

  useEffect(() => {
    if (!selectedModel) {
      setInBasket(false);
      return;
    }
    setInBasket(hasItem(familyTitle, selectedModel.name, selectedModel.type));
  }, [familyTitle, hasItem, items, selectedModel]);

  const handleAddToBasket = () => {
    if (!selectedModel || inBasket) return;
    const added = addItem({
      familyTitle,
      modelName: selectedModel.name,
      modelType: selectedModel.type,
      productHref: pathname ?? undefined,
    });
    if (added) setInBasket(true);
  };
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
        {models.map((model, index) => {
          const modelImages = parseModelImages(model.image);

          return (
            <article
              key={`${index}::${model.name}::${model.type}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-sand-100/85 p-4 shadow-[0_8px_32px_-24px_rgba(15,22,36,0.16)] ring-1 ring-ink/[0.06] transition duration-300 hover:-translate-y-1 hover:bg-sand-100 hover:shadow-[0_20px_54px_-30px_rgba(15,22,36,0.3)] sm:rounded-[1.35rem] sm:p-5"
            >
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => openPanel(index)}
                onKeyDown={(event) => handleCardKeyDown(event, index)}
                className="flex min-h-0 flex-1 flex-col text-left"
              >
                {modelImages.length > 1 ? (
                  <div className="relative grid grid-cols-2 gap-1">
                    {modelImages.map((src, imageIndex) => (
                      <ProductStandardMedia
                        key={`${src}-${imageIndex}`}
                        src={src}
                        alt={`${model.name} ${imageIndex + 1}`}
                        aspect="square"
                        containerClassName="min-h-[11.5rem] sm:min-h-[12.5rem] lg:min-h-[13.5rem]"
                        imageClassName={productImageShadowClass(src)}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
                      />
                    ))}
                    <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-ink px-2.5 py-1 font-eurostile text-[10px] font-bold tabular-nums tracking-wide text-white sm:left-3 sm:top-3">
                      {formatModelNumber(index)}
                    </span>
                    <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full bg-sand-100/90 px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-primary ring-1 ring-ink/[0.06] sm:right-3 sm:top-3 sm:px-2.5 sm:text-[8px] sm:tracking-[0.14em]">
                      {labels.productFamily}
                    </span>
                  </div>
                ) : (
                  <ProductStandardMedia
                    src={modelImages[0] ?? ""}
                    alt={model.name}
                    aspect="3/2"
                    containerClassName="min-h-[11.5rem] sm:min-h-[12.5rem] lg:min-h-[13.5rem]"
                    imageClassName={productImageShadowClass(modelImages[0] ?? "")}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  >
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-ink px-2.5 py-1 font-eurostile text-[10px] font-bold tabular-nums tracking-wide text-white sm:left-3 sm:top-3">
                      {formatModelNumber(index)}
                    </span>
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-sand-100/90 px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-primary ring-1 ring-ink/[0.06] sm:right-3 sm:top-3 sm:px-2.5 sm:text-[8px] sm:tracking-[0.14em]">
                      {labels.productFamily}
                    </span>
                  </ProductStandardMedia>
                )}
                <div className="flex min-h-0 flex-1 flex-col pt-3.5 sm:pt-4">
                  <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                    <span className="shrink-0 font-eurostile text-base font-bold tabular-nums leading-tight text-primary sm:text-lg">
                      {formatModelNumber(index)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="product-card-clamp-2 font-eurostile text-lg font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-xl">
                        {model.name}
                      </h3>
                      <p className="mt-1 truncate text-[13px] font-semibold text-primary sm:text-sm">{model.type}</p>
                    </div>
                  </div>
                  <p className="product-card-clamp-3 mt-3 text-[13px] leading-6 text-secondary/72 sm:text-sm">
                    {model.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between border-t border-ink/10 pt-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-secondary/45 sm:text-[10px] sm:tracking-[0.18em]">
                        {labels.inspect}
                      </span>
                      <Image
                        src="/images/novves-logo.svg"
                        alt="Novves"
                        width={100}
                        height={28}
                        className="h-5 w-auto opacity-[0.82] transition-opacity duration-300 group-hover:opacity-100 sm:h-6"
                      />
                    </div>
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {mounted && selectedModel && selectedIndex !== null
        ? createPortal(
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
              <button
                type="button"
                className="absolute inset-0 cursor-default"
                aria-label={labels.readLess}
                onClick={closePanel}
              />

              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-model-dialog-title"
                className={`relative z-[1] flex max-h-[min(92vh,52rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.35rem] border border-ink/10 bg-sand-100 shadow-[0_28px_80px_-24px_rgba(15,22,36,0.45)] transition-all duration-200 ease-out sm:rounded-[1.6rem] ${
                  panelVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"
                }`}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-4 py-4 sm:px-6 sm:py-5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.22em]">
                      {labels.detailedView}
                    </p>
                    <h2
                      id="product-model-dialog-title"
                      className="mt-1 font-eurostile text-xl font-bold leading-tight tracking-[-0.025em] text-ink sm:text-2xl"
                    >
                      {selectedModel.name}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-primary sm:text-base">{selectedModel.type}</p>
                  </div>
                  <button
                    type="button"
                    onClick={closePanel}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-secondary/70 transition hover:border-primary/30 hover:text-primary"
                    aria-label={labels.readLess}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-6">
                    {selectedImages.length > 1 ? (
                      <div className="relative grid grid-cols-2 gap-2">
                        {selectedImages.map((src, imageIndex) => (
                          <ProductStandardMedia
                            key={`${src}-${imageIndex}`}
                            src={src}
                            alt={`${selectedModel.name} ${imageIndex + 1}`}
                            aspect="square"
                            fit="intrinsic"
                            containerClassName="min-h-[11rem] sm:min-h-[13rem]"
                            imageClassName={productImageShadowClass(src)}
                            className="rounded-[1rem]"
                            sizes="(max-width: 768px) 45vw, 14vw"
                          />
                        ))}
                        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 font-eurostile text-[10px] font-bold tabular-nums text-white sm:left-4 sm:top-4">
                          {formatModelNumber(selectedIndex)}
                        </span>
                      </div>
                    ) : (
                      <ProductStandardMedia
                        src={selectedImage}
                        alt={selectedModel.name}
                        aspect="4/3"
                        fit="intrinsic"
                        containerClassName="min-h-[11rem] sm:min-h-[13rem]"
                        imageClassName={productImageShadowClass(selectedImage)}
                        className="rounded-[1rem]"
                        sizes="(max-width: 768px) 100vw, 28vw"
                      >
                        <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 font-eurostile text-[10px] font-bold tabular-nums text-white sm:left-4 sm:top-4">
                          {formatModelNumber(selectedIndex)}
                        </span>
                      </ProductStandardMedia>
                    )}

                    <div className="min-w-0">
                      <p className="text-[14px] leading-7 text-secondary/80 sm:text-[15px]">{selectedModel.description}</p>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <button
                          type="button"
                          onClick={handleAddToBasket}
                          disabled={inBasket}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                            inBasket
                              ? "border border-primary/25 bg-primary/10 text-primary"
                              : "bg-ink text-white hover:bg-ink/90"
                          }`}
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75M5.106 5.114H19.5a1.125 1.125 0 0 1 1.086 1.436l-1.53 5.58a1.125 1.125 0 0 1-1.086.814H7.38a1.125 1.125 0 0 1-1.087-.814L4.2 6.55a1.125 1.125 0 0 1 .046-.436M9 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.25-.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                          </svg>
                          {inBasket ? basketUi.addedToBasket : basketUi.addToBasket}
                        </button>
                        {contactHref && labels.technicalSupportRequest ? (
                          <Link
                            href={contactHref}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:border-primary/30 hover:text-primary"
                          >
                            {labels.technicalSupportRequest}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        ) : null}
                      </div>
                    </div>                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
