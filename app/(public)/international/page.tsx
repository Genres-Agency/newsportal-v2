import React from "react";
import { Metadata } from "next";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "আন্তর্জাতিক - International News",
  description: "Latest international news and global updates",
};

export default async function InternationalPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">আন্তর্জাতিক</h1>
      <NewsGrid category="আন্তর্জাতিক" />
    </div>
  );
}
