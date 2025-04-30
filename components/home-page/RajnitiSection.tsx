"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePoliticalNews } from "@/hooks/usePoliticalNews";
import { Skeleton } from "@/components/ui/skeleton";

export default function RajnitiSection() {
  const { data, isLoading, error } = usePoliticalNews();
  const { featured: featuredNews, grid: regularNews = [] } = data || {};

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-32 w-40 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error instanceof Error
            ? error.message
            : "Failed to load political news"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">রাজনীতি</h2>
        <Link
          href="/category/politics"
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          সব খবর →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Grid News */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-1 gap-6">
            {regularNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="relative w-40 h-32 flex-shrink-0">
                    <Image
                      src={news.media?.url || "/images/placeholder.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(news.createdAt).toLocaleString("bn-BD", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                    <h4 className="font-semibold text-base hover:text-red-600 line-clamp-2 mb-2 transition-colors duration-300">
                      <Link href={`/news/${news.slug}`}>{news.title}</Link>
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {news.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured News */}
        <div className="lg:col-span-7">
          {featuredNews ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-[500px]">
                <Image
                  src={featuredNews.media?.url || "/images/placeholder.jpg"}
                  alt={featuredNews.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors duration-300">
                      <Link href={`/news/${featuredNews.slug}`}>
                        {featuredNews.title}
                      </Link>
                    </h3>
                    <p className="text-gray-200 text-lg mb-4 line-clamp-3">
                      {featuredNews.content}
                    </p>
                    <Link
                      href={`/news/${featuredNews.slug}`}
                      className="inline-flex items-center text-red-400 hover:text-red-300 font-medium"
                    >
                      বিস্তারিত পড়ুন
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500">No featured news available</p>
            </div>
          )}
          {/* Advertisement Section */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
            <div className="h-[180px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">বিজ্ঞাপনের জন্য স্থান</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
