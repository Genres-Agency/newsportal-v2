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
import { api } from "@/trpc/react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
});

export default function AddCategoryForm() {
  const router = useRouter();

  const createCategory = api.category.createCategory.useMutation({
    onSuccess: () => {
      toast.success("Category added successfully!");
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add category");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createCategory.mutate(values);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Create New Category
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Add a new category to organize your news articles
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              {/* Name and Slug Section */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter category name"
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
                            placeholder="category-url-slug"
                            {...field}
                            className="h-12"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 whitespace-nowrap"
                          onClick={() => {
                            const nameValue = form.getValues("name");
                            if (!nameValue) {
                              toast.error("Please enter a name first");
                              return;
                            }
                            const generatedSlug = nameValue
                              .toLowerCase()
                              .replace(/[^\u0980-\u09FF a-z0-9-]/g, "")
                              .replace(/\s+/g, "-")
                              .replace(/-+/g, "-")
                              .replace(/^-+|-+$/g, "");
                            form.setValue("slug", generatedSlug);
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

              {/* Description Section */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a brief description of the category..."
                        {...field}
                        className="min-h-[120px] resize-y"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={createCategory.isPending}
                className="min-w-[120px]"
              >
                {createCategory.isPending ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </div>
                ) : (
                  "Create Category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}