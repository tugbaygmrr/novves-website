"use client";

import type { ReactNode } from "react";
import { QuoteBasketProvider } from "@/components/quote-basket/quote-basket-provider";
import { QuoteBasketWidget } from "@/components/quote-basket/quote-basket-widget";

export function QuoteBasketShell({ locale, children }: { locale: string; children: ReactNode }) {
  return (
    <QuoteBasketProvider>
      {children}
      <QuoteBasketWidget locale={locale} />
    </QuoteBasketProvider>
  );
}
