import PageContainer from "@/app/(protected)/_components/page-container";
import AddUserForm from "../_components/AddUserForm";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { RoleGuard } from "@/components/auth/role-guard";
import { UserRole } from "@prisma/client";

export const metadata = {
  title: "Dashboard : Add User",
};

export default async function AddUserPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
      <PageContainer>
        <div className="space-y-6">
          <div>
            <Heading
              title="Add New User"
              description="Create a new user account"
            />
          </div>
          <Separator />
          <AddUserForm />
        </div>
      </PageContainer>
    </RoleGuard>
  );
}
