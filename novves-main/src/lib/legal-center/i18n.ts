import type { LegalCenterUi } from "@/lib/legal-center/types";
import { getLegalUiForLocale } from "@/lib/legal-center/content/locale-loader";

/** Yasal merkez arayüz metinleri — locale JSON dosyasından (yoksa tr/en yedek). */
export function getLegalCenterUi(locale: string): LegalCenterUi {
  return getLegalUiForLocale(locale);
}
