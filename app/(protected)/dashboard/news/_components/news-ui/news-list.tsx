"use client";

import { DataTable } from "../../../../_components/table/data-table";
import { columns } from "./columns";
import { getCategoryOptions } from "./data/data";
import { statuses } from "./data/data";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/app/(protected)/_components/page-container";

export default function NewsList({
  allNews = [],
  categories = [],
}: {
  allNews?: any[];
  categories?: any[];
}) {
  if (!Array.isArray(allNews) || !Array.isArray(categories)) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <Heading title="Error" description="Failed to load news data" />
        </div>
      </PageContainer>
    );
  }

  const categoryOptions = getCategoryOptions(categories);
  const totalNews = allNews.length;

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Total News (${totalNews})`}
            description="View all news"
          />
        </div>
        <Separator />
        <div className="relative w-full">
          <div className="overflow-x-auto">
            <DataTable
              data={allNews}
              columns={columns(categories)}
              searchKey="title"
              filterKey="status"
              filterOptions={statuses}
              categoryOptions={categoryOptions}
              searchPlaceholder="Search by title..."
              filterPlaceholder="Filter by status"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
