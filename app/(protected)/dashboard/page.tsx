import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  if (user.role === UserRole.USER) {
    return redirect("/pending");
  }

  return redirect("/dashboard/overview");
}
