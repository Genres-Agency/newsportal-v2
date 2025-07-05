"use server";

import { db } from "@/server/db";

export const postNews = async ({
  title,
  slug,
  content,
  categories,
  mediaId,
  status,
  scheduledAt,
  authorId,
}: {
  title: string;
  slug: string;
  content: string;
  categories: string[];
  mediaId?: string | null;
  status: "PUBLISHED" | "PRIVATE" | "SCHEDULED";
  scheduledAt?: Date | null;
    authorId: string;
}) => {
  try {
    // Validate scheduled posts
    if (status === "SCHEDULED" && !scheduledAt) {
      throw new Error("Scheduled posts must have a scheduledAt date");
    }

    if (status === "SCHEDULED" && scheduledAt && scheduledAt <= new Date()) {
      throw new Error("Scheduled time must be in the future");
    }

    const news = await db.news.create({
      data: {
        title,
        slug,
        content,
        mediaId,
        status,
        scheduledAt: status === "SCHEDULED" ? scheduledAt : null,
        categories: {
          create: categories.map((categoryName) => ({
            category: {
              connect: { name: categoryName },
            },
          })),
        },
        authorId,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    return news;
  } catch (error) {
    throw new Error(`Failed to create news: ${error}`);
  }
};

export const getAllNews = async () => {
  try {
    const news = await db.news.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        media: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    return news;
  } catch (error) {
    throw new Error(`Failed to fetch news: ${error}`);
  }
};

// Add this function to check and publish scheduled news
export const publishScheduledNews = async () => {
  try {
    const now = new Date();

    // Find all scheduled news that should be published
    const scheduledNews = await db.news.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: {
          lte: now,
        },
      },
    });

    // Update all found news to PUBLISHED
    for (const news of scheduledNews) {
      await db.news.update({
        where: { id: news.id },
        data: {
          status: "PUBLISHED",
          scheduledAt: null,
        },
      });
    }
  } catch (error) {
    console.error("Failed to publish scheduled news:", error);
  }
};

export const deleteNews = async (id: string) => {
  try {
    await db.news.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete news: ${error}`);
  }
};

export const updateNews = async ({
  id,
  title,
  content,
  categories,
  mediaId,
  status,
  scheduledAt,
}: {
  id: string;
  title: string;
  content: string;
  categories: string[];
  mediaId?: string | null;
  status: "PUBLISHED" | "PRIVATE" | "SCHEDULED";
  scheduledAt?: Date | null;
}) => {
  try {
    // Validate scheduled posts
    if (status === "SCHEDULED" && !scheduledAt) {
      throw new Error("Scheduled posts must have a scheduledAt date");
    }

    if (status === "SCHEDULED" && scheduledAt && scheduledAt <= new Date()) {
      throw new Error("Scheduled time must be in the future");
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return await db.news.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        mediaId,
        status,
        scheduledAt: status === "SCHEDULED" ? scheduledAt : null,
        categories: {
          deleteMany: {},
          create: categories.map((categoryName) => ({
            category: {
              connect: { name: categoryName },
            },
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(`Failed to update news: ${error}`);
  }
};
