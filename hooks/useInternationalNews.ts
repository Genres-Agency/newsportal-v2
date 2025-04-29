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
  featuredNews: NewsItem | null;
  sideNews: NewsItem[];
  latestNews: NewsItem[];
};

export function useInternationalNews() {
  return useQuery<InternationalNewsData, Error>({
    queryKey: ["international-news"],
    queryFn: async () => {
      const response = await fetch("/api/news/international");
      if (!response.ok) {
        throw new Error("Failed to fetch international news");
      }
      return response.json();
    },
  });
}
