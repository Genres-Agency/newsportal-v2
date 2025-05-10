"use server";

import { db } from "@/lib/database.connection";
import { NewsStatus } from "@prisma/client";

export type Media = {
  url: string;
  title: string;
  description: string | null;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media: Media | null;
  createdAt: Date;
  status: NewsStatus;
};

type NewsQueryOptions = {
  category?: string;
  status?: NewsStatus;
  take?: number;
  skip?: number;
  featured?: boolean;
  orderBy?: {
    createdAt: "asc" | "desc";
  };
};

export async function getNews(
  options: NewsQueryOptions = {}
): Promise<NewsItem[]> {
  const {
    category,
    status = NewsStatus.PUBLISHED,
    take,
    skip,
    featured = false,
  } = options;

  try {
    const where: any = {
      status,
    };

    if (category) {
      where.categories = {
        some: {
          category: {
            name: category,
          },
        },
      };
    }

    const news = await db.news.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
      include: {
        media: {
          select: {
            url: true,
            title: true,
            description: true,
            type: true,
          },
        },
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return news;
  } catch (error) {
    console.error(`Error fetching news:`, error);
    throw new Error("Failed to fetch news");
  }
}

export async function getLatestHeroNews(): Promise<NewsItem[]> {
  return getNews({
    status: NewsStatus.PUBLISHED,
    take: 15,
    orderBy: {
      createdAt: "desc",
    },
  });
}
