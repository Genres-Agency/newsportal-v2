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

export default async function ClassicNoticeMarquee() {
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
      <div className="bg-gray-200 flex items-center rounded-l-md">
        <div className="font-bold md:text-lg bg-primary text-white py-2 md:py-3 px-2 md:px-5 rounded-l-md">
          সর্বশেষ:
        </div>
        <div className="">
          <Marquee speed={50} gradient={false} pauseOnHover>
            <div className="gap-5">
              {news.map((item) => (
                <React.Fragment key={item.id}>
                  <span className="mx-4">|</span>
                  <Link href={`/news/${item.slug}`} className="hover:underline">
                    {item.title}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}