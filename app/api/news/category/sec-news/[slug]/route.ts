import { NextResponse } from "next/server";
import client from "@/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Find the category by slug
    const category = await client.category.findUnique({
      where: {
        slug: params.slug,
        status: "PUBLISHED",
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Fetch the latest 7 news items from the category
    const news = await client.news.findMany({
      where: {
        categories: {
          some: {
            category: {
              id: category.id,
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
      take: 7,
    });

    // Structure the response with featured and grid news
    const response = {
      featured: news[0] || null,
      grid: news.slice(1),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news by category" },
      { status: 500 }
    );
  }
}
