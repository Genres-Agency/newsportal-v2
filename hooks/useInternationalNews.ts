"use client";

import { useQuery } from "@tanstack/react-query";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  media?: { url: string } | null;
  createdAt: Date;
};

type InternationalNewsData = {
  featured: NewsItem | null;
  grid: NewsItem[];
};

export function useInternationalNews() {
  return useQuery<InternationalNewsData, Error>({
    queryKey: ["international-news"],
    queryFn: async () => {
      const response = await fetch("/api/news/category/sec-news/আন্তর্জাতিক");
      if (!response.ok) {
        throw new Error("Failed to fetch international news");
      }
      const news = await response.json();
      return {
        featured: news[0] || null,
        grid: news.slice(1),
      };
    },
  });
}
