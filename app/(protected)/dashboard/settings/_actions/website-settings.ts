"use server";

import { z } from "zod";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

const websiteSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  layout: z.enum(["classic", "modern", "arena", "championship", "legacy"]),
  logo: z.string().optional(),
  primaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
  secondaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
});

export type WebsiteSettingsValues = z.infer<typeof websiteSettingsSchema>;

export async function getWebsiteSettings() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const settings = await db.settings.findUnique({
      where: { userId: session.user.id },
    });

    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = await db.settings.create({
        data: {
          userId: session.user.id,
          siteName: "News Portal",
          layout: "modern",
          primaryColor: "#1a73e8",
          secondaryColor: "#4285f4",
        },
      });
      return { settings: defaultSettings };
    }

    return { settings };
  } catch (error) {
    console.error("[SETTINGS_GET]", error);
    return { error: "Failed to fetch settings" };
  }
}

export async function updateWebsiteSettings(data: WebsiteSettingsValues) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const validatedData = websiteSettingsSchema.parse(data);
    const dbData = validatedData;

    const settings = await db.settings.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        ...dbData,
      },
      update: dbData,
    });

    return {
      success: "Website settings updated successfully",
      settings,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid form data" };
    }

    return { error: "Something went wrong" };
  }
}
