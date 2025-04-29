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

export function useCategories() {
  return useQuery<{ [key: string]: NewsItem[] }>({
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
