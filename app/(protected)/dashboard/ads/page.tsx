import { Metadata } from "next";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

export const metadata: Metadata = {
  title: "Advertisement Management",
  description: "Manage all advertisement related content",
};

import { AdsClient } from "./_components/ads-client";
import { getAdvertisements } from "./ads-action";

export default async function AdsPage() {
  const ads = await getAdvertisements();
  return <AdsClient ads={ads} />;
}
