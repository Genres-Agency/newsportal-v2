"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCategories } from "@/hooks/useCategories";

export default function CategorySection() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2].map((j) => (
                  <div key={j} className="space-y-3">
                    <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 text-center">
        <p className="text-red-600">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <div
            key={category.category}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h2 className="text-xl font-bold text-red-600 pb-2 mb-4 border-b border-gray-200">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.news.map((item) => (
                <div key={item.id} className="group">
                  <div className="relative h-48 mb-2 overflow-hidden rounded">
                    <Image
                      src={item.media?.url || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold hover:text-red-600 line-clamp-2 mb-2">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.content}
                  </p>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link
                  href={`/category/${category.category}`}
                  className="text-red-600 hover:underline flex justify-end"
                >
                  আরও দেখুন →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
