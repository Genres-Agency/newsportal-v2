"use server";
import { db } from "../database.connection";

type Media = {
  url: string;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media: Media | null;
  createdAt: Date;
};

export const getBangladeshNews = async (): Promise<NewsItem[] | null> => {
  try {
    const news = await db.news.findMany({
      where: { categories: { some: { category: { name: "Bangladesh" } } } },
      orderBy: { createdAt: "desc" },
      include: {
        media: true,
      },
      take: 10,
    });
    return news;
  } catch (error) {
    console.error("Error fetching Bangladesh news:", error);
    return null;
  }
};
