"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useQuoteBasket } from "@/components/quote-basket/quote-basket-provider";
import { formatItemCount, getQuoteBasketUi } from "@/lib/quote-basket/ui";

export function QuoteBasketWidget({ locale }: { locale: string }) {
  const ui = getQuoteBasketUi(locale);
  const pathname = usePathname();
  const { items, hydrated, removeItem, clearItems } = useQuoteBasket();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!hydrated || items.length === 0) return null;

  const formHref = `/${locale}/iletisim#iletisim-formu`;
  const onContactPage = pathname?.includes("/iletisim");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[75] flex items-center gap-2 rounded-full border border-ink/10 bg-sand-100 px-4 py-3 text-sm font-bold text-ink shadow-[0_18px_48px_-20px_rgba(15,22,36,0.45)] transition hover:border-primary/35 hover:text-primary sm:bottom-8 sm:left-8"
        aria-label={ui.openBasket}
      >
        <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75M5.106 5.114H19.5a1.125 1.125 0 0 1 1.086 1.436l-1.53 5.58a1.125 1.125 0 0 1-1.086.814H7.38a1.125 1.125 0 0 1-1.087-.814L4.2 6.55a1.125 1.125 0 0 1 .046-.436M9 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.25-.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
        </svg>
        <span>{ui.basketTitle}</span>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white">
          {items.length}
        </span>
      </button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center">
              <button
                type="button"
                className="absolute inset-0 cursor-default"
                aria-label={ui.closeBasket}
                onClick={() => setOpen(false)}
              />

              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="quote-basket-title"
                className="relative z-[1] flex max-h-[min(88vh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-[1.35rem] border border-ink/10 bg-sand-100 shadow-[0_28px_80px_-24px_rgba(15,22,36,0.45)] sm:rounded-[1.6rem]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4 sm:px-6">
                  <div>
                    <h2 id="quote-basket-title" className="font-eurostile text-xl font-bold text-ink sm:text-2xl">
                      {ui.basketTitle}
                    </h2>
                    <p className="mt-1 text-sm text-secondary/70">
                      {formatItemCount(locale, items.length)} - {ui.basketSubtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-secondary/70 transition hover:border-primary/30 hover:text-primary"
                    aria-label={ui.closeBasket}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-3 rounded-2xl border border-ink/10 bg-white/80 p-4"
                      >
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{item.familyTitle}</p>
                          <p className="mt-1 font-eurostile text-lg font-bold leading-tight text-ink">{item.modelName}</p>
                          {item.modelType ? (
                            <p className="mt-1 text-sm font-semibold text-secondary/70">{item.modelType}</p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 rounded-full border border-ink/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary/70 transition hover:border-red-300 hover:text-red-600"
                        >
                          {ui.remove}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 border-t border-ink/10 px-5 py-4 sm:flex-row sm:px-6">
                  <button
                    type="button"
                    onClick={clearItems}
                    className="inline-flex items-center justify-center rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm font-bold text-secondary/75 transition hover:border-ink/20 hover:text-ink"
                  >
                    {ui.clearBasket}
                  </button>
                  {onContactPage ? (
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        document.getElementById("iletisim-formu")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-deep"
                    >
                      {ui.goToForm}
                    </button>
                  ) : (
                    <Link
                      href={formHref}
                      onClick={() => setOpen(false)}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-deep"
                    >
                      {ui.goToForm}
                    </Link>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
