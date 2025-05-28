import Image from "next/image";
import Link from "next/link";
import { getSectionNews } from "@/lib/actions/section-news";

export default async function BangladeshSection({
  category = "বাংলাদেশ",
}: {
  category?: string;
}) {
  const news = await getSectionNews(category, 7);
  const featuredNews = news[0] || null;
  const regularNews = news.slice(1) || [];

  if (!news || news.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 2v4M8 2v4M3 10h18"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {category} বিভাগে কোন সংবাদ নেই
          </h3>
          <p className="text-gray-600">
            এই মুহূর্তে কোন সংবাদ উপলব্ধ নেই। অনুগ্রহ করে কিছুক্ষণ পর আবার
            চেষ্টা করুন।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-red-600">{category}</h2>
        <Link
          href={`/category/${category}`}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          সব খবর →
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured News */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 mb-8">
            {featuredNews ? (
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
            ) : (
              <div className="p-8 text-center h-[450px] flex flex-col items-center justify-center bg-gray-50">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 2v4M8 2v4M3 10h18"
                  />
                </svg>
                <p className="text-gray-600 text-lg mb-2">
                  কোন ফিচার্ড নিউজ নেই
                </p>
                <p className="text-gray-500 text-sm">
                  নতুন খবর শীঘ্রই প্রকাশিত হবে
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Grid News */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-32">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
