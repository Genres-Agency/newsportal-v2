import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all published news grouped by category
    const newsWithCategories = await prisma.news.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        category: true,
        media: {
          select: {
            url: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Group news by category
    const groupedNews = newsWithCategories.reduce((acc, news) => {
      if (!acc[news.category]) {
        acc[news.category] = [];
      }
      acc[news.category].push(news);
      return acc;
    }, {} as Record<string, typeof newsWithCategories>);

    return NextResponse.json(groupedNews);
  } catch (error) {
    console.error("Error fetching news by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
