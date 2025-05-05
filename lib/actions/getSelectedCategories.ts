"use server";
import client from "@/prisma";
import { NewsStatus } from "@prisma/client";

export async function getSelectedCategories() {
  try {
    const categories = await client.category.findMany({
      where: {
        status: NewsStatus.PUBLISHED,
        name: {
          in: ["আন্তর্জাতিক", "রাজনীতি", "প্রযুক্তি"],
        },
      },
      include: {
        news: {
          where: {
            news: {
              status: NewsStatus.PUBLISHED,
            },
          },
          include: {
            news: {
              include: {
                media: true,
              },
            },
          },
          orderBy: {
            news: {
              createdAt: "desc",
            },
          },
          take: 2,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { categories };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch categories"
    );
  }
}
