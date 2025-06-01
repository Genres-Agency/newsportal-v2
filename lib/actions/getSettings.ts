"use server";

import { db } from "@/lib/database.connection";

export const getSettings = async () => {
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
