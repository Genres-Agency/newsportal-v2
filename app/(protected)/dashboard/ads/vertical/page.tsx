import { Metadata } from "next";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { AdsClient } from "../_components/ads-client";
import { getAdvertisements } from "../ads-action";

export const metadata: Metadata = {
  title: "Vertical Advertisements",
  description: "Manage vertical advertisement placements",
};

export default async function VerticalAdsPage() {
  const ads = await getAdvertisements("VERTICAL");
  return (
    <RoleGate allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdsClient
          ads={ads}
          title="Vartical Advertisements"
          description="Manage vartical advertisement placements"
        />
      </div>
    </RoleGate>
  );
}
