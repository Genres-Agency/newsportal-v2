import { Metadata } from "next";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

export const metadata: Metadata = {
  title: "Advertisement Performance",
  description: "Track and analyze advertisement metrics",
};

export default function AdPerformancePage() {
  return (
    <RoleGate allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Advertisement Performance
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Total Impressions</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Total Clicks</h3>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">CTR</h3>
            <p className="mt-2 text-3xl font-bold">0%</p>
          </div>
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Revenue</h3>
            <p className="mt-2 text-3xl font-bold">$0</p>
          </div>
        </div>
        <div className="mt-8 rounded-xl border p-6">
          <h3 className="mb-4 text-xl font-semibold">Performance Graph</h3>
          <div className="h-[400px] w-full bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">
              Performance data visualization coming soon
            </p>
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
