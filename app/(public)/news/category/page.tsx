import React, { Suspense } from "react";
import { getCategories } from "@/lib/actions/getCategories";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative flex flex-col gap-2 items-center">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground animate-pulse">
          Loading categories...
        </span>
      </div>
    </div>
  );
}

async function Categories() {
  const { categories } = await getCategories();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/news/category/${category.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="mt-2 text-gray-600 text-sm">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Categories />
    </Suspense>
  );
}
