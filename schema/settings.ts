import * as z from "zod";

export const LayoutOptions = [
  "classic",
  "modern",
  "arena",
  "championship",
  "legacy",
] as const;

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  isTwoFactorEnabled: z.optional(z.boolean()),
  image: z.optional(z.string()),
});

export const WebsiteSettingsSchema = z.object({
  siteName: z.string().min(1, "Website name is required"),
  layout: z.enum(LayoutOptions, {
    required_error: "Please select a layout",
  }),
  logo: z.string().optional(),
  primaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
  secondaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
  themePresets: z
    .object({
      wrestlingMode: z.boolean().default(false),
      useCustomColors: z.boolean().default(false),
      showChampionshipBelt: z.boolean().default(true),
      animatedEntrances: z.boolean().default(true),
    })
    .optional(),
});

export type WebsiteSettingsValues = z.infer<typeof WebsiteSettingsSchema>;
