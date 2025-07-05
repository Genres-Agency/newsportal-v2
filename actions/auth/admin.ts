"use server";

import { auth } from "@/server/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const session = await auth();

  if (session?.user?.role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
