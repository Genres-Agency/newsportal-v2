import { NextResponse } from "next/server";
import client from "@/prisma";

export async function GET() {
  try {
    const categories = await client.category.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
