"use server";

import { getNews, type NewsItem } from "@/lib/actions/news";

export async function getCategoryNews(
  category: string
): Promise<{ news: NewsItem[] }> {
  const news = await getNews({ category });
  return { news };
}
