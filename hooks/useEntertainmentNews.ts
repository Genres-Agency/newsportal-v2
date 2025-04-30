"use client";

import { useQuery } from "@tanstack/react-query";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  media?: { url: string } | null;
  createdAt: Date;
}

type EntertainmentNewsData = {
  featuredNews: NewsItem | null;
  timelineNews: NewsItem[];
};

export function useEntertainmentNews() {
  return useQuery<EntertainmentNewsData, Error>({
    queryKey: ["entertainment-news"],
    queryFn: async () => {
      const response = await fetch("/api/news/category/sec-news/বিনোদন");
      if (!response.ok) {
        throw new Error("Failed to fetch entertainment news");
      }
      const news = await response.json();
      return {
        featuredNews: news[0],
        timelineNews: news.slice(1),
      };
    },
  });
}
