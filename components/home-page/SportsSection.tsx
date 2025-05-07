import Image from "next/image";
import Link from "next/link";
import { getSectionNews } from "@/lib/actions/section-news";

export default async function SportsSection() {
  const news = await getSectionNews("খেলাধুলা", 6);
  const featuredMatches = news.slice(0, 2);
  const latestNews = news.slice(2, 6);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-red-600">খেলাধুলা</h2>
        <Link
          href="/category/sports"
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          সব খবর →
        </Link>
      </div>

      {/* Featured Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featuredMatches?.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-64">
              <Image
                src={match.media?.url || "/images/placeholder.jpg"}
                alt={match.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors duration-300">
                    <Link href={`/news/${match.slug}`}>{match.title}</Link>
                  </h3>
                  <p className="text-gray-200 line-clamp-2 mb-3">
                    {match.content}
                  </p>
                  <Link
                    href={`/news/${match.slug}`}
                    className="inline-flex items-center text-red-400 hover:text-red-300"
                  >
                    বিস্তারিত
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
        ))}
      </div>

      {/* Latest Sports Updates - Horizontal Scroll */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">সর্বশেষ আপডেট</h3>
        <div className="relative">
          <div className="overflow-x-auto grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {latestNews.map((news) => (
              <div
                key={news.id}
                className="flex-none w-full bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-40">
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
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {news.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
