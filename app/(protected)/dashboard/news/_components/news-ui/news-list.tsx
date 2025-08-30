"use client";

import { DataTable } from "../../../../_components/table/data-table";
import { columns } from "./columns";
import { getCategoryOptions } from "./data/data";
import { statuses } from "./data/data";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/app/(protected)/_components/page-container";
import { api } from "@/trpc/react";
import { useState, useCallback, useEffect } from "react";

export default function NewsList() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState<"PUBLISHED" | "PRIVATE" | "SCHEDULED">(
    "PUBLISHED"
  );
  const [category, setCategory] = useState("");

  const {
    data: newsData,
    error,
    isLoading,
  } = api.news.getNews.useQuery({
    take: pageSize,
    skip: pageIndex * pageSize,
    status: status,
    category: category,
  });

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = api.news.getEnabledCategories.useQuery();

  const handlePageChange = useCallback((newPageIndex: number) => {
    setPageIndex(newPageIndex);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(0); // Reset to first page when changing items per page
  }, []);

  const handleStatusChange = useCallback(
    (newStatus: "PUBLISHED" | "PRIVATE" | "SCHEDULED") => {
      setStatus(newStatus);
      setPageIndex(0); // Reset to first page when changing status
    },
    []
  );

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
    setPageIndex(0); // Reset to first page when changing category
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPageIndex(0);
  }, [status, category]);

  if (!newsData || !categories || !Array.isArray(categories)) {
    return <div className="p-5">Loading...</div>;
  }

  const { items: news, total } = newsData;
  const categoryOptions = getCategoryOptions(categories);
  const pageCount = Math.ceil(total / pageSize);

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Total News (${total})`}
            description="View all news"
          />
        </div>
        <Separator />
        <div className="relative w-full">
          <div className="overflow-x-auto">
            <DataTable
              data={news}
              columns={columns(categories)}
              searchKey="title"
              filterKey="status"
              filterOptions={statuses}
              categoryOptions={categoryOptions}
              searchPlaceholder="Search by title..."
              filterPlaceholder="Filter by status"
              pageCount={pageCount}
              pageIndex={pageIndex}
              pageSize={pageSize}
              setPageIndex={handlePageChange}
              setPageSize={handlePageSizeChange}
              setStatus={handleStatusChange}
              setCategory={handleCategoryChange}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
