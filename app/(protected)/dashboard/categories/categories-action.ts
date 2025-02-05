"use server";

import client from "@/prisma";

export const getAllCategories = async () => {
  try {
    const categories = await client.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return categories;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error}`);
  }
};

export const addCategory = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const slug = name.toLowerCase().replace(/[&\s]+/g, "-");
    const category = await client.category.create({
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
