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
import ImageUpload from "@/components/ImageUpload";
import { DateTimePicker } from "@/components/DateTimePicker";
import { format, set } from "date-fns";
import { Check, X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(10),
  category: z.string(),
  image: z.string(),
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
  const [imagePreview, setImagePreview] = useState<string | null>(news.image);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: news.title,
      content: news.content,
      category: news.category,
      image: news.image,
      status: news.status,
      scheduledAt: news.scheduledAt ? new Date(news.scheduledAt) : undefined,
      scheduledTime: news.scheduledAt
        ? format(new Date(news.scheduledAt), "HH:mm")
        : undefined,
    },
  });

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isFormDirty = form.formState.isDirty || selectedFile !== null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = news.image;
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
      }

      await updateNews({
        id: news.id,
        ...values,
        image: imageUrl,
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
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onFileSelect={handleImageChange}
                      defaultImage={imagePreview}
                    />
                  </FormControl>
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
    </Dialog>
  );
}
