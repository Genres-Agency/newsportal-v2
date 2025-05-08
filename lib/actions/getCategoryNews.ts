"use server";

import client from "@/prisma";
import { notFound } from "next/navigation";
import { NewsStatus } from "@prisma/client";

export type CategoryNewsParams = {
  slug: string;
  page?: number;
  pageSize?: number;
};

export type CategoryNewsResult = {
  category: {
    id: string;
    name: string;
    description: string | null;
    slug: string;
  };
  news: Array<{
    news: {
      id: string;
      title: string;
      slug: string;
      createdAt: Date;
      media: {
        url: string;
      } | null;
    };
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
};

export async function getCategoryNews({
  slug,
  page = 1,
  pageSize = 10,
}: CategoryNewsParams): Promise<CategoryNewsResult> {
  if (!slug) throw new Error("Category slug is required");
  if (page < 1) throw new Error("Page number must be greater than 0");
  if (pageSize < 1) throw new Error("Page size must be greater than 0");

  try {
    const category = await client.category.findUnique({
      where: {
        slug,
        status: NewsStatus.PUBLISHED,
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
              select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
                media: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
          orderBy: {
            news: {
              createdAt: "desc",
            },
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        },
        _count: {
          select: {
            news: {
              where: {
                news: {
                  status: NewsStatus.PUBLISHED,
                },
              },
            },
          },
        },
      },
    });

    if (!category) {
      notFound();
    }

    const totalPages = Math.ceil(category._count.news / pageSize);

    return {
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
        slug: category.slug,
      },
      news: category.news,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
      },
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch category news"
    );
  }
}
