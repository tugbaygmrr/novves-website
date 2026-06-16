import type { QuoteBasketItem } from "@/lib/quote-basket/types";

export const QUOTE_BASKET_STORAGE_KEY = "novves_quote_basket";
export const QUOTE_BASKET_UPDATED_EVENT = "quote-basket-updated";

export function readQuoteBasket(): QuoteBasketItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(QUOTE_BASKET_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is QuoteBasketItem =>
        !!item &&
        typeof item === "object" &&
        typeof (item as QuoteBasketItem).id === "string" &&
        typeof (item as QuoteBasketItem).familyTitle === "string" &&
        typeof (item as QuoteBasketItem).modelName === "string",
    );
  } catch {
    return [];
  }
}

export function writeQuoteBasket(items: QuoteBasketItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUOTE_BASKET_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(QUOTE_BASKET_UPDATED_EVENT));
}

export function notifyQuoteBasketUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(QUOTE_BASKET_UPDATED_EVENT));
}
