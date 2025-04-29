import { NextResponse } from "next/server";
import client from "@/prisma";

export async function GET() {
  try {
    const news = await client.news.findMany({
      where: {
        status: "PUBLISHED",
      },
      include: {
        media: true,
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
