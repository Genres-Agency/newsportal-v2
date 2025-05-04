import { useQuery } from "@tanstack/react-query";

type News = {
  id: string;
  title: string;
  content: string;
  slug: string;
  media?: {
    url: string;
  };
};

type CategoryNewsResponse = {
  news: News[];
};

export function useCategoryNews(category: string) {
  return useQuery<CategoryNewsResponse>({
    queryKey: ["categoryNews", category],
    queryFn: async () => {
      const response = await fetch(`/api/news/category/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category news");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
