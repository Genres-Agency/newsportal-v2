import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLatestHeroNews } from "@/lib/actions/news";

const NoNewsMessage = () => (
  <div className="container mx-auto py-8">
    <div className="bg-white p-8 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">কোন সংবাদ পাওয়া যায়নি</h2>
      <p className="text-gray-500">এই মুহূর্তে কোন সংবাদ উপলব্ধ নেই। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
    </div>
  </div>
);

export default async function MinimalHero() {
  const news = await getLatestHeroNews();

  if (!news.length) {
    return <NoNewsMessage />;
  }

  const mainNews = news[0];
  const secondaryNews = news.slice(1, 3);

  return (
    <div className="container mx-auto mt-6">
      {/* Main Featured News */}
      <div className="mb-6">
        <div className="relative overflow-hidden rounded-lg bg-white">
          {mainNews.media && (
            <div className="relative aspect-[21/9]">
              <Image
                src={mainNews.media.url}
                alt={mainNews.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <Link
              href={`/news/${mainNews.slug}`}
              className="hover:text-primary transition-colors"
            >
              <h2 className="text-2xl font-bold mb-2">{mainNews.title}</h2>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary News */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondaryNews.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 bg-white rounded-lg overflow-hidden"
          >
            {item.media && (
              <div className="relative w-1/3 aspect-square">
                <Image
                  src={item.media.url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-4">
              <Link
                href={`/news/${item.slug}`}
                className="hover:text-primary transition-colors"
              >
                <h3 className="text-lg font-medium line-clamp-2">
                  {item.title}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}