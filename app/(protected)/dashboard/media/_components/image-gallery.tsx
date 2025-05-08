"use client";

import { useQuery } from "@tanstack/react-query";
import { getMediaByType } from "../media-action";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { ImageIcon } from "lucide-react";

export function ImageGallery() {
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: () => getMediaByType("IMAGE"),
  });

  if (!images || images.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2">No images available</h3>
          <p className="text-sm text-muted-foreground">
            Upload some images to see them here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images?.map((image) => (
            <div key={image.id} className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{image.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(image.createdAt), "PPp")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
