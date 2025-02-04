"use server";

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const postNews = async ({
  title,
  content,
  category,
  image,
}: {
  title: string;
  content: string;
  category: string;
  image: string;
}) => {
  try {
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const news = await client.news.create({
      data: {
        title,
        slug,
        content,
        category,
        image,
      },
    });

    return news;
  } catch (error) {
    throw new Error(`Failed to create news: ${error}`);
  }
};
