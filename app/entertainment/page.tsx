import React from "react";
import { Metadata } from "next";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "বিনোদন - Entertainment News",
  description:
    "Latest entertainment news and updates from Bangladesh and around the world",
};

export default async function EntertainmentPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">বিনোদন</h1>
      <NewsGrid category="বিনোদন" />
    </div>
  );
}
