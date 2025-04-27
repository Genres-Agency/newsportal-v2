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

export default function InternationalSection() {
  // Static data for demonstration
  const featuredNews: NewsItem = {
    id: "1",
    title: "মধ্যপ্রাচ্যে উত্তেজনা: জাতিসংঘের জরুরি বৈঠক",
    slug: "middle-east-tension-un-meeting",
    content:
      "মধ্যপ্রাচ্যে ক্রমবর্ধমান উত্তেজনার প্রেক্ষিতে জাতিসংঘের নিরাপত্তা পরিষদের জরুরি বৈঠক আহ্বান করা হয়েছে। বিশ্বের বিভিন্ন দেশের নেতৃবৃন্দ শান্তি প্রতিষ্ঠার আহ্বান জানিয়েছেন...",
    media: { url: "/images/news1.png" },
    createdAt: new Date(),
  };

  const sideNews: NewsItem[] = [
    {
      id: "2",
      title: "জলবায়ু পরিবর্তন: বিশ্ব নেতাদের জরুরি সম্মেলন",
      slug: "climate-change-summit",
      content:
        "জলবায়ু পরিবর্তনের ভয়াবহ প্রভাব মোকাবেলায় বিশ্ব নেতাদের জরুরি সম্মেলন...",
      media: { url: "/images/news2.png" },
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "চীন-মার্কিন বাণিজ্য সম্পর্কে নতুন মোড়",
      slug: "china-us-trade",
      content: "দুই দেশের মধ্যে বাণিজ্য সম্পর্ক নতুন মোড় নিয়েছে...",
      media: { url: "/images/news3.png" },
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "ইউরোপীয় ইউনিয়নের নতুন নীতিমালা",
      slug: "eu-new-policy",
      content: "ইউরোপীয় ইউনিয়ন সদস্য রাষ্ট্রগুলোর জন্য নতুন নীতিমালা...",
      media: { url: "/images/news4.jpg" },
      createdAt: new Date(),
    },
  ];

  const latestNews: NewsItem[] = [
    {
      id: "5",
      title: "রাশিয়া-ইউক্রেন সংকট: নতুন মোড়",
      slug: "russia-ukraine-crisis",
      content:
        "রাশিয়া-ইউক্রেন সংকটে নতুন মোড়, আন্তর্জাতিক সম্প্রদায়ের উদ্বেগ...",
      media: { url: "/images/news5.png" },
      createdAt: new Date(),
    },
    {
      id: "6",
      title: "দক্ষিণ এশিয়ায় অর্থনৈতিক সহযোগিতা",
      slug: "south-asia-economic-cooperation",
      content: "দক্ষিণ এশিয়ার দেশগুলোর মধ্যে অর্থনৈতিক সহযোগিতা বৃদ্ধি...",
      media: { url: "/images/news1.png" },
      createdAt: new Date(),
    },
    {
      id: "7",
      title: "দক্ষিণ এশিয়ায় অর্থনৈতিক সহযোগিতা",
      slug: "south-asia-economic-cooperation",
      content: "দক্ষিণ এশিয়ার দেশগুলোর মধ্যে অর্থনৈতিক সহযোগিতা বৃদ্ধি...",
      media: { url: "/images/news1.png" },
      createdAt: new Date(),
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-red-600">আন্তর্জাতিক</h2>
        <Link
          href="/category/international"
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          সব খবর →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Featured News */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative h-[400px]">
              <Image
                src={featuredNews.media?.url || "/images/placeholder.jpg"}
                alt={featuredNews.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="absolute bottom-0 p-8">
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors duration-300">
                    <Link href={`/news/${featuredNews.slug}`}>
                      {featuredNews.title}
                    </Link>
                  </h3>
                  <p className="text-gray-200 text-lg mb-4">
                    {featuredNews.content}
                  </p>
                  <Link
                    href={`/news/${featuredNews.slug}`}
                    className="inline-flex items-center text-red-400 hover:text-red-300"
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
        </div>

        {/* Side News List */}
        <div className="lg:col-span-4 space-y-6">
          {sideNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="relative w-32 h-24 flex-shrink-0">
                  <Image
                    src={news.media?.url || "/images/placeholder.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm hover:text-red-600 line-clamp-2 mb-2 transition-colors duration-300">
                    <Link href={`/news/${news.slug}`}>{news.title}</Link>
                  </h4>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {news.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest International News */}
      <div className="mt-8">
        {/* <h3 className="text-lg font-semibold mb-6">সর্বশেষ আন্তর্জাতিক সংবাদ</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {latestNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="relative w-48 h-36 flex-shrink-0">
                  <Image
                    src={news.media?.url || "/images/placeholder.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 flex-1">
                  <h4 className="font-semibold text-base hover:text-red-600 line-clamp-2 mb-2 transition-colors duration-300">
                    <Link href={`/news/${news.slug}`}>{news.title}</Link>
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {news.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
