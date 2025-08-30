"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { MediaSelectorModal } from "../../media/_components/MediaSelectorModal";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";

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
  const router = useRouter();

  // Media state
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedMediaId, setSelectedMediaId] = React.useState<string | null>(
    null
  );
  const [selectedMediaType, setSelectedMediaType] = React.useState<
    "IMAGE" | "VIDEO" | null
  >(null);
  const [selectedMediaUrl, setSelectedMediaUrl] = React.useState<string | null>(
    null
  );
  const [showMediaSelector, setShowMediaSelector] = React.useState(false);
  const [imageError, setImageError] = React.useState<boolean>(false);

  // tRPC mutations
  const createNews = api.news.createNews.useMutation({
    onSuccess: () => {
      toast.success("News posted successfully");
      resetForm();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to post news");
    },
  });

  const createMedia = api.news.createMedia.useMutation({
    onSuccess: (media) => {
      setSelectedMediaId(media.id);
      form.setValue("mediaId", media.id);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload media");
    },
  });

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

  const resetForm = React.useCallback(() => {
    form.reset();
    setSelectedFile(null);
    setSelectedMediaUrl(null);
    setSelectedMediaType(null);
    setSelectedMediaId(null);
    setImageError(false);
  }, [form]);

  const handleMediaSelect = React.useCallback(
    (id: string, url: string, type: "IMAGE" | "VIDEO") => {
      setSelectedMediaType(type);
      setSelectedMediaUrl(url);
      setSelectedMediaId(id);
      setSelectedFile(null);
      setImageError(false);
      form.setValue("mediaId", id);
    },
    [form]
  );

  const handleFileSelect = React.useCallback(
    (file: File | null) => {
      setSelectedFile(file);
      setSelectedMediaType("IMAGE");
      setSelectedMediaUrl(file ? URL.createObjectURL(file) : null);
      setSelectedMediaId(null);
      setImageError(false);
      form.setValue("mediaId", undefined);
    },
    [form]
  );

  const handleMediaUpload = React.useCallback(
    async (file: File, title: string) => {
      const imageUrl = await uploadToImageBB(file);
      createMedia.mutate({
        title,
        url: imageUrl,
        type: "IMAGE",
        description: "News banner image",
        size: file.size,
        mimeType: file.type,
      });
    },
    [createMedia]
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!selectedFile && !selectedMediaId && !selectedMediaUrl) {
        setImageError(true);
        toast.error("Please select media");
        return;
      }

      // Handle media upload if needed
      if (selectedFile) {
        try {
          const imageUrl = await uploadToImageBB(selectedFile);
          await new Promise((resolve) => {
            createMedia.mutate(
              {
                title: values.title,
                url: imageUrl,
                type: "IMAGE",
                description: "News banner image",
                size: selectedFile.size,
                mimeType: selectedFile.type,
              },
              {
                onSuccess: (media) => {
                  createNews.mutate({
                    ...values,
                    mediaId: media.id,
                    authorId: session?.user?.id || "",
                  });
                  resolve(undefined);
                },
                onError: (error) => {
                  toast.error(error.message || "Failed to upload media");
                  resolve(undefined);
                },
              }
            );
          });
        } catch (error) {
          toast.error("Failed to upload image");
          return;
        }
      } else if (
        selectedMediaUrl &&
        selectedMediaType === "VIDEO" &&
        !selectedMediaId
      ) {
        const videoId = selectedMediaUrl.match(/([a-zA-Z0-9_-]{11})/)?.[1];
        if (!videoId) {
          toast.error("Invalid YouTube URL");
          return;
        }

        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        await new Promise((resolve) => {
          createMedia.mutate(
            {
              title: values.title,
              url: embedUrl,
              type: "VIDEO",
              description: "News banner video",
              size: 0,
              mimeType: "video/youtube",
            },
            {
              onSuccess: (media) => {
                createNews.mutate({
                  ...values,
                  mediaId: media.id,
                  authorId: session?.user?.id || "",
                });
                resolve(undefined);
              },
              onError: (error) => {
                toast.error(error.message || "Failed to add video");
                resolve(undefined);
              },
            }
          );
        });
      } else if (selectedMediaId) {
        // If media is already selected from library
        createNews.mutate({
          ...values,
          mediaId: selectedMediaId,
          authorId: session?.user?.id || "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="mx-auto w-full max-w-4xl border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Create News Article
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to create a new news article
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              {/* Title and Slug Section */}
              <div className="grid gap-4 md:grid-cols-2">
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
                          className="h-12"
                          onChange={(e) => {
                            field.onChange(e);
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
                      <FormLabel>URL Slug</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="news-article-url"
                            {...field}
                            className="h-12"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 whitespace-nowrap"
                          onClick={() => {
                            const title = form.getValues("title");
                            if (!title) {
                              toast.error("Please enter a title first");
                              return;
                            }
                            const slug = title
                              .toLowerCase()
                              .replace(/[^\u0980-\u09FF a-z0-9-]/g, "")
                              .replace(/\s+/g, "-")
                              .replace(/-+/g, "-")
                              .replace(/^-+|-+$/g, "");
                            form.setValue("slug", slug);
                          }}
                        >
                          Generate URL
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Content Section */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your news article content here..."
                        {...field}
                        className="min-h-[200px] resize-y"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categories Section */}
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2 border rounded-lg p-4 bg-card">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                              field.value.includes(category.name)
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "bg-secondary hover:bg-secondary/80"
                            }`}
                            onClick={() => {
                              const newValue = field.value.includes(
                                category.name
                              )
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

              {/* Status and Schedule Section */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Status</FormLabel>
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
                          <SelectTrigger className="h-12">
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
              </div>

              {/* Media Section */}
              <FormField
                control={form.control}
                name="mediaId"
                render={() => (
                  <FormItem>
                    <FormLabel className={imageError ? "text-red-500" : ""}>
                      Banner Media
                    </FormLabel>
                    <div
                      className={`cursor-pointer border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
                        imageError
                          ? "border-red-500 bg-red-50/50"
                          : "hover:border-primary hover:bg-accent/50"
                      }`}
                      onClick={() => setShowMediaSelector(true)}
                    >
                      {selectedMediaUrl ? (
                        <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg">
                          {selectedMediaType === "IMAGE" ? (
                            <Image
                              src={selectedMediaUrl}
                              alt="Selected media"
                              fill
                              className="object-cover transition-transform hover:scale-105"
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
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-lg font-medium mb-2">
                            Click to upload banner media
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Support for images and YouTube videos
                          </p>
                        </div>
                      )}
                    </div>
                    {imageError && (
                      <p className="text-sm font-medium text-red-500 mt-2">
                        Please select media for the article
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setSelectedFile(null);
                  setSelectedMediaUrl(null);
                  setSelectedMediaType(null);
                  setSelectedMediaId(null);
                  setImageError(false);
                }}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={createNews.isPending || createMedia.isPending}
                className="min-w-[120px]"
              >
                {createNews.isPending || createMedia.isPending ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : (
                  "Publish News"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <MediaSelectorModal
          open={showMediaSelector}
          onOpenChange={setShowMediaSelector}
          onMediaSelect={handleMediaSelect}
          onFileSelect={handleFileSelect}
          reset={false}
          imageError={imageError}
          showLibrary={true}
          allowedTypes={["upload", "video", "library"]}
        />
      </CardContent>
    </Card>
  );
}