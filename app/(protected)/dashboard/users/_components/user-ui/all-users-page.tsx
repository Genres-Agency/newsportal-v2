import { Separator } from "@/components/ui/separator";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { getAllUsers } from "../../user-action";
import { DataTable } from "../../../../_components/table/data-table";
import { columns } from "./columns";
import { userRoles } from "./data/data";
import { UserRole } from "@prisma/client";

export default async function UsersListPage() {
  const users = await getAllUsers();
  const totalUsers = users.length;
  const bannedUsers = users.filter(
    (user) => user.role === UserRole.BANNED
  ).length;

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
              data={users}
              columns={columns}
              searchKey="email"
              filterKey="role"
              filterOptions={userRoles}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
