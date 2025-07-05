import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  if (session.user?.role === UserRole.USER) {
    return redirect("/pending");
  }

  return redirect("/dashboard/overview");
}
