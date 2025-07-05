"use server";

import { db } from "@/server/db";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
}

export async function getFullUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function updateUserImage(userId: string, imageUrl: string) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user image:", error);
    return null;
  }
}

export async function getUserProfile(userId: string) {
  try {
    // First try to find existing profile
    let profile = await db.profile.findUnique({
      where: { userId },
    });

    // If profile doesn't exist, create one
    if (!profile) {
      const user = await getUserById(userId);
      if (!user) return null;

      profile = await db.profile.create({
        data: {
          userId,
          image: user.image, // Use user's image as default
          bio: "",
          location: "",
          website: "",
        },
      });
    }

    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
