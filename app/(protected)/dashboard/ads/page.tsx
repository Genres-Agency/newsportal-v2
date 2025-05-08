import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Advertisement Management",
  description: "Manage all advertisement related content",
};

import { AdsClient } from "./_components/ads-client";
import { getAdvertisements } from "./ads-action";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  LineChart,
  Target,
  DollarSign,
  Square,
  ArrowRight,
  LayoutTemplate,
  LayoutPanelTop,
  Maximize2,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default async function AdsPage() {
  const ads = await getAdvertisements();
  const totalAds = ads.length;
  const activeAds = ads.filter((ad) => ad.status === "PUBLISHED").length;

  return (
    <RoleGate allowedRoles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Advertisement Dashboard"
            description="Manage and monitor your advertising campaigns"
          />{" "}
          <Link
            href={"/dashboard/ads/create"}
            className="flex items-center gap-2 bg-white rounded-md text-black px-4 py-2 shadow-md hover:shadow-lg transition"
          >
            <Plus className="h-4 w-4" />
            Create Advertisement
          </Link>
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Total Advertisements</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{totalAds}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Active Campaigns</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{activeAds}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Total Impressions</p>
            </div>
            <p className="mt-2 text-2xl font-bold">0</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Total Revenue</p>
            </div>
            <p className="mt-2 text-2xl font-bold">$0</p>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 hover:bg-accent cursor-pointer transition">
            <a
              href="/dashboard/ads/square"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                <span className="font-medium">Square Ads</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Card>
          <Card className="p-4 hover:bg-accent cursor-pointer transition">
            <a
              href="/dashboard/ads/horizontal"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4" />
                <span className="font-medium">Horizontal Ads</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Card>
          <Card className="p-4 hover:bg-accent cursor-pointer transition">
            <a
              href="/dashboard/ads/vertical"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <LayoutPanelTop className="h-4 w-4" />
                <span className="font-medium">Vertical Ads</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Card>
          <Card className="p-4 hover:bg-accent cursor-pointer transition">
            <a
              href="/dashboard/ads/popup"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4" />
                <span className="font-medium">Popup Ads</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Card>
          <Card className="p-4 hover:bg-accent cursor-pointer transition">
            <a
              href="/dashboard/ads/performance"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="font-medium">Performance</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Card>
        </div>
      </div>
    </RoleGate>
  );
}
