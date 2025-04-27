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

export default function RajnitiSection() {
  // Static data for demonstration
  const featuredNews: NewsItem = {
    id: "1",
    title: "সংসদে নতুন আইন পাস: গুরুত্বপূর্ণ পরিবর্তন আসছে",
    slug: "new-law-passed-parliament",
    content:
      "জাতীয় সংসদে একটি নতুন আইন পাস হয়েছে যা দেশের আইনি কাঠামোতে বড় পরিবর্তন আনবে। এই আইনের মাধ্যমে নাগরিক অধিকার আরও সুরক্ষিত হবে এবং প্রশাসনিক কার্যক্রম আরও স্বচ্ছ হবে...",
    media: { url: "/images/news2.png" },
    createdAt: new Date(),
  };

  const gridNews: NewsItem[] = [
    {
      id: "2",
      title: "বিরোধী দলের সঙ্গে সরকারের বৈঠক আজ",
      slug: "government-opposition-meeting",
      content: "রাজনৈতিক সংকট নিরসনে আজ বিরোধী দলের সঙ্গে বৈঠকে বসছে সরকার...",
      media: { url: "/images/news1.png" },
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "নির্বাচন কমিশনের নতুন নির্দেশনা জারি",
      slug: "election-commission-directive",
      content:
        "আসন্ন নির্বাচনকে সামনে রেখে নতুন নির্দেশনা জারি করেছে নির্বাচন কমিশন...",
      media: { url: "/images/news2.png" },
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "স্থানীয় সরকার নির্বাচনের তফসিল ঘোষণা",
      slug: "local-government-election",
      content: "স্থানীয় সরকার নির্বাচনের তফসিল ঘোষণা করেছে নির্বাচন কমিশন...",
      media: { url: "/images/news3.png" },
      createdAt: new Date(),
    },
    {
      id: "5",
      title: "রাজনৈতিক দলগুলোর সঙ্গে প্রধানমন্ত্রীর বৈঠক",
      slug: "pm-political-parties-meeting",
      content:
        "দেশের বর্তমান পরিস্থিতি নিয়ে রাজনৈতিক দলগুলোর সঙ্গে বৈঠক করেছেন প্রধানমন্ত্রী...",
      media: { url: "/images/news4.jpg" },
      createdAt: new Date(),
    },
    {
      id: "6",
      title: "সংসদীয় কমিটির নতুন সুপারিশ",
      slug: "parliamentary-committee-recommendation",
      content:
        "গুরুত্বপূর্ণ কয়েকটি ইস্যুতে সংসদীয় কমিটি নতুন সুপারিশ করেছে...",
      media: { url: "/images/news5.png" },
      createdAt: new Date(),
    },
    {
      id: "7",
      title: "নতুন রাজনৈতিক জোট গঠন",
      slug: "new-political-alliance",
      content: "আসন্ন নির্বাচনকে সামনে রেখে নতুন রাজনৈতিক জোট গঠিত হয়েছে...",
      media: { url: "/images/news1.png" },
      createdAt: new Date(),
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">রাজনীতি</h2>
        <Link
          href="/category/politics"
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          সব খবর →
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Grid News */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridNews.map((news) => (
              <div
                key={news.id}
                className="overflow-hidden group transition-shadow duration-300 flex items-start"
              >
                <div className="relative h-16 w-32 border">
                  <Image
                    src={news.media?.url || "/images/placeholder.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2">
                  <h4 className="font-semibold text-sm hover:text-red-600 line-clamp-2 mb-2 transition-colors duration-300">
                    <Link href={`/news/${news.slug}`}>{news.title}</Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </div>
  );
}
