import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch featured news (latest news from Bangladesh category)
    const featuredNews = await prisma.news.findFirst({
      where: {
        categories: {
          some: {
            category: {
              name: "বাংলাদেশ",
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        media: true,
      },
    });

    // Fetch regular news (excluding featured news)
    const regularNews = await prisma.news.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: "বাংলাদেশ",
            },
          },
        },
        NOT: {
          id: featuredNews?.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      include: {
        media: true,
      },
    });

    return NextResponse.json({
      featuredNews,
      regularNews,
    });
  } catch (error) {
    console.error("Error fetching Bangladesh news:", error);
    return NextResponse.json(
      { error: "Failed to fetch Bangladesh news" },
      { status: 500 }
    );
  }
}
