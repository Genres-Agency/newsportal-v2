import { Separator } from "@/components/ui/separator";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { getAllUsers } from "../../user-action";
import { DataTable } from "../../../../_components/table/data-table";
import { columns } from "./columns";
import { userRoles } from "./data/data";

export default async function UsersListPage() {
  const users = await getAllUsers();
  const totalUsers = users.length;

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Total Users (${totalUsers})`}
            description="Manage user roles and permissions"
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
