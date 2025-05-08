"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdsTable } from "./ads-table";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";

interface AdsClientProps {
  ads: any[];
  title?: string;
  description?: string;
}

export const AdsClient = ({
  ads,
  title = "Advertisements",
  description = "Manage your website advertisements",
}: AdsClientProps) => {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        <Button
          onClick={() => router.push("/dashboard/ads/create")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Advertisement
        </Button>
      </div>
      <Separator />
      <AdsTable ads={ads} />
    </div>
  );
};
