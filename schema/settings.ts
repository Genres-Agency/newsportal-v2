import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  role: z.optional(
    z.enum([UserRole.ADMIN, UserRole.USER, UserRole.JOURNALIST])
  ),
  isTwoFactorEnabled: z.optional(z.boolean()),
  image: z.optional(z.string()),
});
