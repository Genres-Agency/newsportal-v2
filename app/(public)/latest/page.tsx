import React from "react";
import { Metadata } from "next";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "সর্বশেষ - Latest News",
  description:
    "Latest breaking news and updates from Bangladesh and around the world",
};

export default async function LatestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">সর্বশেষ সংবাদ</h1>
      <NewsGrid category="সর্বশেষ" />
    </div>
  );
}
