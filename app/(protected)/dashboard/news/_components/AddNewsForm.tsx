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
import ImageUpload from "@/components/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, set } from "date-fns";
import { DateTimePicker } from "@/components/DateTimePicker";

export default function AddNewsForm({ categories }: { categories: any[] }) {
  const [submitting, setSubmitting] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imageError, setImageError] = React.useState<boolean>(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [resetImage, setResetImage] = React.useState(false);
  const router = useRouter();

  const baseSchema = z.object({
    title: z.string().min(2),
    content: z.string().min(10),
    category: z.string(),
    image: z.string(),
    status: z.enum(["PUBLISHED", "PRIVATE", "SCHEDULED"]),
    scheduledAt: z.date().optional(),
    scheduledTime: z.string().optional(),
  });

  type FormValues = z.infer<typeof baseSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      image: "",
      status: "PUBLISHED",
    },
  });

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    setImageError(false);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  async function handleAddNews(
    values: FormValues,
    form: UseFormReturn<FormValues>,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    router: ReturnType<typeof useRouter>,
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    setResetImage: React.Dispatch<React.SetStateAction<boolean>>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    if (values.status === "SCHEDULED") {
      if (!values.scheduledAt) {
        form.setError("scheduledAt", {
          message: "Schedule date is required for scheduled news",
        });
      }
      if (!values.scheduledTime) {
        form.setError("scheduledTime", {
          message: "Schedule time is required for scheduled news",
        });
      }
      if (!values.scheduledAt || !values.scheduledTime) {
        return;
      }
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

      if (scheduledDateTime < new Date()) {
        toast.error("Scheduled time must be in the future");
        return;
      }
    }

    setSubmitting(true);
    try {
      let imageUrl = "";
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const IMAGEBB_API_KEY = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.success) {
          imageUrl = data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      if (!imageUrl && !selectedFile) {
        setImageError(true);
        throw new Error("Image not uploaded");
      }

      await postNews({
        ...values,
        image: imageUrl,
        scheduledAt: scheduledDateTime,
      });
      form.reset({
        title: "",
        content: "",
        scheduledAt: undefined,
        scheduledTime: undefined,
        status: "PUBLISHED",
        category: "",
        image: values.image,
      });
      setSelectedFile(null);
      setResetImage(true);
      setImagePreview(null);
      toast.success("News added successfully!");
      router.refresh();
    } catch (err) {
      toast.error("Failed to add news. Please try again.");
    } finally {
      setSubmitting(false);
      setResetImage(false);
    }
  }

  const onSubmit = async (values: FormValues) => {
    await handleAddNews(
      values,
      form,
      setSubmitting,
      router,
      selectedFile,
      setSelectedFile,
      setResetImage,
      setImagePreview
    );
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
                    <Input placeholder="Enter news title" {...field} />
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
                    <Textarea placeholder="Enter news content" {...field} />
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

            {/* Image Upload Section */}
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel
                    className={`text-left pb-2 ${
                      imageError ? "text-red-500" : ""
                    }`}
                  >
                    Upload Banner Image
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      onFileSelect={handleImageChange}
                      defaultImage={imagePreview}
                      imageError={imageError}
                      reset={resetImage}
                    />
                  </FormControl>
                  {/* Error Message for Image Upload */}
                  {imageError && (
                    <p className="text-red-500 text-sm mt-2">
                      Please upload news banner
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
      </CardContent>
    </Card>
  );
}
