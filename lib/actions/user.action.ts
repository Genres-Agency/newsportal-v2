"use server";

import { db } from "../database.connection";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    console.log("user>>", user);
    return user;
  } catch {
    console.log("user error");
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
