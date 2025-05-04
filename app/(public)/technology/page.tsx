import React from "react";
import { Metadata } from "next";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "প্রযুক্তি - Technology News",
  description:
    "Latest technology news and updates from Bangladesh and around the world",
};

export default async function TechnologyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">প্রযুক্তি</h1>
      <NewsGrid category="প্রযুক্তি" />
    </div>
  );
}
