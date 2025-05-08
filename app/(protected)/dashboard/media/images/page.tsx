import { Suspense } from "react";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "../_components/image-gallery";
import { LoadingPage } from "@/components/loading";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Dashboard : Image Gallery",
};

export default function ImagesPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-5">
          <Heading
            title="Image Gallery"
            description="Browse and manage your uploaded images"
          />
          <Link
            href={"/dashboard/media/upload"}
            className="flex items-center gap-2 bg-white rounded-md text-black px-4 py-2 shadow-md hover:shadow-lg transition"
          >
            <Plus className="h-4 w-4" />
            Upload Image
          </Link>
        </div>
        <Separator />
        <Suspense fallback={<LoadingPage />}>
          <ImageGallery />
        </Suspense>
      </div>
    </PageContainer>
  );
}
