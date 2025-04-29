"use client";

import { useQuery } from "@tanstack/react-query";

type Media = {
  url: string;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media: Media | null;
  createdAt: Date;
};

type PoliticalNewsData = {
  featuredNews: NewsItem | null;
  regularNews: NewsItem[];
};

export function usePoliticalNews() {
  return useQuery<PoliticalNewsData>({
    queryKey: ["political-news"],
    queryFn: async () => {
      const response = await fetch("/api/news/political");
      if (!response.ok) {
        throw new Error("Failed to fetch political news");
      }
      return response.json();
    },
  });
}
