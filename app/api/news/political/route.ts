import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch political news ordered by creation date
    const politicalNews = await prisma.news.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: "রাজনীতি",
            },
          },
        },
        status: "PUBLISHED",
      },
      include: {
        media: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6, // Fetch 6 items - first will be displayed large, rest small
    });

    return NextResponse.json({
      latestNews: politicalNews[0], // First news item for large display
      recentNews: politicalNews.slice(1), // Remaining news items for small display
    });
  } catch (error) {
    console.error("Error fetching political news:", error);
    return NextResponse.json(
      { error: "Failed to fetch political news" },
      { status: 500 }
    );
  }
}
