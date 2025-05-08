import { Suspense } from "react";
import { LoadingPage } from "@/components/loading";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { CreateAdForm } from "../_components/create-ad-form";

export const metadata = {
  title: "Create Advertisement",
  description: "Create a new advertisement",
};

const CreateAdPage = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <RoleGate allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
        <Suspense fallback={<LoadingPage />}>
          <CreateAdForm />
        </Suspense>
      </RoleGate>
    </div>
  );
};

export default CreateAdPage;
