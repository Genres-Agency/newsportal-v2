"use server";

import client from "@/prisma";

export const postNews = async ({
  title,
  content,
  category,
  image,
  status,
  scheduledAt,
}: {
  title: string;
  content: string;
  category: string;
  image: string;
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

    const news = await client.news.create({
      data: {
        title,
        slug,
        content,
        category,
        image,
        status,
        scheduledAt: status === "SCHEDULED" ? scheduledAt : null,
      },
    });
    return news;
  } catch (error) {
    throw new Error(`Failed to create news: ${error}`);
  }
};

export const getAllNews = async () => {
  try {
    const news = await client.news.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        category: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        status: true, // This should now work
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
    const scheduledNews = await client.news.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: {
          lte: now,
        },
      },
    });

    // Update all found news to PUBLISHED
    for (const news of scheduledNews) {
      await client.news.update({
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
    await client.news.delete({
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
  category,
  image,
  status,
  scheduledAt,
}: {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  status: "PUBLISHED" | "PRIVATE" | "SCHEDULED";
  scheduledAt?: Date | null;
}) => {
  try {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const news = await client.news.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        category,
        image,
        status,
        scheduledAt: status === "SCHEDULED" ? scheduledAt : null,
      },
    });
    return news;
  } catch (error) {
    throw new Error(`Failed to update news: ${error}`);
  }
};
