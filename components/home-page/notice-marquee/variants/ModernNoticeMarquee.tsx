import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { db } from "@/server/db";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  status: string;
};

interface ModernNoticeMarqueeProps {
  fallback: React.ComponentType;
}

export default async function ModernNoticeMarquee({
  fallback: Fallback,
}: ModernNoticeMarqueeProps) {
  let news: NewsItem[] = [];
  let error = "";

  try {
    news = await db.news.findMany({
      take: 30,
      where: {
        status: "PUBLISHED",
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
    });
  } catch (err) {
    error = "Error loading latest news";
    console.error(err);
  }

  if (error || news.length === 0) {
    return <Fallback />;
  }

  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      <div className="bg-white shadow-md rounded-lg border border-gray-100">
        <div className="flex items-center">
          <div className="bg-red-600 text-white py-3 px-6 flex items-center flex-shrink-0">
            <span className="font-bold text-lg whitespace-nowrap">সর্বশেষ</span>
            <svg
              className="w-5 h-5 ml-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="flex-1 px-4 overflow-hidden">
            <Marquee
              speed={40}
              gradient={true}
              gradientColor="#FFFFFF"
              pauseOnHover
              className="overflow-hidden"
            >
              <div className="flex items-center">
                {news.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center flex-shrink-0"
                  >
                    {index > 0 && <span className="mx-6 text-gray-300">|</span>}
                    <Link
                      href={`/news/${item.slug}`}
                      className="text-gray-700 hover:text-red-600 transition-colors duration-200 flex items-center group whitespace-nowrap"
                    >
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200 flex-shrink-0"></span>
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}