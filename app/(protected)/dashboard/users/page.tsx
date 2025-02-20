import React, { Suspense } from "react";
import { LoadingPage } from "@/components/loading";
import UsersListPage from "./_components/user-ui/all-users-page";
import ErrorBoundary from "./_components/ErrorBoundary";
import { RoleGuard } from "@/components/auth/role-guard";
import { UserRole } from "@prisma/client";

export const metadata = {
  title: "Dashboard : Users Management",
};

const UsersPage = () => {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <UsersListPage />
          </Suspense>
        </ErrorBoundary>
      </div>
    </RoleGuard>
  );
};

export default UsersPage;
