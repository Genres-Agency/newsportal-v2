import React from "react";
import { Metadata } from "next";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "খেলাধুলা - Sports News",
  description:
    "Latest sports news and updates from Bangladesh and around the world",
};

export default async function SportsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">খেলাধুলা</h1>
      <NewsGrid category="খেলাধুলা" />
    </div>
  );
}
