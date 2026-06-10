import { z } from "zod";

export const productTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  name: z.string().trim().min(1, "Ürün adı gerekli").max(200),
  shortDesc: z.string().trim().max(800).nullish(),
  longDesc: z.string().trim().max(12000).nullish(),
});

export const productSpecSchema = z.object({
  label: z.string().trim().min(1).max(120),
  value: z.string().trim().max(300),
});

export const productFileSchema = z.object({
  path: z.string().max(500),
  kind: z.string().max(40), // datasheet | catalog | certificate | drawing
  label: z.string().max(200).optional(),
});

export const productSchema = z.object({
  slug: z.string().trim().max(200).optional(),
  categoryId: z.number().int().positive(),
  coverPath: z.string().max(500).nullish(),
  gallery: z.array(z.string().max(500)).max(40).default([]),
  specs: z.array(productSpecSchema).max(80).default([]),
  files: z.array(productFileSchema).max(40).default([]),
  relatedSlugs: z.array(z.string().max(200)).max(20).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  order: z.number().int().default(0),
  translations: z.array(productTranslationSchema).min(1, "En az bir dil (TR) gerekli"),
});

export type ProductInput = z.infer<typeof productSchema>;
