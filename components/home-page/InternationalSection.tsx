import Image from "next/image";
import Link from "next/link";
import { getSectionNews } from "@/lib/actions/section-news";

export default async function InternationalSection() {
  const news = await getSectionNews("আন্তর্জাতিক", 4);
  const featured = news[0] || null;
  const grid = news.slice(1) || [];

  // Split grid news into side news and latest news
  const sideNews = grid.slice(0, 3) || [];
  const latestNews = grid.slice(3) || [];

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
          {featured ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative h-[400px]">
                <Image
                  src={featured.media?.url || "/images/placeholder.jpg"}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="absolute bottom-0 p-8">
                    <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors duration-300">
                      <Link href={`/news/${featured.slug}`}>
                        {featured.title}
                      </Link>
                    </h3>
                    <p className="text-gray-200 text-lg mb-4  line-clamp-2">
                      {featured.content}
                    </p>
                    <Link
                      href={`/news/${featured.slug}`}
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
          ) : null}
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
