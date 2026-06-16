import type { QuoteBasketItem } from "@/lib/quote-basket/types";

export function formatQuoteBasketLines(items: QuoteBasketItem[], header: string): string {
  if (!items.length) return "";

  const lines = items.map((item) => {
    const type = item.modelType.trim();
    return `- ${item.familyTitle} - ${item.modelName}${type ? ` (${type})` : ""}`;
  });

  return `${header}\n${lines.join("\n")}`;
}

export function buildContactMessage(userMessage: string, items: QuoteBasketItem[], header: string): string {
  const basketBlock = formatQuoteBasketLines(items, header);
  const trimmed = userMessage.trim();

  if (!basketBlock) return trimmed;
  if (!trimmed) return basketBlock;
  return `${basketBlock}\n\n${trimmed}`;
}
