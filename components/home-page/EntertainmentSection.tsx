import Image from "next/image";
import Link from "next/link";
import React from "react";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  media?: { url: string } | null;
  createdAt: Date;
};

export default function EntertainmentSection() {
  // Static data for demonstration
  const featuredNews: NewsItem = {
    id: "1",
    title: "টলিউডে নতুন ছবির মুক্তি: দর্শকদের প্রশংসা",
    slug: "new-movie-release",
    content:
      "টলিউডের নতুন ছবি মুক্তি পেয়েছে। দর্শকদের কাছ থেকে ভালো সাড়া পাওয়া গেছে। অভিনেতা-অভিনেত্রীদের অভিনয় দক্ষতার প্রশংসা করেছেন সমালোচকরা...",
    media: { url: "/images/news1.png" },
    createdAt: new Date(),
  };

  const timelineNews: NewsItem[] = [
    {
      id: "2",
      title: "জনপ্রিয় গায়কের নতুন অ্যালবাম আসছে",
      slug: "new-album-release",
      content: "দেশের জনপ্রিয় গায়ক নতুন অ্যালবাম নিয়ে আসছেন...",
      media: { url: "/images/news2.png" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "3",
      title: "আন্তর্জাতিক চলচ্চিত্র উৎসবে বাংলাদেশি ছবি",
      slug: "international-film-festival",
      content: "আন্তর্জাতিক চলচ্চিত্র উৎসবে বাংলাদেশি ছবি প্রদর্শিত হবে...",
      media: { url: "/images/news3.png" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: "4",
      title: "নাট্যশালায় নতুন নাটকের মহড়া",
      slug: "theater-rehearsal",
      content: "রাজধানীর বিখ্যাত নাট্যশালায় নতুন নাটকের মহড়া চলছে...",
      media: { url: "/images/news4.jpg" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    },
    {
      id: "5",
      title: "সংগীত শিল্পীদের নতুন সংগঠন",
      slug: "musicians-organization",
      content: "দেশের সংগীত শিল্পীরা নতুন সংগঠন গঠন করেছেন...",
      media: { url: "/images/news5.png" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    },
    {
      id: "6",
      title: "ওটিটি প্ল্যাটফর্মে নতুন ওয়েব সিরিজ",
      slug: "new-web-series",
      content:
        "জনপ্রিয় ওটিটি প্ল্যাটফর্মে নতুন ওয়েব সিরিজ মুক্তি পেতে যাচ্ছে...",
      media: { url: "/images/news1.png" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">বিনোদন</h2>
        <Link
          href="/category/entertainment"
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          সব খবর →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured News */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-[500px]">
              <Image
                src={featuredNews.media?.url || "/images/placeholder.jpg"}
                alt={featuredNews.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute bottom-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors duration-300">
                    <Link href={`/news/${featuredNews.slug}`}>
                      {featuredNews.title}
                    </Link>
                  </h3>
                  <p className="text-gray-200 text-lg mb-4 line-clamp-3">
                    {featuredNews.content}
                  </p>
                  <Link
                    href={`/news/${featuredNews.slug}`}
                    className="inline-flex items-center text-red-400 hover:text-red-300 font-medium"
                  >
                    বিস্তারিত পড়ুন
                    <svg
                      className="w-4 h-4 ml-2"
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
              </div>
            </div>
          </div>
          {/* Advertisement Section */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
            <div className="h-[180px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">বিজ্ঞাপনের জন্য স্থান</p>
            </div>
          </div>
        </div>

        {/* Grid News */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-1 gap-6">
            {timelineNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="relative w-40 h-32 flex-shrink-0">
                    <Image
                      src={news.media?.url || "/images/placeholder.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(news.createdAt).toLocaleString("bn-BD", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                    <h4 className="font-semibold text-base hover:text-red-600 line-clamp-2 mb-2 transition-colors duration-300">
                      <Link href={`/news/${news.slug}`}>{news.title}</Link>
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {news.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
