import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const categories = ["রাজনীতি", "আন্তর্জাতিক", "বাংলাদেশ"];

export async function GET() {
  try {
    const results = await Promise.all(
      categories.map(async (category) => {
        const newsItems = await prisma.news.findMany({
          where: {
            categories: {
              some: {
                category: {
                  name: category,
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 2,
          include: {
            media: true,
          },
        });
        return {
          category: category,
          news: newsItems,
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch latest news" },
      { status: 500 }
    );
  }
}
