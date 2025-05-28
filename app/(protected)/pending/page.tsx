import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserRole } from "@prisma/client";
import Link from "next/link";

export default async function PendingPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  if (user.role !== UserRole.USER) {
    return redirect("/dashboard/overview");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 bg-background p-4">
      <div className="max-w-[500px] text-center space-y-4">
        <h1 className="text-2xl font-bold">Account Pending Approval</h1>
        <p className="text-muted-foreground">
          Your account is currently pending administrator approval. You will be
          notified once your account has been approved.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Go to Home Page</Button>
        </Link>
        <LogoutButton>
          <Button variant="destructive">Sign Out</Button>
        </LogoutButton>
      </div>
    </div>
  );
}
