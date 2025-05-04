import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryNews } from "@/lib/actions/category-news";

type Props = {
  category: string;
};

export default async function NewsGrid({ category }: Props) {
  try {
    const data = await getCategoryNews(category);

    if (!data || !data.news) {
      return (
        <div className="text-center text-red-600">
          No news available for this category.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.news.map((news) => (
          <article
            key={news.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-56 sm:h-64">
              <Image
                src={news.media?.url || "/images/placeholder.jpg"}
                alt={news.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-4">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(news.createdAt).toLocaleString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <h3 className="font-bold text-xl hover:text-red-600 line-clamp-2 mb-3 transition-colors duration-300">
                <Link
                  href={`/news/${news.slug}`}
                  className="hover:underline decoration-red-600 decoration-2 underline-offset-2"
                >
                  {news.title}
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed mb-2">
                {news.content}
              </p>

              <Link
                href={`/news/${news.slug}`}
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm group/link"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:origin-right after:scale-x-0 after:transition-transform after:duration-300 group-hover/link:after:origin-left group-hover/link:after:scale-x-100">
                  আরও পড়ুন
                </span>
                <svg
                  className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1"
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
          </article>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-600">
        Error loading news. Please try again later.
      </div>
    );
  }
}
