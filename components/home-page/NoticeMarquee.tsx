"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
};

export default function NoticeMarquee() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch("/api/news/latest");
        if (!response.ok) throw new Error("Failed to fetch news");
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
          setNews(data);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          setError("Invalid response format");
          return;
        }
      } catch (err) {
        setError("Error loading latest news");
        console.error(err);
      }
    };

    fetchLatestNews();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto mt-6">
        <div className="bg-gray-200 flex items-center gap-4 rounded-l-md">
          <div className="font-bold text-lg bg-red-600 text-white py-3 px-5 rounded-l-md">
            সর্বশেষ:
          </div>
          <div className="text-gray-600 py-3 px-4">
            Unable to load latest news. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  console.log("News=========: ", news);
  return (
    <div className="container mx-auto mt-6">
      <div className="bg-gray-200 flex items-center gap-4 rounded-l-md">
        <div className="font-bold text-lg bg-red-600 text-white py-3 px-5 rounded-l-md">
          সর্বশেষ:
        </div>
        <div className="">
          <Marquee speed={50} gradient={false}>
            {news.map((item, index) => (
              <React.Fragment key={item.id}>
                <Link href={`/news/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
                {index < news.length - 1 && <span className="mx-4">|</span>}
              </React.Fragment>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
