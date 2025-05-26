"use server";

import { db } from "@/lib/database.connection";

export const getSettings = async () => {
  try {
    let settings = await db.settings.findFirst();
    if (!settings) {
      // Create default settings if none exist
      settings = await db.settings.create({
        data: {
          userId: "default",
          siteName: "News Portal",
          layout: "modern",
          primaryColor: "#1a73e8",
          secondaryColor: "#4285f4",
          primaryForegroundColor: "#ffffff",
          secondaryForegroundColor: "#000000",
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
          linkedin: "",
        },
      });
    }
    return { settings };
  } catch (error) {
    console.error("[SETTINGS_GET]", error);
    return { error: "Failed to fetch settings" };
  }
};
