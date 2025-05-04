import React from "react";
import { Metadata } from "next";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "রাজনীতি - Political News",
  description: "Latest political news and updates from Bangladesh",
};

export default async function PoliticsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">রাজনীতি</h1>
      <NewsGrid category="রাজনীতি" />
    </div>
  );
}
