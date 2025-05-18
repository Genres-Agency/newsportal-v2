import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsItem, getLatestHeroNews } from "@/lib/actions/news";
import GoogleAdsense from "@/components/ads/GoogleAdsense";
import { GoogleAdsenseScript } from "@/components/ads/GoogleAdsense";

async function Hero() {
  let allNews: NewsItem[] = [];
  let error: Error | null = null;

  try {
    allNews = await getLatestHeroNews();
  } catch (err) {
    error = err instanceof Error ? err : new Error("Failed to fetch news");
  }

  const topNews = allNews ? allNews.slice(0, 2) : [];
  const midNews = allNews ? allNews.slice(2, 5) : [];
  const trendingNews = allNews ? allNews.slice(5, 9) : [];
  const latestNews = allNews ? allNews.slice(9, 13) : [];

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error instanceof Error ? error.message : "An error occurred"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!allNews.length ? (
              <>
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden group hover:shadow transition-all duration-300"
                  >
                    <Skeleton className="h-[300px] w-full" />
                    <div className="p-6">
                      <Skeleton className="h-8 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              topNews.map((news: NewsItem) => (
                <div
                  key={news.id}
                  className="bg-white rounded-xl overflow-hidden group hover:shadow transition-all duration-300"
                >
                  <div className="relative h-[300px]">
                    <Image
                      src={news.media?.url || "/images/placeholder.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-red-600 transition-colors duration-300">
                      <Link href={`/news/${news.slug}`}>{news.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-base mb-4 line-clamp-3">
                      {news.content.substring(0, 150)}...
                    </p>
                    <Link
                      href={`/news/${news.slug}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium group-hover:gap-2 transition-all duration-300"
                    >
                      বিস্তারিত পড়ুন{" "}
                      <svg
                        className="w-4 h-4 ml-1"
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
              ))
            )}
          </div>

          {/* Middle Section - 3 News Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {!allNews.length ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <Skeleton className="h-40 w-full mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </>
            ) : (
              midNews.map((news: NewsItem) => (
                <div
                  key={news.id}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
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
                    <h2 className="text-lg font-semibold mb-2 hover:text-red-600 transition-colors duration-300 line-clamp-2">
                      <Link href={`/news/${news.slug}`}>{news.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {news.content}
                    </p>
                    <Link
                      href={`/news/${news.slug}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium group-hover:gap-2 transition-all duration-300"
                    >
                      বিস্তারিত পড়ুন{" "}
                      <svg
                        className="w-4 h-4 ml-1"
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
              ))
            )}
          </div>

          {/* Bottom Section - 4 News Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {!allNews.length ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </>
            ) : (
              latestNews.map((news: NewsItem) => (
                <div
                  key={news.id}
                  className="bg-white rounded-lg p-4 hover:shadow-md transition-all duration-300"
                >
                  <h2 className="text-base font-semibold mb-2 hover:text-red-600 transition-colors duration-300 line-clamp-2">
                    <Link href={`/news/${news.slug}`}>{news.title}</Link>
                  </h2>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(news.createdAt).toLocaleString("bn-BD", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {news.content}
                  </p>
                  <Link
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium group-hover:gap-2 transition-all duration-300"
                  >
                    বিস্তারিত পড়ুন{" "}
                    <svg
                      className="w-4 h-4 ml-1"
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
              ))
            )}
          </div>
          {/* Advertisement Section */}

          <div className="w-full flex flex-col gap-4">
            {/* This is hero bottom google horizontal ads */}
            <div className="w-full min-h-[120px] max-h-36 bg-gray-50 flex items-center justify-center relative">
              <GoogleAdsense
                client="ca-pub-4798069224424379"
                slot="7204322114"
                format="auto"
                responsive={true}
                className="w-full"
              />
            </div>

            {/* This is hero bottom local ads */}
            <div className="w-full h-[120px] flex items-center justify-center relative">
              <Link href="https://example.com/ad3" target="_blank">
                <Image
                  src="/ads/herobottomads.jpeg"
                  alt="Full Width Advertisement"
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-xl mb-6">
            <div className="space-y-4">
              {!allNews.length ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Skeleton className="h-20 w-24 rounded" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                trendingNews.map((news: NewsItem) => (
                  <div
                    key={news.id}
                    className="flex items-start space-x-3 group"
                  >
                    <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg">
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
                        className="font-medium md:text-lg hover:text-red-600 hover:underline line-clamp-2 leading-tight transition-all duration-300"
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
                ))
              )}
            </div>
          </div>

          <div className="sticky top-4 space-y-6 transition-all duration-300">
            <Link
              href="https://example.com/ad1"
              className="block transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/ads/ads600X300.gif"
                  alt="Advertisement"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            {/* Google AdSense */}
            <GoogleAdsense
              client="ca-pub-4798069224424379"
              slot="3438443280"
              format="auto"
              responsive={true}
              className="w-full min-h-[250px] bg-gray-50 rounded-lg overflow-hidden"
            />
            <GoogleAdsenseScript />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
