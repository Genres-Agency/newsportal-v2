"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user && !allowedRoles.includes(session.user.role)) {
      router.push(redirectTo);
    }
  }, [session, allowedRoles, router, redirectTo]);

  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return null;
  }

  return <>{children}</>;
};
