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

export default function Hero() {
  // Static data for demonstration
  const leadStory: NewsItem = {
    id: "1",
    title: "ইরানে বন্দরে ভয়াবহ অগ্নিকাণ্ড, ৫ শতাধিক আহত",
    slug: "iran-port-fire-incident",
    content:
      "ইরানের দক্ষিণাঞ্চলীয় বুশেহর বন্দরে একটি কন্টেইনার ইয়ার্ডে ভয়াবহ অগ্নিকাণ্ডের ঘটনা ঘটেছে। এতে অন্তত ৫ শতাধিক মানুষ আহত হয়েছেন...",
    media: {
      url: "/images/news/iran-fire.jpg",
    },
    createdAt: new Date(),
  };

  const latestNews: NewsItem[] = [
    {
      id: "2",
      title: "ভারত-পাকিস্তান উত্তেজনা: সীমান্তে সেনা মোতায়েন",
      slug: "india-pakistan-tension",
      content:
        "সীমান্তে উত্তেজনা বৃদ্ধির পরে ভারত ও পাকিস্তান উভয় দেশই অতিরিক্ত সেনা মোতায়েন করেছে...",
      media: { url: "/images/news/border-tension.jpg" },
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "২১৮ কোটি টাকা স্থানান্তরের মামলায় মা বাবাকে জিজ্ঞাসাবাদ",
      slug: "money-laundering-case",
      content:
        "অবৈধ অর্থ পাচারের অভিযোগে ২১৮ কোটি টাকা স্থানান্তরের মামলায় আজ জিজ্ঞাসাবাদ করা হয়েছে...",
      media: { url: "/images/news/money-laundering.jpg" },
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "রাজধানীতে নতুন মেট্রোরেল রুট ঘোষণা",
      slug: "new-metro-route",
      content: "রাজধানীর যানজট নিরসনে নতুন মেট্রোরেল রুট ঘোষণা করেছে সরকার...",
      media: { url: "/images/news/metro-rail.jpg" },
      createdAt: new Date(),
    },
    {
      id: "5",
      title: "খেলোয়াড় অনিক দাসের বাড়িতে দুর্নীতি দমন কমিশন",
      slug: "acc-raid-player-house",
      content: "জাতীয় দলের ক্রিকেটার অনিক দাসের বাড়িতে হানা দিয়েছে দুদক...",
      media: { url: "/images/news/acc-raid.jpg" },
      createdAt: new Date(),
    },
  ];

  const trendingNews: NewsItem[] = [
    {
      id: "6",
      title: "মাওয়া এক্সপ্রেসওয়ে উদ্বোধন আজ",
      slug: "mawa-expressway-opening",
      content:
        "দেশের প্রথম এক্সপ্রেসওয়ে মাওয়া-ভাঙ্গা মহাসড়ক আজ উদ্বোধন করা হবে...",
      media: { url: "/images/news/expressway.jpg" },
      createdAt: new Date(),
    },
    {
      id: "7",
      title: "শিক্ষা প্রতিষ্ঠানে ছুটি বাড়লো আরও এক সপ্তাহ",
      slug: "school-holiday-extended",
      content:
        "শীতের প্রকোপ বৃদ্ধির কারণে শিক্ষা প্রতিষ্ঠানে ছুটি বাড়ানো হয়েছে...",
      media: { url: "/images/news/school-closed.jpg" },
      createdAt: new Date(),
    },
    {
      id: "8",
      title: "বিশ্বকাপ ক্রিকেটে বাংলাদেশের সম্ভাব্য দল",
      slug: "cricket-world-cup-team",
      content: "আসন্ন বিশ্বকাপ ক্রিকেটে বাংলাদেশের সম্ভাব্য দল ঘোষণা...",
      media: { url: "/images/news/cricket-team.jpg" },
      createdAt: new Date(),
    },
    {
      id: "9",
      title: "রাজধানীতে বায়ু দূষণের মাত্রা বিপজ্জনক পর্যায়ে",
      slug: "air-pollution-dhaka",
      content: "ঢাকার বায়ু দূষণের মাত্রা আবারও বিপজ্জনক পর্যায়ে পৌঁছেছে...",
      media: { url: "/images/news/air-pollution.jpg" },
      createdAt: new Date(),
    },
    {
      id: "10",
      title: "নতুন সড়ক আইনে জরিমানার পরিমাণ বৃদ্ধি",
      slug: "new-traffic-law",
      content: "যানবাহন চালকদের জন্য কঠোর হচ্ছে সড়ক আইন...",
      media: { url: "/images/news/traffic-law.jpg" },
      createdAt: new Date(),
    },
  ];
  return (
    <div className="container mx-auto py-6 flex gap-6">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8">
          {leadStory && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative h-[400px]">
                <Image
                  src={leadStory.media?.url || "/images/placeholder.jpg"}
                  alt={leadStory.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-3 hover:text-red-600">
                  <Link href={`/news/${leadStory.slug}`}>
                    {leadStory.title}
                  </Link>
                </h1>
                <p className="text-gray-700 text-base mb-3">
                  {leadStory.content.substring(0, 150)}...
                </p>
                <Link
                  href={`/news/${leadStory.slug}`}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  বিস্তারিত পড়ুন →
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image
                    src={news.media?.url || "/images/placeholder.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 hover:text-red-600 line-clamp-2">
                    <Link href={`/news/${news.slug}`}>{news.title}</Link>
                  </h2>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {news.content}
                  </p>
                  <Link
                    href={`/news/${news.slug}`}
                    className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center"
                  >
                    আরও পড়ুন →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-red-600">
              সর্বাধিক পঠিত
            </h3>
            <div className="space-y-4">
              {trendingNews.map((news) => (
                <div key={news.id} className="flex items-start space-x-3 group">
                  <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={news.media?.url || "/images/placeholder.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/news/${news.slug}`}
                      className="font-medium text-sm hover:text-red-600 line-clamp-2 leading-tight"
                    >
                      {news.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(news.createdAt).toLocaleString("bn-BD", {
                        hour: "numeric",
                        minute: "numeric",
                      })}{" "}
                      আগে
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-4 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                বিজ্ঞাপন
              </h4>
              <div className="bg-gray-100 h-[600px] w-full rounded flex items-center justify-center text-gray-400 text-sm">
                Ad Space (300x600)
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                বিজ্ঞাপন
              </h4>
              <div className="bg-gray-100 h-[250px] w-full rounded flex items-center justify-center text-gray-400 text-sm">
                Ad Space (300x250)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
