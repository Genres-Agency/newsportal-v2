import { db } from "@/lib/database.connection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latestNews = await db.news.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
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
