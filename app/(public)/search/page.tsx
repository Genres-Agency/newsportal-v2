"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { searchNews } from "@/lib/actions/search";
import { NewsItem, getLatestHeroNews } from "@/lib/actions/news";
import GoogleAdsense from "@/components/ads/GoogleAdsense";
import { getRelativeTime } from "@/lib/utils/time";
import NewsItemSkeleton from "@/components/skeleton/NewsItemSkeleton";
import { highlightText } from "@/lib/utils/highlight";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultNews, setDefaultNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadDefaultNews = async () => {
      try {
        const news = await getLatestHeroNews();
        setDefaultNews(news);
      } catch (error) {
        console.error("Error loading default news:", error);
      }
    };
    if (!initialQuery) {
      loadDefaultNews();
    }
  }, [initialQuery]);

  useEffect(() => {
    if (initialQuery) {
      debouncedSearch(initialQuery);
    }
  }, [initialQuery]);

  const debouncedSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchNews(query);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Advertisement */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-8">
            <div className="bg-gray-100 w-full h-[600px] flex items-center justify-center text-gray-500 text-sm">
              Advertisement Space
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Search Bar */}
          <div className="flex gap-4 mb-8">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="flex-1 text-lg p-6"
            />
            <button
              onClick={() => debouncedSearch(searchQuery)}
              className="px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {isLoading && searchQuery ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, index) => (
                <NewsItemSkeleton key={index} />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              {results.map((news, index) => (
                <React.Fragment key={news.id}>
                  {index > 0 && index % 5 === 0 && (
                    <div className="py-4">
                      <GoogleAdsense
                        client="ca-pub-4798069224424379"
                        slot="YOUR_AD_SLOT_ID"
                        style={{ display: "block" }}
                        format="auto"
                      />
                    </div>
                  )}
                  <Link
                    href={`/news/${news.slug}`}
                    className="block hover:bg-gray-50 transition-colors p-4 border-b border-gray-100"
                  >
                    <div className="flex gap-4">
                      {news.media && (
                        <div className="flex-shrink-0">
                          <Image
                            src={news.media.url}
                            alt={news.title}
                            width={120}
                            height={80}
                            className="h-28 w-40 rounded object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-red-500 hover:underline">
                          {highlightText(news.title, searchQuery)}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                          {highlightText(news.content, searchQuery)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getRelativeTime(news.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          ) : searchQuery && !isLoading ? (
            <div className="text-center py-8 text-gray-600">
              No results found for "{searchQuery}"
            </div>
          ) : !searchQuery && isLoading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, index) => (
                <NewsItemSkeleton key={index} />
              ))}
            </div>
          ) : defaultNews.length > 0 ? (
            <div className="space-y-6">
              {defaultNews.map((news, index) => (
                <React.Fragment key={news.id}>
                  {index > 0 && index % 5 === 0 && (
                    <div className="py-4">
                      <GoogleAdsense
                        client="ca-pub-4798069224424379"
                        slot="YOUR_AD_SLOT_ID"
                        style={{ display: "block" }}
                        format="auto"
                      />
                    </div>
                  )}
                  <Link
                    href={`/news/${news.slug}`}
                    className="block hover:bg-gray-50 transition-colors p-4 border-b border-gray-100"
                  >
                    <div className="flex gap-4">
                      {news.media && (
                        <div className="flex-shrink-0">
                          <Image
                            src={news.media.url}
                            alt={news.title}
                            width={120}
                            height={80}
                            className="h-28 w-40 rounded object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-red-500 hover:underline">
                          {highlightText(news.title, searchQuery)}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                          {highlightText(news.content, searchQuery)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getRelativeTime(news.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          ) : null}
        </div>

        {/* Right Advertisement */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-8">
            <div className="bg-gray-100 w-full h-[600px] flex items-center justify-center text-gray-500 text-sm">
              Advertisement Space
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
