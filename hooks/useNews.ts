import { useQuery } from "@tanstack/react-query";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news/latest");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      return response.json();
    },
  });
}
