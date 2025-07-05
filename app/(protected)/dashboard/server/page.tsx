import { UserInfo } from "@/components/user-info";
import { auth } from "@/server/auth";

import React from "react";

const ServerPage = async () => {
  const session = await auth();
  return (
    <div>
      <UserInfo label="Server" user={session?.user} />
    </div>
  );
};

export default ServerPage;
