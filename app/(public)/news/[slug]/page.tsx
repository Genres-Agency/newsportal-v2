import { Metadata } from "next";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import ShareButtons from "@/app/components/ShareButtons";
import Image from "next/image";
import { CalendarDays, Tag } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await db.news.findUnique({
    where: { slug: decodeURIComponent((await params).slug) },
    select: {
      title: true,
      content: true,
      createdAt: true,
      media: {
        select: {
          url: true,
        },
      },
    },
  });

  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  const description = news.content.substring(0, 160);
  const ogImageUrl = news.media?.url || "";

  return {
    title: news.title,
    description,
    openGraph: {
      title: news.title,
      description,
      type: "article",
      publishedTime: news.createdAt.toISOString(),
      url: `${process.env.NEXT_PUBLIC_APP_URL}/news/${(await params).slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const decodedSlug = decodeURIComponent((await params).slug);
  const news = await db.news.findUnique({
    where: {
      slug: decodedSlug,
      status: "PUBLISHED",
    },
    include: {
      media: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!news) {
    notFound();
  }

  return (
    <main className="container mx-auto px-2 sm:px-4 py-6 min-h-screen ">
      <article className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
        <header className="mb-8 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 mb-2">
            {news.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <time dateTime={news.createdAt.toISOString()}>
                  {new Date(news.createdAt).toLocaleDateString()}
                </time>
              </span>
              <div className="flex flex-wrap gap-2">
                {news.categories.map((cat) => (
                  <span
                    key={cat.category.id}
                    className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 shadow-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {cat.category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-start sm:justify-end">
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_APP_URL}/news/${news.slug}`}
                title={news.title}
              />
            </div>
          </div>
        </header>

        {news.media && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-md border border-gray-100 bg-gray-50">
            <Image
              width={1200}
              height={630}
              src={news.media.url}
              alt={news.title}
              className="w-full h-auto aspect-video object-cover object-center transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {news.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
