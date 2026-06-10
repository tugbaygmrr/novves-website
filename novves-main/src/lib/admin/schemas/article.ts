import { z } from "zod";

export const articleTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  title: z.string().trim().min(1, "Başlık gerekli").max(300),
  excerpt: z.string().trim().max(600).nullish(),
  body: z.string().trim().max(60000).nullish(),
});

export const articleSchema = z.object({
  slug: z.string().trim().max(200).optional(),
  coverId: z.number().int().positive().nullish(),
  category: z.string().trim().max(80).nullish(),
  tags: z.array(z.string().trim().max(40)).max(25).default([]),
  author: z.string().trim().max(120).nullish(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  publishAt: z.string().trim().min(1).nullish(), // YYYY-MM-DD veya ISO
  order: z.number().int().default(0),
  translations: z.array(articleTranslationSchema).min(1, "En az bir dil (TR) gerekli"),
});

export type ArticleInput = z.infer<typeof articleSchema>;
