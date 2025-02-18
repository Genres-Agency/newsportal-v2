import { Suspense } from "react";
import PageContainer from "@/app/(protected)/_components/page-container";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "../_components/image-gallery";
import { LoadingPage } from "@/components/loading";

export const metadata = {
  title: "Dashboard : Image Gallery",
};

export default function ImagesPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <Heading
          title="Image Gallery"
          description="Browse and manage your uploaded images"
        />
        <Separator />
        <Suspense fallback={<LoadingPage />}>
          <ImageGallery />
        </Suspense>
      </div>
    </PageContainer>
  );
}
