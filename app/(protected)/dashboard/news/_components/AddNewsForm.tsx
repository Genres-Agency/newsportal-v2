"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { postNews } from "../news-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DateTimePicker } from "@/components/DateTimePicker";
import { uploadToImageBB } from "@/lib/image-upload";
import { addMedia } from "../../media/media-action";
import { MediaSelectorModal } from "../../media/_components/MediaSelectorModal";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(10),
  slug: z.string().min(2),
  categories: z
    .array(z.string())
    .min(1, { message: "Please select at least one category" }),
  mediaId: z.string().optional(),
  status: z.enum(["PUBLISHED", "PRIVATE", "SCHEDULED"]),
  scheduledAt: z.date().optional(),
  scheduledTime: z.string().optional(),
});

export default function AddNewsForm({ categories }: { categories: any[] }) {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imageError, setImageError] = React.useState<boolean>(false);
  const [selectedMediaId, setSelectedMediaId] = React.useState<string | null>(
    null
  );
  const [resetImage, setResetImage] = React.useState(false);
  const router = useRouter();
  const [showMediaSelector, setShowMediaSelector] = React.useState(false);
  const [selectedMediaType, setSelectedMediaType] = React.useState<
    "IMAGE" | "VIDEO" | null
  >(null);
  const [selectedMediaUrl, setSelectedMediaUrl] = React.useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      categories: [],
      mediaId: undefined,
      status: "PUBLISHED",
    },
  });

  const handleMediaSelect = (
    id: string,
    url: string,
    type: "IMAGE" | "VIDEO"
  ) => {
    setSelectedMediaType(type);
    setSelectedMediaUrl(url);
    setSelectedMediaId(id);
    setSelectedFile(null);
    setImageError(false);
    form.setValue("mediaId", id);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setSelectedMediaType("IMAGE");
    setSelectedMediaUrl(file ? URL.createObjectURL(file) : null);
    setSelectedMediaId(null);
    setImageError(false);
    form.setValue("mediaId", undefined);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!selectedFile && !selectedMediaId && !selectedMediaUrl) {
        setImageError(true);
        toast.error("Please select media");
        return;
      }

      setSubmitting(true);
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
      } else if (selectedMediaUrl && selectedMediaType === "VIDEO") {
        const videoId = selectedMediaUrl.match(/([a-zA-Z0-9_-]{11})/)?.[1];
        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          const newMedia = await addMedia({
            title: values.title,
            url: embedUrl,
            type: "VIDEO",
            description: "News banner video",
            size: 0,
            mimeType: "video/youtube",
          });
          finalMediaId = newMedia.id;
        }
      }

      await postNews({
        ...values,
        mediaId: finalMediaId,
        authorId: session?.user?.id || "",
      });

      toast.success("News posted successfully");
      form.reset();
      setSelectedFile(null);
      setSelectedMediaUrl(null);
      setSelectedMediaType(null);
      setSelectedMediaId(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Post News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter news title"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // Clear slug when title changes
                        form.setValue("slug", "");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="Enter URL slug" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const title = form.getValues("title");
                        if (!title) {
                          toast.error("Please enter a title first");
                          return;
                        }
                        const slug = title
                          .toLowerCase()
                          .replace(/[^\u0980-\u09FF a-z0-9-]/g, "") // Keep Bangla characters, English letters, numbers and hyphens
                          .replace(/\s+/g, "-") // Replace spaces with hyphens
                          .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
                          .replace(/^-+|-+$/g, ""); // Remove hyphens from start and end
                        form.setValue("slug", slug);
                      }}
                    >
                      Generate
                    </Button>
                  </div>
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
                    <Textarea placeholder="Enter news content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 border rounded-lg p-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                            field.value.includes(category.name)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary"
                          }`}
                          onClick={() => {
                            const newValue = field.value.includes(category.name)
                              ? field.value.filter(
                                  (cat: string) => cat !== category.name
                                )
                              : [...field.value, category.name];
                            field.onChange(newValue);
                          }}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </FormControl>
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
                  <FormItem className="flex flex-col">
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
                  <FormLabel className={imageError ? "text-red-500" : ""}>
                    Banner Media
                  </FormLabel>
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
                          Click to select banner media
                        </p>
                      </div>
                    )}
                  </div>
                  {imageError && (
                    <p className="text-sm font-medium text-red-500">
                      Please select media
                    </p>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit News"}
            </Button>
          </form>
        </Form>

        <MediaSelectorModal
          open={showMediaSelector}
          onOpenChange={setShowMediaSelector}
          onMediaSelect={handleMediaSelect}
          onFileSelect={handleFileSelect}
          reset={resetImage}
          imageError={imageError}
          showLibrary={true}
          allowedTypes={["upload", "video", "library"]}
        />
      </CardContent>
    </Card>
  );
}
