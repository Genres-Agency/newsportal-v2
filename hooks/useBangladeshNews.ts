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

type BangladeshNewsResponse = {
  featured: NewsItem | null;
  grid: NewsItem[];
};

export function useBangladeshNews() {
  return useQuery<BangladeshNewsResponse>({
    queryKey: ["bangladesh-news"],
    queryFn: async () => {
      const response = await fetch("/api/news/category/sec-news/বাংলাদেশ");
      if (!response.ok) {
        throw new Error("Failed to fetch Bangladesh news");
      }
      return response.json();
    },
  });
}
