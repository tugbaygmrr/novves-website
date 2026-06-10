import { z } from "zod";

export const teamTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  name: z.string().trim().min(1, "Ad gerekli").max(160),
  title: z.string().trim().max(200).nullish(),
  bio: z.string().trim().max(3000).nullish(),
});

export const teamMemberSchema = z.object({
  photoId: z.number().int().positive().nullish(),
  email: z.string().trim().max(200).nullish(),
  phone: z.string().trim().max(60).nullish(),
  linkedin: z.string().trim().max(300).nullish(),
  department: z.string().trim().max(120).nullish(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  order: z.number().int().default(0),
  translations: z.array(teamTranslationSchema).min(1, "En az bir dil (TR) gerekli"),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
