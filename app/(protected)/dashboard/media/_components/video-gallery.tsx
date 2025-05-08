"use client";

import { useQuery } from "@tanstack/react-query";
import { getMediaByType } from "../media-action";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { FileVideo } from "lucide-react";

export function VideoGallery() {
  const { data: videos } = useQuery({
    queryKey: ["videos"],
    queryFn: () => getMediaByType("VIDEO"),
  });

  if (!videos || videos.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
          <FileVideo className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2">No videos available</h3>
          <p className="text-sm text-muted-foreground">
            Upload some videos to see them here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => (
            <div key={video.id} className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <iframe
                  src={video.url}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{video.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(video.createdAt), "PPp")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
