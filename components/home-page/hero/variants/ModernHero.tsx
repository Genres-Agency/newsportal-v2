import React from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/trpc/server";

const NoNewsMessage = () => (
  <div className="container mx-auto py-8">
    <div className="bg-white p-8 rounded-xl text-center shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">
        কোন সংবাদ পাওয়া যায়নি
      </h2>
      <p className="text-gray-500">
        এই মুহূর্তে কোন সংবাদ উপলব্ধ নেই। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা
        করুন।
      </p>
    </div>
  </div>
);

export default async function ModernHero() {
  const news = await api.news.getLatestHeroNews();

  if (!news.length) {
    return <NoNewsMessage />;
  }

  const mainNews = news[0];
  const secondaryNews = news.slice(1, 5);

  return (
    <div className="container mx-auto mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Featured News */}
        <div className="relative overflow-hidden rounded-xl shadow-lg group w-full h-64 md:h-full min-h-[200px]">
          {mainNews.media && (
            <div className="relative w-full h-full min-h-[200px]">
              <Image
                src={mainNews.media.url}
                alt={mainNews.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="absolute bottom-0 p-6">
              <Link
                href={`/news/${mainNews.slug}`}
                className="text-white hover:text-primary-foreground"
              >
                <h2 className="text-2xl font-bold mb-2">{mainNews.title}</h2>
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary News Grid */}
        <div className="grid grid-cols-2 gap-4">
          {secondaryNews.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-md group"
            >
              {item.media && (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.media.url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-4">
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-white hover:text-primary-foreground"
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
