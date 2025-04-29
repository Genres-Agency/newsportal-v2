import { useQuery } from "@tanstack/react-query";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media?: { url: string } | null;
  status: string;
  scheduledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type CategoryNews = {
  category: string;
  news: NewsItem[];
};

export function useCategories() {
  return useQuery<CategoryNews[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/news/category/latest");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      return response.json();
    },
  });
}
