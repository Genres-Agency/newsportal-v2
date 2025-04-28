import { NextResponse } from "next/server";
import client from "@/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // First, find the category by slug
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

    // Then find all news for this category
    const news = await client.news.findMany({
      where: {
        category: category.name,
        status: "PUBLISHED",
      },
      include: {
        media: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news by category" },
      { status: 500 }
    );
  }
}
