import React, { Suspense } from "react";
import { LoadingPage } from "@/components/loading";
import UsersListPage from "./_components/user-ui/all-users-page";
import ErrorBoundary from "./_components/ErrorBoundary";

export const metadata = {
  title: "Dashboard : Users Management",
};

const UsersPage = () => {
  return (
    <div className="overflow-x-auto">
      <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <UsersListPage />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UsersPage;
