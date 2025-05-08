import { Metadata } from "next";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { AdsClient } from "../_components/ads-client";
import { getAdvertisements } from "../ads-action";

export const metadata: Metadata = {
  title: "Square Advertisements",
  description: "Manage square advertisement placements",
};

export default async function SquareAdsPage() {
  const ads = await getAdvertisements("SQUARE");
  return (
    <RoleGate allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdsClient
          ads={ads}
          title="Square Advertisements"
          description="Manage square advertisement placements"
        />
      </div>
    </RoleGate>
  );
}
