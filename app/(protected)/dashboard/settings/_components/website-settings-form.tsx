"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";

import {
  getWebsiteSettings,
  updateWebsiteSettings,
} from "@/actions/auth/website-settings";
import {
  WebsiteSettingsSchema,
  WebsiteSettingsValues,
  LayoutOptions,
} from "@/schema/settings";
import { useSession } from "next-auth/react";

export function WebsiteSettingsForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm<WebsiteSettingsValues>({
    resolver: zodResolver(WebsiteSettingsSchema),
    defaultValues: {
      siteName: "News Portal",
      layout: "modern",
      logo: "",
      primaryColor: "#1a73e8",
      primaryForegroundColor: "#ffffff",
      secondaryColor: "#4285f4",
      secondaryForegroundColor: "#ffffff",
    },
  });

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.user?.id) return;

      try {
        const { settings, error } = await getWebsiteSettings();

        if (error) {
          toast.error(error);
          return;
        }

        if (settings) {
          form.reset({
            siteName: settings.siteName,
            layout: settings.layout as
              | "classic"
              | "modern"
              | "arena"
              | "championship"
              | "legacy",
            logo: settings.logo || "",
            primaryColor: settings.primaryColor,
            primaryForegroundColor: settings.primaryForegroundColor,
            secondaryColor: settings.secondaryColor,
            secondaryForegroundColor: settings.secondaryForegroundColor,
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        toast.error("Failed to load settings. Please try again later.");
      }
    };

    fetchSettings();
  }, [session?.user?.id, form]);

  const onSubmit = async (data: WebsiteSettingsValues) => {
    const layout = data.layout as
      | "classic"
      | "modern"
      | "arena"
      | "championship"
      | "legacy";
    const formData = {
      ...data,
      layout,
    };
    try {
      setLoading(true);
      const response = await updateWebsiteSettings(formData);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      // Update form with new settings
      if (response.settings) {
        const layout = response.settings.layout as
          | "classic"
          | "modern"
          | "arena"
          | "championship"
          | "legacy";
        form.reset({
          siteName: response.settings.siteName,
          layout,
          logo: response.settings.logo || "",
          primaryColor: response.settings.primaryColor,
          primaryForegroundColor: response.settings.primaryForegroundColor,
          secondaryColor: response.settings.secondaryColor,
          secondaryForegroundColor: response.settings.secondaryForegroundColor,
        });
        toast.success("Settings updated successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update website settings:", error);
      toast.error("Failed to update website settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="siteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter site name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="layout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Layout</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                      disabled={loading}
                    >
                      {LayoutOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onFileSelect={(file) => {
                        if (file) {
                          // Convert File to base64 string
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            field.onChange(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          field.onChange("");
                        }
                      }}
                      defaultImage={field.value}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        className="w-12 h-12 p-1"
                        {...field}
                        disabled={loading}
                      />
                      <Input
                        type="text"
                        placeholder="#1a73e8"
                        {...field}
                        disabled={loading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primaryForegroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Foreground Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        className="w-12 h-12 p-1"
                        {...field}
                        disabled={loading}
                      />
                      <Input
                        type="text"
                        placeholder="#ffffff"
                        {...field}
                        disabled={loading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        className="w-12 h-12 p-1"
                        {...field}
                        disabled={loading}
                      />
                      <Input
                        type="text"
                        placeholder="#4285f4"
                        {...field}
                        disabled={loading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondaryForegroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Foreground Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        className="w-12 h-12 p-1"
                        {...field}
                        disabled={loading}
                      />
                      <Input
                        type="text"
                        placeholder="#ffffff"
                        {...field}
                        disabled={loading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
           </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
