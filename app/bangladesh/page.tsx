import React from "react";
import { Metadata } from "next";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "সারাদেশ - Latest Bangladesh News",
  description: "Latest news and updates from all around Bangladesh",
};

export default async function BangladeshPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">সারাদেশ</h1>
      <NewsGrid category="বাংলাদেশ" />
    </div>
  );
}
