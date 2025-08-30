"use client";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { api } from "@/trpc/react";
import { DataTable } from "../../../../_components/table/data-table";
import { columns } from "./columns";
import { userRoles } from "./data/data";
import { UserRole } from "@prisma/client";
import { useCallback, useState } from "react";

export default function UsersListPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: users } = api.users.getUsers.useQuery({
    page: pageIndex,
    limit: pageSize,
  });
  const totalUsers = users?.total!;
  const bannedUsers = users?.items?.filter(
    (user) => user.role === UserRole.BANNED
  ).length!;

  const handlePageChange = useCallback((newPageIndex: number) => {
    setPageIndex(newPageIndex);
  }, []);
  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(0);
  }, []);

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Total Users (${totalUsers})`}
            description={`Active Users: ${
              totalUsers - bannedUsers
            } | Banned Users: ${bannedUsers}`}
          />
        </div>
        <Separator />
        <div className="relative w-full">
          <div className="overflow-x-auto">
            <DataTable
              data={users?.items ?? []}
              columns={columns}
              searchKey="email"
              filterKey="role"
              filterOptions={userRoles}
              searchPlaceholder="Search by email..."
              filterPlaceholder="Filter by role"
              pageCount={totalUsers}
              pageIndex={pageIndex}
              pageSize={pageSize}
              setPageIndex={handlePageChange}
              setPageSize={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
