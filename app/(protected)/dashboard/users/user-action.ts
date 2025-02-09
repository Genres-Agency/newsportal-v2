"use server";

import client from "@/prisma";
import { UserRole } from "@prisma/client";

export const postNews = async ({
  title,
  content,
  category,
  image,
}: {
  title: string;
  content: string;
  category: string;
  image: string;
}) => {
  try {
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const news = await client.news.create({
      data: {
        title,
        slug,
        content,
        category,
        image,
      },
    });
    return news;
  } catch (error) {
    throw new Error(`Failed to create news: ${error}`);
  }
};

export const getAllNews = async () => {
  try {
    const news = await client.news.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        category: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        status: true, // This should now work
      },
    });
    return news;
  } catch (error) {
    throw new Error(`Failed to fetch news: ${error}`);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await client.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const updateUserRole = async (userId: string, role: UserRole) => {
  try {
    const user = await client.user.update({
      where: { id: userId },
      data: { role },
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to update user role: ${error}`);
  }
};
