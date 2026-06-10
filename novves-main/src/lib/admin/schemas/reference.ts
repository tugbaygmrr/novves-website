import { z } from "zod";

export const referenceTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  projectName: z.string().trim().max(300).nullish(),
  description: z.string().trim().max(4000).nullish(),
});

export const referenceSchema = z.object({
  firmName: z.string().trim().min(1, "Firma adı gerekli").max(200),
  logoId: z.number().int().positive().nullish(),
  sector: z.string().trim().max(120).nullish(),
  location: z.string().trim().max(160).nullish(),
  completionDate: z.string().trim().min(1).nullish(), // YYYY-MM-DD
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  order: z.number().int().default(0),
  gallery: z.array(z.string().max(500)).max(40).default([]),
  translations: z.array(referenceTranslationSchema).default([]),
});

export type ReferenceInput = z.infer<typeof referenceSchema>;
