import { z } from "zod";

/** Menü konumları — public bileşenlerin okuduğu yerler. */
export const MENU_LOCATIONS = ["header", "footer_legal", "footer_quick"] as const;
export type MenuLocation = (typeof MENU_LOCATIONS)[number];

export const MENU_LOCATION_LABELS: Record<MenuLocation, string> = {
  header: "Üst Menü (Navigasyon)",
  footer_legal: "Footer Alt Bar (Yasal)",
  footer_quick: "Footer Hızlı Erişim",
};

export const menuTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  label: z.string().trim().min(1, "Etiket gerekli").max(160),
});

export const menuItemSchema = z.object({
  location: z.enum(MENU_LOCATIONS),
  parentId: z.number().int().positive().nullish(),
  href: z.string().trim().min(1, "Bağlantı (href) gerekli").max(500),
  icon: z.string().trim().max(80).nullish(),
  order: z.number().int().default(0),
  visible: z.boolean().default(true),
  external: z.boolean().default(false),
  translations: z.array(menuTranslationSchema).min(1, "En az bir dil (TR) gerekli"),
});

export type MenuItemInput = z.infer<typeof menuItemSchema>;
