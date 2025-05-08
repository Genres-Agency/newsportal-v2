"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileImage, FileVideo, HardDrive } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllMedia } from "../media-action";
import { format } from "date-fns";

export function MediaStats() {
  const { data: mediaItems } = useQuery({
    queryKey: ["media"],
    queryFn: getAllMedia,
  });

  const totalImages =
    mediaItems?.filter((item) => item.type === "IMAGE").length || 0;
  const totalVideos =
    mediaItems?.filter((item) => item.type === "VIDEO").length || 0;
  const totalSize = mediaItems?.reduce((acc, item) => acc + item.size, 0) || 0;
  const latestUpload = mediaItems?.length
    ? format(
        new Date(
          Math.max(
            ...mediaItems.map((item) => new Date(item.createdAt).getTime())
          )
        ),
        "PPp"
      )
    : "No uploads yet";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Images</CardTitle>
          <FileImage className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalImages}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Available images in gallery
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          <FileVideo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVideos}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Available videos in gallery
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(totalSize / (1024 * 1024)).toFixed(2)} MB
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Total space used by media
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Activity</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mediaItems?.length || 0}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Last upload: {latestUpload}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
