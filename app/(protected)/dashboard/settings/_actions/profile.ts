"use server";

import { z } from "zod";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

const profileSchema = z.object({
  image: z.string().optional(),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  location: z
    .string()
    .max(100, "Location must not exceed 100 characters")
    .optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export async function updateProfile(data: ProfileFormValues) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const validatedData = profileSchema.parse(data);

    // Update or create profile
    const profile = await db.profile.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        ...validatedData,
      },
      update: validatedData,
    });

    return { success: "Profile updated successfully", profile };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => err.message).join(", ");
      return { error: `Invalid profile data: ${errors}` };
    }

    console.error("[PROFILE_UPDATE_ERROR]", error);

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return { error: "This profile information is already in use" };
      } else if (error.message.includes("Foreign key constraint")) {
        return { error: "Invalid user reference" };
      } else if (error.message.includes("Required")) {
        return { error: "Missing required fields" };
      }
    }

    return { error: "Failed to update profile. Please try again." };
  }
}
