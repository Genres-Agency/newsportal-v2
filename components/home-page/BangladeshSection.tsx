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

export default function BangladeshSection() {
  // Static data for demonstration
  const featuredNews: NewsItem = {
    id: "1",
    title: "বাংলাদেশে ডিজিটাল প্রযুক্তির নতুন যুগ",
    slug: "digital-technology-bangladesh",
    content:
      "বাংলাদেশে ডিজিটাল প্রযুক্তির ব্যবহার দ্রুত বৃদ্ধি পাচ্ছে। সরকারি-বেসরকারি সব ক্ষেত্রে ডিজিটাল সেবা প্রদান বাড়ছে। এর ফলে দেশের অর্থনৈতিক প্রবৃদ্ধি ত্বরান্বিত হচ্ছে...",
    media: { url: "/images/news5.png" },
    createdAt: new Date(),
  };

  const sideNews: NewsItem[] = [
    {
      id: "2",
      title: "রাজধানীতে নতুন মেট্রোরেল রুট চালু",
      slug: "new-metro-route-dhaka",
      content: "ঢাকার যানজট নিরসনে নতুন মেট্রোরেল রুট চালু করা হয়েছে...",
      media: { url: "/images/news1.png" },
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "কৃষি খাতে নতুন বিনিয়োগ প্রকল্প",
      slug: "agriculture-investment",
      content:
        "দেশের কৃষি খাতে বড় অংকের বিনিয়োগ প্রকল্প ঘোষণা করেছে সরকার...",
      media: { url: "/images/news2.png" },
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "শিক্ষা ক্ষেত্রে নতুন সংস্কার",
      slug: "education-reform",
      content:
        "মাধ্যমিক ও উচ্চ মাধ্যমিক স্তরে নতুন শিক্ষা কার্যক্রম চালু হচ্ছে...",
      media: { url: "/images/news3.png" },
      createdAt: new Date(),
    },
  ];

  const gridNews: NewsItem[] = [
    {
      id: "5",
      title: "স্বাস্থ্যখাতে বাজেট বৃদ্ধি",
      slug: "health-budget-increase",
      content: "আগামী অর্থবছরে স্বাস্থ্যখাতে বাজেট বাড়ানোর ঘোষণা...",
      media: { url: "/images/news4.jpg" },
      createdAt: new Date(),
    },
    {
      id: "6",
      title: "নতুন শিল্প নীতিমালা প্রণয়নের উদ্যোগ",
      slug: "new-industry-policy",
      content:
        "শিল্প খাতের উন্নয়নে নতুন নীতিমালা প্রণয়নের উদ্যোগ নিয়েছে সরকার...",
      media: { url: "/images/news5.png" },
      createdAt: new Date(),
    },
    {
      id: "7",
      title: "পর্যটন খাতে নতুন বিনিয়োগ",
      slug: "tourism-investment",
      content: "দেশের পর্যটন খাতে বড় অংকের বিনিয়োগ আসছে...",
      media: { url: "/images/news1.png" },
      createdAt: new Date(),
    },
    {
      id: "8",
      title: "ডিজিটাল কমার্স নীতিমালা চূড়ান্ত",
      slug: "digital-commerce-policy",
      content: "ই-কমার্স খাতের জন্য নতুন নীতিমালা চূড়ান্ত করেছে সরকার...",
      media: { url: "/images/news2.png" },
      createdAt: new Date(),
    },
    {
      id: "9",
      title: "গ্রীন এনার্জি প্রকল্পে বিনিয়োগ",
      slug: "green-energy-investment",
      content: "নবায়নযোগ্য জ্বালানি খাতে বড় প্রকল্প ঘোষণা...",
      media: { url: "/images/news3.png" },
      createdAt: new Date(),
    },
    {
      id: "10",
      title: "স্টার্টআপ ইকোসিস্টেম উন্নয়ন কর্মসূচি",
      slug: "startup-ecosystem",
      content: "দেশের স্টার্টআপ ইকোসিস্টেম উন্নয়নে নতুন কর্মসূচি...",
      media: { url: "/images/news4.jpg" },
      createdAt: new Date(),
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">বাংলাদেশ</h2>
        <Link
          href="/category/bangladesh"
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          সব খবর →
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured News */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 mb-8">
            <div className="relative h-[450px]">
              <Image
                src={featuredNews.media?.url || "/images/placeholder.jpg"}
                alt={featuredNews.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors duration-300">
                    <Link href={`/news/${featuredNews.slug}`}>
                      {featuredNews.title}
                    </Link>
                  </h3>
                  <p className="text-gray-200 text-lg mb-4 line-clamp-2">
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
        </div>
        {/* Grid News */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48">
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
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {news.content}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {new Date(news.createdAt).toLocaleString("bn-BD", {
                      hour: "numeric",
                      minute: "numeric",
                    })}{" "}
                    আগে
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
