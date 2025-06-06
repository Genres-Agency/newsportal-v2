import { Metadata } from "next";
import client from "@/prisma";
import { notFound } from "next/navigation";
import ShareButtons from "@/app/components/ShareButtons";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await client.news.findUnique({
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
  const news = await client.news.findUnique({
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
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-gray-600">
                <time dateTime={news.createdAt.toISOString()}>
                  তারিখ: {new Date(news.createdAt).toLocaleDateString()}
                </time>
                <div className="flex gap-2">
                  {news.categories.map((cat) => (
                    <span
                      key={cat.category.id}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {cat.category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ShareButtons
              url={`${process.env.NEXT_PUBLIC_APP_URL}/news/${news.slug}`}
              title={news.title}
            />
          </div>
        </header>

        {news.media && (
          <div className="mb-8">
            <Image
              width={1200}
              height={630}
              src={news.media.url}
              alt={news.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {news.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
