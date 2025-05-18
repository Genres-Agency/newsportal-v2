import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import client from "@/prisma";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  status: string;
};

export default async function MinimalNoticeMarquee() {
  let news: NewsItem[] = [];
  let error = "";

  try {
    news = await client.news.findMany({
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

  if (error) {
    return null;
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="flex items-center border-b border-gray-200 py-2">
        <div className="flex items-center space-x-2 pr-4 border-r border-gray-200">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="font-medium text-gray-700">সর্বশেষ</span>
        </div>
        <div className="flex-1 pl-4">
          <Marquee
            speed={30}
            gradient={true}
            gradientColor="#F9FAFB"
            pauseOnHover
          >
            <div className="flex items-center space-x-12">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}