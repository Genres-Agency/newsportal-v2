"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const RoleGuard = ({
  children,
  allowedRoles,
  redirectTo = "/not-found",
}: RoleGuardProps) => {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (user && !allowedRoles.includes(user.role)) {
      router.push(redirectTo);
    }
  }, [user, allowedRoles, router, redirectTo]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
