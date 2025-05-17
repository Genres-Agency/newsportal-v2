"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/database.connection";

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
      return { error: "Invalid profile data" };
    }

    return { error: "Something went wrong" };
  }
}
