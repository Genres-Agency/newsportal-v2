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
        });
        return { [category]: newsItems };
      })
    );

    const data = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch latest news" },
      { status: 500 }
    );
  }
}
