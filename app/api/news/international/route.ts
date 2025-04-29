import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch international news ordered by creation date
    const internationalNews = await prisma.news.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: "আন্তর্জাতিক",
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
      featuredNews: internationalNews[0] || null, // Featured news for large display
      sideNews: internationalNews.slice(1, 4), // 3 news items for side display
      latestNews: internationalNews.slice(4), // Remaining news items for latest section
    });
  } catch (error) {
    console.error("Error fetching international news:", error);
    return NextResponse.json(
      { error: "Failed to fetch international news" },
      { status: 500 }
    );
  }
}
