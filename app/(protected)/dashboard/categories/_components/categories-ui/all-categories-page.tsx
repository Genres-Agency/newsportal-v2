"use client";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { DataTable } from "../../../../_components/table/data-table";
import { columns } from "./columns";
import { categoryStatuses } from "./data/data";
import { useState, useCallback } from "react";
import { api } from "@/trpc/react";

export default function CategoriesListPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState<"PUBLISHED" | "PRIVATE" | "SCHEDULED">(
    "PUBLISHED"
  );

  const { data: categories } = api.category.getCategories.useQuery({
    take: pageSize,
    skip: pageIndex * pageSize,
    status: status,
  });

  const handlePageChange = useCallback((newPageIndex: number) => {
    setPageIndex(newPageIndex);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(0);
  }, []);

  const handleStatusChange = useCallback(
    (newStatus: "PUBLISHED" | "PRIVATE" | "SCHEDULED") => {
      setStatus(newStatus);
      setPageIndex(0);
    },
    []
  );

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Categories (${categories?.total})`}
            description="Manage news categories"
          />
        </div>
        <Separator />
        <div className="relative w-full">
          <div className="overflow-x-auto">
            <DataTable
              data={categories?.items ?? []}
              columns={columns}
              searchKey="name"
              filterKey="status"
              filterOptions={categoryStatuses}
              filterPlaceholder="Filter by status"
              pageCount={categories?.total ?? 0}
              pageIndex={pageIndex}
              pageSize={pageSize}
              setPageIndex={handlePageChange}
              setPageSize={handlePageSizeChange}
              setStatus={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
