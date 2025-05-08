"use client";

import { useQuery } from "@tanstack/react-query";
import { getNews, NewsItem } from "../actions/news";

export function useNews() {
  return useQuery<NewsItem[], Error>({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });
}
