import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { api } from "@/trpc/server";
import { Flame } from "lucide-react";

interface ModernNoticeMarqueeProps {
  fallback: React.ComponentType;
}

export default async function ModernNoticeMarquee({
  fallback: Fallback,
}: ModernNoticeMarqueeProps) {
  const news = await api.news.getLatestNewsToNoticeMarquee();

  if (news.length === 0) {
    return <Fallback />;
  }

  return (
    <div className="container mx-auto overflow-hidden mt-4">
      <div className="bg-white border border-gray-100">
        <div className="flex items-center">
          <div className="bg-red-600 text-white py-3 md:px-6 px-4 flex items-center flex-shrink-0 md:gap-2 gap-1">
            <Flame className="md:w-5 w-4" />
            <span className="font-bold md:text-lg text-sm whitespace-nowrap">
              সর্বশেষ
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <Marquee
              speed={40}
              gradient={false}
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