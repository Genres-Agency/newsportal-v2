import { useQuery } from "@tanstack/react-query";

type SportsNewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  media?: { url: string } | null;
  createdAt: Date;
};

type SportsNewsData = {
  featuredMatches: SportsNewsItem[];
  latestNews: SportsNewsItem[];
};

export function useSportsNews() {
  return useQuery<SportsNewsData, Error>({
    queryKey: ["sports-news"],
    queryFn: async () => {
      const response = await fetch("/api/news/category/sec-news/খেলাধুলা");
      if (!response.ok) {
        throw new Error("Failed to fetch sports news");
      }
      const news = await response.json();
      return {
        featuredMatches: news.slice(0, 2),
        latestNews: news.slice(2, 6),
      };
    },
  });
}
