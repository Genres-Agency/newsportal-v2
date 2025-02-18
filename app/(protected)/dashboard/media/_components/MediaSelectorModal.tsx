"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getAllMedia } from "../media-action";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileVideo } from "lucide-react";
import { useState } from "react";

interface MediaSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMediaSelect: (
    mediaId: string,
    url: string,
    type: "IMAGE" | "VIDEO"
  ) => void;
  onFileSelect: (file: File | null) => void;
  defaultImage?: string | null;
  imageError?: boolean;
  reset?: boolean;
}

export function MediaSelectorModal({
  open,
  onOpenChange,
  onMediaSelect,
  onFileSelect,
  defaultImage,
  imageError,
  reset,
}: MediaSelectorModalProps) {
  const { data: mediaItems } = useQuery({
    queryKey: ["media"],
    queryFn: getAllMedia,
  });
  const [mediaFilter, setMediaFilter] = useState<"ALL" | "IMAGE" | "VIDEO">(
    "ALL"
  );

  const filteredMedia =
    mediaItems?.filter((item) => {
      if (mediaFilter === "ALL") return true;
      return item.type === mediaFilter;
    }) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="video">YouTube Video</TabsTrigger>
              <TabsTrigger value="library">Media Library</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card>
                <CardContent className="pt-6">
                  <ImageUpload
                    onFileSelect={(file) => {
                      onFileSelect(file);
                      if (file) {
                        onOpenChange(false);
                      }
                    }}
                    defaultImage={defaultImage}
                    imageError={imageError}
                    reset={reset}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label>YouTube Video URL</Label>
                    <Input
                      type="url"
                      placeholder="Enter YouTube video URL"
                      onChange={(e) => {
                        if (e.target.value) {
                          onMediaSelect("youtube", e.target.value, "VIDEO");
                          onOpenChange(false);
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="library">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <Select
                    value={mediaFilter}
                    onValueChange={(value: any) => setMediaFilter(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter media" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Media</SelectItem>
                      <SelectItem value="IMAGE">Images Only</SelectItem>
                      <SelectItem value="VIDEO">Videos Only</SelectItem>
                    </SelectContent>
                  </Select>

                  <RadioGroup
                    onValueChange={(value) => {
                      const media = filteredMedia.find((m) => m.id === value);
                      if (media) {
                        onMediaSelect(media.id, media.url, media.type);
                        onOpenChange(false);
                      }
                    }}
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {filteredMedia.map((media) => (
                        <div key={media.id} className="space-y-2">
                          <RadioGroupItem
                            value={media.id}
                            id={media.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={media.id}
                            className="block cursor-pointer rounded-lg border-2 border-muted peer-checked:border-primary"
                          >
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                              {media.type === "IMAGE" ? (
                                <Image
                                  src={media.url}
                                  alt={media.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-muted">
                                  <FileVideo className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <p className="mt-2 text-xs font-medium truncate">
                              {media.title}
                            </p>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
