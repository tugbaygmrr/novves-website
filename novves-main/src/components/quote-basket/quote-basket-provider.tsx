"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buildContactMessage } from "@/lib/quote-basket/format-message";
import { getQuoteBasketUi } from "@/lib/quote-basket/ui";
import {
  QUOTE_BASKET_UPDATED_EVENT,
  readQuoteBasket,
  writeQuoteBasket,
} from "@/lib/quote-basket/storage";
import { quoteBasketItemId, type QuoteBasketItem } from "@/lib/quote-basket/types";

type AddQuoteBasketItemInput = {
  familyTitle: string;
  modelName: string;
  modelType: string;
  productHref?: string;
};

type QuoteBasketContextValue = {
  items: QuoteBasketItem[];
  hydrated: boolean;
  addItem: (item: AddQuoteBasketItemInput) => boolean;
  removeItem: (id: string) => void;
  clearItems: () => void;
  hasItem: (familyTitle: string, modelName: string, modelType?: string) => boolean;
  buildMessage: (userMessage: string, locale: string) => string;
};

const QuoteBasketContext = createContext<QuoteBasketContextValue | null>(null);

export function QuoteBasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteBasketItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const syncFromStorage = useCallback(() => {
    setItems(readQuoteBasket());
  }, []);

  useEffect(() => {
    syncFromStorage();
    setHydrated(true);

    const onUpdate = () => syncFromStorage();
    window.addEventListener(QUOTE_BASKET_UPDATED_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener(QUOTE_BASKET_UPDATED_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [syncFromStorage]);

  const addItem = useCallback((item: AddQuoteBasketItemInput) => {
    const id = quoteBasketItemId(item.familyTitle, item.modelName, item.modelType);
    const current = readQuoteBasket();
    if (current.some((entry) => entry.id === id)) return false;

    const next: QuoteBasketItem[] = [
      ...current,
      {
        id,
        familyTitle: item.familyTitle,
        modelName: item.modelName,
        modelType: item.modelType,
        productHref: item.productHref,
        addedAt: Date.now(),
      },
    ];

    writeQuoteBasket(next);
    setItems(next);
    return true;
  }, []);

  const removeItem = useCallback((id: string) => {
    const next = readQuoteBasket().filter((item) => item.id !== id);
    writeQuoteBasket(next);
    setItems(next);
  }, []);

  const clearItems = useCallback(() => {
    writeQuoteBasket([]);
    setItems([]);
  }, []);

  const hasItem = useCallback((familyTitle: string, modelName: string, modelType = "") => {
    const id = quoteBasketItemId(familyTitle, modelName, modelType);
    return readQuoteBasket().some((item) => item.id === id);
  }, []);

  const buildMessage = useCallback((userMessage: string, locale: string) => {
    const ui = getQuoteBasketUi(locale);
    return buildContactMessage(userMessage, readQuoteBasket(), ui.messageHeader);
  }, []);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      addItem,
      removeItem,
      clearItems,
      hasItem,
      buildMessage,
    }),
    [addItem, buildMessage, clearItems, hasItem, hydrated, items, removeItem],
  );

  return <QuoteBasketContext.Provider value={value}>{children}</QuoteBasketContext.Provider>;
}

export function useQuoteBasket(): QuoteBasketContextValue {
  const context = useContext(QuoteBasketContext);
  if (!context) {
    throw new Error("useQuoteBasket must be used within QuoteBasketProvider");
  }
  return context;
}
