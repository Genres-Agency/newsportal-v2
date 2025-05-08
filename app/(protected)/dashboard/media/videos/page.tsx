import { Suspense } from "react";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { VideoGallery } from "../_components/video-gallery";
import { LoadingPage } from "@/components/loading";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Dashboard : Video Management",
};

export default function VideosPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-5">
          <Heading
            title="Video Management"
            description="Browse and manage your uploaded videos"
          />
          <Link
            href={"/dashboard/media/upload"}
            className="flex items-center gap-2 bg-white rounded-md text-black px-4 py-2 shadow-md hover:shadow-lg transition"
          >
            <Plus className="h-4 w-4" />
            Upload Video
          </Link>
        </div>
        <Separator />
        <Suspense fallback={<LoadingPage />}>
          <VideoGallery />
        </Suspense>
      </div>
    </PageContainer>
  );
}
