"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/useNews";

export default function Hero() {
  const { data: allNews, isLoading, error } = useNews();

  const leadStory = allNews ? allNews[0] : null;
  const latestNews = allNews ? allNews.slice(1, 5) : [];
  const trendingNews = allNews ? allNews.slice(3, 9) : [];

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error instanceof Error ? error.message : "An error occurred"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 flex gap-6">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-9">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <Skeleton className="h-[400px] w-full" />
              <div className="p-4">
                <Skeleton className="h-8 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ) : (
            leadStory && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="relative h-[400px]">
                  <Image
                    src={leadStory.media?.url || "/images/placeholder.jpg"}
                    alt={leadStory.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-3 hover:text-red-600">
                    <Link href={`/news/${leadStory.slug}`}>
                      {leadStory.title}
                    </Link>
                  </h1>
                  <p className="text-gray-700 text-base mb-3">
                    {leadStory.content.substring(0, 150)}...
                  </p>
                  <Link
                    href={`/news/${leadStory.slug}`}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    বিস্তারিত পড়ুন →
                  </Link>
                </div>
              </div>
            )
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              latestNews.map((news: NewsItem) => (
                <div
                  key={news.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden group"
                >
                  <div className="relative h-48">
                    <Image
                      src={news.media?.url || "/images/placeholder.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 hover:text-red-600 line-clamp-2">
                      <Link href={`/news/${news.slug}`}>{news.title}</Link>
                    </h2>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {news.content}
                    </p>
                    <Link
                      href={`/news/${news.slug}`}
                      className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center"
                    >
                      আরও পড়ুন →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Skeleton className="h-20 w-24 rounded" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                trendingNews.map((news: NewsItem) => (
                  <div
                    key={news.id}
                    className="flex items-start space-x-3 group"
                  >
                    <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={news.media?.url || "/images/placeholder.jpg"}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/news/${news.slug}`}
                        className="font-medium text-sm hover:text-red-600 line-clamp-2 leading-tight"
                      >
                        {news.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(news.createdAt).toLocaleString("bn-BD", {
                          hour: "numeric",
                          minute: "numeric",
                        })}{" "}
                        আগে
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="sticky top-4 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                বিজ্ঞাপন
              </h4>
              <div className="bg-gray-100 h-[600px] w-full rounded flex items-center justify-center text-gray-400 text-sm">
                Ad Space (300x600)
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                বিজ্ঞাপন
              </h4>
              <div className="bg-gray-100 h-[250px] w-full rounded flex items-center justify-center text-gray-400 text-sm">
                Ad Space (300x250)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media?: { url: string } | null;
  createdAt: Date;
};
