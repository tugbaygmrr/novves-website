export type QuoteBasketItem = {
  id: string;
  familyTitle: string;
  modelName: string;
  modelType: string;
  productHref?: string;
  addedAt: number;
};

export function quoteBasketItemId(familyTitle: string, modelName: string, modelType = ""): string {
  return `${familyTitle}::${modelName}::${modelType}`;
}