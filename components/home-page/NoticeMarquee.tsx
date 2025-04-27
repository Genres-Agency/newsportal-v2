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

export default async function NoticeMarquee() {
  let news: NewsItem[] = [];
  let error = "";

  try {
    news = await client.news.findMany({
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
    return null; // Hide the marquee if there's an error
  }

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

  return (
    <div className="container mx-auto mt-6 overflow-x-hidden">
      <div className="bg-gray-200 flex items-center gap-4 rounded-l-md">
        <div className="font-bold text-lg bg-red-600 text-white py-3 px-5 rounded-l-md">
          সর্বশেষ:
        </div>
        <div className="">
          <Marquee speed={50} gradient={false} pauseOnHover>
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
