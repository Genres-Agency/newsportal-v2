"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/database.connection";
import { WebsiteSettingsSchema } from "@/schema/settings";
import * as z from "zod";

export const getWebsiteSettings = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    let settings = await db.settings.findUnique({
      where: { userId: user.id },
    });

    if (!settings) {
      // Create default settings if none exist
      settings = await db.settings.create({
        data: {
          userId: user.id,
          siteName: "News Portal",
          layout: "modern",
          primaryColor: "#1a73e8",
          secondaryColor: "#4285f4",
        },
      });
    }

    return { settings };
  } catch (error) {
    console.error("[SETTINGS_GET]", error);
    return { error: "Failed to fetch settings" };
  }
};

export const updateWebsiteSettings = async (
  values: z.infer<typeof WebsiteSettingsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const settings = await db.settings.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...values,
      },
      update: values,
    });

    return { settings };
  } catch (error) {
    console.error("[SETTINGS_UPDATE]", error);
    return { error: "Failed to update settings" };
  }
};
