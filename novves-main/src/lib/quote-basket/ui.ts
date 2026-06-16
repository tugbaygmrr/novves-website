import type { Locale } from "@/i18n/config";

export type QuoteBasketUi = {
  basketTitle: string;
  basketSubtitle: string;
  addToBasket: string;
  addedToBasket: string;
  remove: string;
  empty: string;
  goToForm: string;
  clearBasket: string;
  formSectionTitle: string;
  formSectionDesc: string;
  messageHeader: string;
  itemSingular: string;
  itemPlural: string;
  openBasket: string;
  closeBasket: string;
};

const TR: QuoteBasketUi = {
  basketTitle: "Teklif Sepeti",
  basketSubtitle: "Se\u00e7ti\u011finiz \u00fcr\u00fcnler teklif formuna aktar\u0131l\u0131r.",
  addToBasket: "Teklif Sepetine Ekle",
  addedToBasket: "Sepete Eklendi",
  remove: "Kald\u0131r",
  empty:
    "Hen\u00fcz \u00fcr\u00fcn eklemediniz. \u00dcr\u00fcn detaylar\u0131ndan sepete ekleyebilirsiniz.",
  goToForm: "Teklif Formuna Git",
  clearBasket: "Sepeti Temizle",
  formSectionTitle: "Teklif Sepetiniz",
  formSectionDesc: "A\u015fa\u011f\u0131daki \u00fcr\u00fcnler mesaj\u0131n\u0131za otomatik eklenecektir.",
  messageHeader: "Teklif talep edilen \u00fcr\u00fcnler:",
  itemSingular: "\u00fcr\u00fcn",
  itemPlural: "\u00fcr\u00fcn",
  openBasket: "Teklif sepetini a\u00e7",
  closeBasket: "Teklif sepetini kapat",
};

const EN: QuoteBasketUi = {
  basketTitle: "Quote Basket",
  basketSubtitle: "Selected products are forwarded to the quote form.",
  addToBasket: "Add to Quote Basket",
  addedToBasket: "Added to Basket",
  remove: "Remove",
  empty: "No products yet. Add items from product detail pages.",
  goToForm: "Go to Quote Form",
  clearBasket: "Clear Basket",
  formSectionTitle: "Your Quote Basket",
  formSectionDesc: "The products below will be included in your message automatically.",
  messageHeader: "Products requested for quote:",
  itemSingular: "item",
  itemPlural: "items",
  openBasket: "Open quote basket",
  closeBasket: "Close quote basket",
};

const UI_BY_LOCALE: Partial<Record<Locale, QuoteBasketUi>> = {
  tr: TR,
  en: EN,
};

export function getQuoteBasketUi(locale: string): QuoteBasketUi {
  return UI_BY_LOCALE[locale as Locale] ?? EN;
}

export function formatItemCount(locale: string, count: number): string {
  const ui = getQuoteBasketUi(locale);
  return `${count} ${count === 1 ? ui.itemSingular : ui.itemPlural}`;
}
