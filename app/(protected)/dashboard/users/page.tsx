import React, { Suspense } from "react";
import { LoadingPage } from "@/components/loading";
import UsersListPage from "./_components/user-ui/all-users-page";

export const metadata = {
  title: "Dashboard : Users Management",
};

const UsersPage = () => {
  return (
    <div className="overflow-x-auto">
      <Suspense fallback={<LoadingPage />}>
        <UsersListPage />
      </Suspense>
    </div>
  );
};

export default UsersPage;
