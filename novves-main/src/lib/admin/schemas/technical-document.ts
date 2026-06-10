import { z } from "zod";

export const docTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  title: z.string().trim().min(1, "Başlık gerekli").max(300),
  description: z.string().trim().max(3000).nullish(),
});

export const technicalDocumentSchema = z.object({
  slug: z.string().trim().max(200).optional(),
  categoryId: z.number().int().positive(),
  fileId: z.number().int().positive(),
  coverId: z.number().int().positive().nullish(),
  version: z.string().trim().max(50).nullish(),
  publishDate: z.string().trim().min(1).nullish(), // "YYYY-MM-DD" veya ISO
  productSlug: z.string().trim().max(200).nullish(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  order: z.number().int().default(0),
  translations: z.array(docTranslationSchema).min(1, "En az bir dil (TR) gerekli"),
});

export type TechnicalDocumentInput = z.infer<typeof technicalDocumentSchema>;
