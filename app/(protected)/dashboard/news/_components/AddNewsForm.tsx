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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { postNews } from "../news-action";
import ImageUpload from "@/components/ImageUpload";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  image: z.string().optional(),
});

async function handleAddNews(
  values: z.infer<typeof formSchema>,
  form: any,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  router: any,
  selectedFile: File | null
) {
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

    console.log("Image Url ======>", imageUrl);

    await postNews({ ...values, image: imageUrl });
    form.reset();
    toast.success("News added successfully!");
    router.refresh();
  } catch (err) {
    toast.error("Failed to add news. Please try again.");
  } finally {
    setSubmitting(false);
  }
}

export default function AddNewsForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imageError, setImageError] = React.useState<string | null>(null); // State to track image error
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      image: "",
    },
  });

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);
    setImageError(null); // Reset error when the user selects a file
  };

  const handleAddNews = async (
    values: z.infer<typeof formSchema>,
    form: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    router: any
  ) => {
    setSubmitting(true);
    try {
      let imageUrl = "";

      // Check if no image is selected
      if (!selectedFile && !values.image) {
        setImageError("Please upload news banner"); // Set error message for image
        throw new Error("Image not uploaded");
      }

      // If an image is selected, upload it
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
          throw new Error("Image upload failed.");
        }
      }

      // If imageUrl is empty, show an error
      if (!imageUrl && !selectedFile) {
        toast.error("Please upload news banner");
        throw new Error("Image upload failed");
      }

      console.log("Post Data ======>", { ...values, image: imageUrl });
      await postNews({ ...values, image: imageUrl });
      form.reset();
      toast.success("News added successfully!");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to Post news. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">Add News</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleAddNews(values, form, setSubmitting, router)
            )}
            className="space-y-6"
          >
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
                  <FormControl>
                    <Input placeholder="Enter news category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      imageError={imageError}
                    />
                  </FormControl>
                  {/* Error Message for Image Upload */}
                  {imageError && (
                    <p className="text-red-500 text-sm mt-2">{imageError}</p>
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
