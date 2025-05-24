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
import LayoutSelector from "@/components/layout/LayoutSelector";

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
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
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
            layout: settings.layout as "classic" | "modern" | "minimal",
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
    const layout = data.layout as "classic" | "modern" | "minimal";
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
          | "minimal";
        form.reset({
          siteName: response.settings.siteName,
          layout,
          logo: response.settings.logo || "",
          primaryColor: response.settings.primaryColor,
          primaryForegroundColor: response.settings.primaryForegroundColor,
          secondaryColor: response.settings.secondaryColor,
          secondaryForegroundColor: response.settings.secondaryForegroundColor,
          facebook: response.settings.facebook || "",
          twitter: response.settings.twitter || "",
          instagram: response.settings.instagram || "",
          youtube: response.settings.youtube || "",
          linkedin: response.settings.linkedin || "",
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
                    <LayoutSelector
                      value={field.value}
                      onValueChange={field.onChange}
                    />
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

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Media Links</h3>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/your-page"
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
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/your-handle"
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
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/your-profile"
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
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://youtube.com/your-channel"
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
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/your-profile"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
