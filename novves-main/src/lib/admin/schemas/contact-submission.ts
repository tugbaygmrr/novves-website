import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1, "Ad gerekli").max(160),
  company: z.string().trim().max(200).optional(),
  email: z.string().trim().email("Geçerli e-posta girin").max(200),
  phone: z.string().trim().max(60).optional(),
  department: z.string().trim().max(120).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Mesaj gerekli").max(5000),
  kvkkConsent: z.boolean().refine((v) => v === true, { message: "KVKK onayı gerekli" }),
  // bal küpü (bot tuzağı) — doluysa istek sessizce yutulur
  website: z.string().optional(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
