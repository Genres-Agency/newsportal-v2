"use server";

import { db } from "@/server/db";

export const getAllCategories = async () => {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return categories;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error}`);
  }
};

export const getEnabledCategories = async () => {
  try {
    const categories = await db.category.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
    return categories;
  } catch (error) {
    throw new Error(`Failed to fetch enabled categories: ${error}`);
  }
};

export const updateCategory = async (id: string, data: any) => {
  try {
    const category = await db.category.update({
      where: { id },
      data,
    });
    return category;
  } catch (error) {
    throw new Error(`Failed to update category: ${error}`);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await db.category.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw new Error(`Failed to delete category: ${error}`);
  }
};

export const addCategory = async ({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) => {
  try {
    const category = await db.category.create({
      data: {
        name,
        slug,
        description,
      },
    });
    return category;
  } catch (error) {
    throw new Error(`Failed to create category: ${error}`);
  }
};
