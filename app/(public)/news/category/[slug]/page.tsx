import { Metadata } from "next";
import client from "@/prisma";
import { getCategoryNews } from "@/lib/actions/getCategoryNews";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await client.category.findUnique({
    where: {
      slug: (await params).slug,
      status: "PUBLISHED",
    },
    select: { name: true, description: true },
  });

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - News Category`,
    description:
      category.description || `Latest news from ${category.name} category`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  try {
    const page = Number((await searchParams).page) || 1;
    const { category, news, pagination } = await getCategoryNews({
      slug: (await params).slug,
      page,
    });

    return (
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((newsItem) => (
            <article
              key={newsItem.news.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {newsItem.news.media && (
                <img
                  src={newsItem.news.media.url}
                  alt={newsItem.news.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                  <a href={`/news/${newsItem.news.slug}`}>
                    {newsItem.news.title}
                  </a>
                </h2>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <time dateTime={newsItem.news.createdAt.toISOString()}>
                    {new Date(newsItem.news.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <a
                  key={pageNum}
                  href={`/news/category/${category.slug}?page=${pageNum}`}
                  className={`px-4 py-2 rounded ${
                    pageNum === pagination.currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </a>
              )
            )}
          </div>
        )}
      </main>
    );
  } catch (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">
            {error instanceof Error
              ? error.message
              : "Failed to load category news"}
          </p>
        </div>
      </main>
    );
  }
}
