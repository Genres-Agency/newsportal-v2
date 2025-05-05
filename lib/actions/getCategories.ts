"use server";
import client from "@/prisma";
import { NewsStatus } from "@prisma/client";

export type CategoryFilter = {
  status?: NewsStatus;
};

export type CategoriesResponse = {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }>;
};

export async function getCategories(
  filter?: CategoryFilter
): Promise<CategoriesResponse> {
  try {
    const status = filter?.status || NewsStatus.PUBLISHED;

    const categories = await client.category.findMany({
      where: { status },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { categories };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch categories"
    );
  }
}
