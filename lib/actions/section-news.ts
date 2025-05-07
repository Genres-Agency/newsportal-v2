"use server";

import { getNews, type NewsItem } from "@/lib/actions/news";

export async function getSectionNews(
  category: string,
  limit: number = 10
): Promise<NewsItem[]> {
  try {
    const news = await getNews({
      category,
      take: limit,
    });

    return news;
  } catch (error) {
    console.error(`Error fetching section news:`, error);
    throw new Error("Failed to fetch section news");
  }
}
