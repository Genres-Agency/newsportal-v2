"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { updateNews } from "../../news-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DateTimePicker } from "@/components/DateTimePicker";
import { format, set } from "date-fns";
import { uploadToImageBB } from "@/lib/image-upload";
import { addMedia } from "../../../media/media-action";
import { MediaSelectorModal } from "../../../media/_components/MediaSelectorModal";
import { Upload } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(10),
  category: z.string(),
  mediaId: z.string().optional(),
  status: z.enum(["PUBLISHED", "PRIVATE", "SCHEDULED"]),
  scheduledAt: z.date().optional(),
  scheduledTime: z.string().optional(),
});

export function EditNewsDialog({
  news,
  categories,
  open,
  onOpenChange,
}: {
  news: any;
  categories: any[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(
    news.mediaId
  );
  const [mediaUrl, setMediaUrl] = useState<string | null>(
    news.media?.url || null
  );
  const router = useRouter();
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<
    "IMAGE" | "VIDEO" | null
  >(news.media?.type || null);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(
    news.media?.url || null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: news.title,
      content: news.content,
      category: news.category,
      mediaId: news.mediaId,
      status: news.status,
      scheduledAt: news.scheduledAt ? new Date(news.scheduledAt) : undefined,
      scheduledTime: news.scheduledAt
        ? format(new Date(news.scheduledAt), "HH:mm")
        : undefined,
    },
  });

  const handleMediaSelect = (mediaId: string, url: string) => {
    setSelectedMediaId(mediaId);
    setMediaUrl(url);
    setSelectedFile(null);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setSelectedMediaId(null);
    setMediaUrl(null);
  };

  const isFormDirty = form.formState.isDirty || selectedFile !== null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let finalMediaId = selectedMediaId;

      if (selectedFile) {
        const imageUrl = await uploadToImageBB(selectedFile);
        const newMedia = await addMedia({
          title: values.title,
          url: imageUrl,
          type: "IMAGE",
          description: "News banner image",
          size: selectedFile.size,
          mimeType: selectedFile.type,
        });
        finalMediaId = newMedia.id;
      }

      let scheduledDateTime = undefined;
      if (
        values.status === "SCHEDULED" &&
        values.scheduledAt &&
        values.scheduledTime
      ) {
        const [hours, minutes] = values.scheduledTime.split(":").map(Number);
        scheduledDateTime = set(values.scheduledAt, {
          hours,
          minutes,
          seconds: 0,
        });
      }

      await updateNews({
        id: news.id,
        ...values,
        mediaId: finalMediaId,
        scheduledAt: scheduledDateTime,
      });

      toast.success("News updated successfully");
      router.refresh();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update news");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit News</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value !== "SCHEDULED") {
                        form.setValue("scheduledAt", undefined);
                        form.setValue("scheduledTime", undefined);
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                      <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("status") === "SCHEDULED" && (
              <FormField
                control={form.control}
                name="scheduledAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Date & Time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value}
                        setDate={(date) => {
                          field.onChange(date);
                          if (date) {
                            const timeString = format(date, "HH:mm");
                            form.setValue("scheduledTime", timeString);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="mediaId"
              render={() => (
                <FormItem>
                  <FormLabel>Media</FormLabel>
                  <div
                    className="cursor-pointer border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors"
                    onClick={() => setShowMediaSelector(true)}
                  >
                    {selectedMediaUrl ? (
                      <div className="relative aspect-video w-full max-w-sm mx-auto">
                        {selectedMediaType === "IMAGE" ? (
                          <Image
                            src={selectedMediaUrl}
                            alt="Selected media"
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <iframe
                            src={selectedMediaUrl}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to select media
                        </p>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                type="button"
              >
                Discard
              </Button>
              <Button type="submit" disabled={!isFormDirty}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>

      <MediaSelectorModal
        open={showMediaSelector}
        onOpenChange={setShowMediaSelector}
        onMediaSelect={(id, url, type) => {
          setSelectedMediaType(type);
          setSelectedMediaUrl(url);
          setSelectedMediaId(id);
          setSelectedFile(null);
        }}
        onFileSelect={(file) => {
          setSelectedFile(file);
          setSelectedMediaType("IMAGE");
          setSelectedMediaUrl(file ? URL.createObjectURL(file) : null);
          setSelectedMediaId(null);
        }}
        reset={false}
        imageError={false}
      />
    </Dialog>
  );
}
