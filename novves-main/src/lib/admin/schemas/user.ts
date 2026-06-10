import { z } from "zod";
import { ROLES } from "@/lib/admin/rbac";

const roleEnum = z.enum(ROLES as unknown as [string, ...string[]]);

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "En az 3 karakter")
    .max(60)
    .regex(/^[a-zA-Z0-9_.-]+$/, "Yalnızca harf, rakam, . _ -"),
  password: z.string().min(8, "Şifre en az 8 karakter").max(200),
  role: roleEnum,
  isActive: z.boolean().default(true),
});

export const updateUserSchema = z.object({
  role: roleEnum.optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8, "Şifre en az 8 karakter").max(200).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
