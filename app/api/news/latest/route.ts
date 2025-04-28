import client from "@/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latestNews = await client.news.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 7,
      include: {
        media: true,
      },
    });

    return NextResponse.json(latestNews);
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest news" },
      { status: 500 }
    );
  }
}
