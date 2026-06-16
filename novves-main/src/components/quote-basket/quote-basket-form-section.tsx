"use client";

import { useQuoteBasket } from "@/components/quote-basket/quote-basket-provider";
import { formatItemCount, getQuoteBasketUi } from "@/lib/quote-basket/ui";

export function QuoteBasketFormSection({ locale }: { locale: string }) {
  const ui = getQuoteBasketUi(locale);
  const { items, hydrated, removeItem, clearItems } = useQuoteBasket();

  if (!hydrated || items.length === 0) return null;

  return (
    <div className="mb-8 rounded-2xl border border-hz-outline-variant/30 bg-hz-surface-container-low p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-black text-hz-on-surface sm:text-xl">{ui.formSectionTitle}</h3>
          <p className="mt-1 text-sm text-hz-on-surface-variant">
            {formatItemCount(locale, items.length)} - {ui.formSectionDesc}
          </p>
        </div>
        <button
          type="button"
          onClick={clearItems}
          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-hz-outline-variant/40 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-hz-on-surface-variant transition hover:border-hz-secondary/40 hover:text-hz-secondary"
        >
          {ui.clearBasket}
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-hz-outline-variant/25 bg-white px-4 py-3"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-hz-secondary">{item.familyTitle}</p>
              <p className="mt-1 font-semibold text-hz-on-surface">{item.modelName}</p>
              {item.modelType ? <p className="mt-0.5 text-sm text-hz-on-surface-variant">{item.modelType}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-hz-on-surface-variant transition hover:text-red-600"
            >
              {ui.remove}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
