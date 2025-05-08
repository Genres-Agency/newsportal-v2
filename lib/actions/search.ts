"use server";

import { db } from "@/lib/database.connection";
import { NewsStatus } from "@prisma/client";
import { NewsItem } from "./news";

export async function searchNews(query: string): Promise<NewsItem[]> {
  if (!query.trim()) return [];

  try {
    const news = await db.news.findMany({
      where: {
        status: NewsStatus.PUBLISHED,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        media: {
          select: {
            url: true,
            title: true,
            description: true,
          },
        },
      },
    });

    return news;
  } catch (error) {
    console.error(`Error searching news:`, error);
    throw new Error("Failed to search news");
  }
}
