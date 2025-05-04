import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

interface News {
  id: string;
  title: string;
  content: string;
  media: {
    url: string;
  } | null;
  createdAt: string;
}

async function getNewsByCategory(slug: string): Promise<News[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news/category/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}

export default async function CategoryPage({ params }: Props) {
  const news = await getNewsByCategory(params.slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {params.slug.replace(/-/g, " ")} News
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {item.media && (
              <div className="relative h-48 w-full">
                <Image
                  src={item.media.url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <Link href={`/news/${item.id}`} className="block">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <time dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </time>
                <Link
                  href={`/news/${item.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">
            No news found in this category
          </h2>
        </div>
      )}
    </main>
  );
}
