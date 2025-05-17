"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/database.connection";

const websiteSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  layout: z.string().default("modern"),
  logo: z.string().optional(),
  primaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
  secondaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
});

export type WebsiteSettingsValues = z.infer<typeof websiteSettingsSchema>;

export async function updateWebsiteSettings(data: WebsiteSettingsValues) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const validatedData = websiteSettingsSchema.parse(data);

    const settings = await db.settings.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        ...validatedData,
      },
      update: validatedData,
    });

    return { success: "Website settings updated successfully", settings };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid form data" };
    }

    return { error: "Something went wrong" };
  }
}
