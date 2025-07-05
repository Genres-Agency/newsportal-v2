"use client";
import { UserInfo } from "@/components/user-info";
import { useSession } from "next-auth/react";
import React from "react";

const ClientPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <UserInfo label="Client Component" user={session?.user} />
    </div>
  );
};

export default ClientPage;
