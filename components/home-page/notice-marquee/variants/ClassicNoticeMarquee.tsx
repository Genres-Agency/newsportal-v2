import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { api } from "@/trpc/server";

interface ClassicNoticeMarqueeProps {
  fallback: React.ComponentType;
}

export default async function ClassicNoticeMarquee({
  fallback: Fallback,
}: ClassicNoticeMarqueeProps) {
  const news = await api.news.getLatestNewsToNoticeMarquee();

  if (news.length === 0) {
    return <Fallback />;
  }

  return (
    <div className="container mx-auto mt-4 overflow-hidden">
      <div className="bg-gray-200 flex items-center">
        <div className="font-bold md:text-lg bg-primary text-white py-2 md:py-3 px-2 md:px-5 rounded-l-md flex-shrink-0">
          <span className="whitespace-nowrap">সর্বশেষ:</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover
            className="overflow-hidden"
          >
            <div className="flex items-center">
              {news.map((item, index) => (
                <div key={item.id} className="flex items-center flex-shrink-0">
                  {index > 0 && <span className="mx-4 text-gray-500">|</span>}
                  <Link
                    href={`/news/${item.slug}`}
                    className="hover:underline whitespace-nowrap text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
