import { getSelectedCategories } from "@/lib/actions/getSelectedCategories";
import Image from "next/image";
import Link from "next/link";

interface Media {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  title: string;
  url: string;
  description: string | null;
  size: number;
  mimeType: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  slug: string;
  media: Media | null;
}

interface CategoryNews {
  id: string;
  news: News;
}

interface Category {
  name: string;
  news: CategoryNews[];
}

export default async function CategorySection() {
  let categories: Category[] = [];
  let error = null;

  try {
    const result = await getSelectedCategories();
    categories = result.categories;
  } catch (e) {
    error = e;
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 text-center">
        <p className="text-red-600">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h2 className="text-xl font-bold text-red-600 pb-2 mb-4 border-b border-gray-200">
              {category.name}
            </h2>
            <div className="space-y-4">
              {category.news.map((item) => (
                <div key={item.id} className="group">
                  <div className="relative h-48 mb-2 overflow-hidden rounded">
                    <Image
                      src={item.news.media?.url || "/images/placeholder.jpg"}
                      alt={item.news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold hover:text-red-600 line-clamp-2 mb-2">
                    <Link href={`/news/${item.news.slug}`}>
                      {item.news.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.news.content}
                  </p>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link
                  href={`/category/${category.name}`}
                  className="text-red-600 hover:underline flex justify-end"
                >
                  আরও দেখুন →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
