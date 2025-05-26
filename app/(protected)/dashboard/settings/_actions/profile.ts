"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/database.connection";
import { getUserById } from "@/lib/actions/user.action";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
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

    // Use the existing getUserById function to verify user
    const existingUser = await getUserById(session.user.id);

    if (!existingUser) {
      return { error: "User account not found. Please try logging in again." };
    }

    // Check if image size is too large (if it's a base64 string)
    if (data.image && data.image.startsWith("data:image")) {
      const base64Size = Math.ceil((data.image.length * 3) / 4);
      if (base64Size > 5 * 1024 * 1024) {
        // 5MB limit
        return {
          error: "Image size too large. Please use an image under 5MB.",
        };
      }
    }

    const validatedData = profileSchema.parse(data);
    const { name, ...profileData } = validatedData;

    // Update user and profile in a transaction
    const result = await db.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: session.user.id },
        data: { name },
      });

      const profile = await tx.profile.upsert({
        where: { userId: session.user.id },
        create: {
          userId: session.user.id,
          ...profileData,
        },
        update: profileData,
      });

      return { user: updatedUser, profile };
    });

    return {
      success: "Profile updated successfully",
      user: result.user,
      profile: result.profile,
    };
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
      } else if (error.message.includes("value too long")) {
        return { error: "Image file size is too large for the database" };
      }
    }

    return { error: "Failed to update profile. Please try again." };
  }
}
