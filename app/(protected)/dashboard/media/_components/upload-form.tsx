"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addMedia } from "../media-action";
import ImageUpload from "@/components/ImageUpload";
import { uploadToImageBB } from "@/lib/image-upload";

const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  type: z.enum(["IMAGE", "VIDEO"]),
  videoUrl: z.string().regex(youtubeUrlRegex, "Invalid YouTube URL").optional(),
});

export function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "IMAGE",
      videoUrl: "",
    },
  });

  const mediaType = form.watch("type");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let url = "";

      if (values.type === "IMAGE") {
        if (!selectedFile) {
          toast.error("Please select an image to upload");
          return;
        }
        url = await uploadToImageBB(selectedFile);
      } else {
        if (!values.videoUrl) {
          toast.error("Please provide a YouTube video URL");
          return;
        }
        url = values.videoUrl;
      }

      await addMedia({
        title: values.title,
        description: values.description || "",
        type: values.type,
        url,
        size: selectedFile?.size || 0,
        mimeType: selectedFile?.type || "video/youtube",
      });

      toast.success("Media uploaded successfully");
      router.refresh();
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload media");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select media type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IMAGE">Image</SelectItem>
                      <SelectItem value="VIDEO">YouTube Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter media title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter media description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mediaType === "IMAGE" ? (
              <FormItem>
                <FormLabel>Image Upload</FormLabel>
                <ImageUpload
                  onFileSelect={(file) => setSelectedFile(file)}
                  reset={!selectedFile}
                />
              </FormItem>
            ) : (
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter YouTube video URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Media"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
