import PageContainer from "@/app/(protected)/_components/page-container";
import AddUserForm from "../_components/AddUserForm";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Dashboard : Add User",
};

export default async function AddUserPage() {
  return (
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
  );
}
