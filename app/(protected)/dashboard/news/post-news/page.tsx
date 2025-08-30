import PageContainer from "@/app/(protected)/_components/page-container";
import React from "react";
import AddNewsForm from "../_components/AddNewsForm";
import { api } from "@/trpc/server";

export const metadata = {
  title: "Dashboard : Post News",
};

export default async function PostNewsPage() {
  const categories = await api.news.getEnabledCategories();

  return (
    <div>
      <PageContainer>
        <AddNewsForm categories={categories} />
      </PageContainer>
    </div>
  );
}
