"use server";

import { db } from "@/server/db";
import { WebsiteSettingsSchema } from "@/schema/settings";
import * as z from "zod";
import { auth } from "@/server/auth";
import { UserRole } from "@prisma/client";

export const getWebsiteSettings = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== UserRole.SUPERADMIN) {
    return { error: "Only superadmins can manage website settings" };
  }

  try {
    const settings = await db.settings.findFirst();

    if (!settings) {
      return { error: "Settings not found" };
    }

    return { settings };
  } catch (error) {
    console.error("[SETTINGS_GET]", error);
    return { error: "Database error while fetching settings" };
  }
};

export const updateWebsiteSettings = async (
  values: z.infer<typeof WebsiteSettingsSchema>
) => {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== UserRole.SUPERADMIN) {
    return { error: "Only superadmins can manage website settings" };
  }

  // Validate layout value
  if (
    !values.layout ||
    !["classic", "modern", "minimal"].includes(values.layout)
  ) {
    return {
      error: "Invalid layout value. Must be 'classic', 'modern', or 'minimal'.",
    };
  }

  try {
    // Get current settings to compare changes
    const currentSettings = await db.settings.findFirst();

    // Validate required fields
    if (!values.siteName || !values.layout) {
      return { error: "Site name and layout are required" };
    }

    // Clean up social media URLs - replace empty strings with null
    const cleanedValues = {
      ...values,
      facebook: values.facebook || null,
      twitter: values.twitter || null,
      instagram: values.instagram || null,
      youtube: values.youtube || null,
      linkedin: values.linkedin || null,
      lastModifiedBy: user.id,
    };

    // Prepare the settings update
    // Get the first superadmin user for settings ownership
    const superadmin = await db.user.findFirst({
      where: { role: UserRole.SUPERADMIN },
    });

    if (!superadmin) {
      return { error: "No superadmin found in the system" };
    }

    const settings = await db.settings.upsert({
      where: { userId: superadmin.id },
      create: {
        userId: superadmin.id,
        ...cleanedValues,
      },
      update: cleanedValues,
    });

    if (!settings) {
      return { error: "Failed to save settings" };
    }

    // Log the changes
    await db.settingsLog.create({
      data: {
        settingsId: settings.id,
        modifiedBy: user.id,
        changes: {
          previous: currentSettings || null,
          updated: cleanedValues,
        },
      },
    });

    return { settings };
  } catch (error) {
    console.error("[SETTINGS_UPDATE]", error);

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return { error: "A settings record already exists for this user" };
      } else if (error.message.includes("Foreign key constraint")) {
        return { error: "Invalid user reference" };
      } else if (error.message.includes("Required")) {
        return { error: "Missing required fields in settings update" };
      }
    }

    return {
      error: "Database error while updating settings. Please try again.",
    };
  }
};
