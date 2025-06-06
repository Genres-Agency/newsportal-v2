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
  FormDescription,
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

  const [defaultValues, setDefaultValues] = useState<WebsiteSettingsValues>({
    siteName: "",
    layout: "classic",
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
  });

  const form = useForm<WebsiteSettingsValues>({
    resolver: zodResolver(WebsiteSettingsSchema),
    defaultValues,
  });

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.user?.id) {
        toast.error("Please sign in to access settings");
        return;
      }

      try {
        setLoading(true);
        const { settings, error } = await getWebsiteSettings();

        if (error) {
          console.error("Settings fetch error:", error);
          toast.error(error);
          return;
        }

        if (!settings) {
          toast.error("No settings found");
          return;
        }

        const newValues = {
          siteName: settings.siteName,
          layout: settings.layout as "classic" | "modern" | "minimal",
          logo: settings.logo || "",
          primaryColor: settings.primaryColor,
          primaryForegroundColor: settings.primaryForegroundColor,
          secondaryColor: settings.secondaryColor,
          secondaryForegroundColor: settings.secondaryForegroundColor,
          facebook: settings.facebook || "",
          twitter: settings.twitter || "",
          instagram: settings.instagram || "",
          youtube: settings.youtube || "",
          linkedin: settings.linkedin || "",
        };
        setDefaultValues(newValues);
        form.reset(newValues);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        toast.error("Failed to load settings. Please try again later.");
      } finally {
        setLoading(false);
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
        const newValues = {
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
        };
        setDefaultValues(newValues);
        form.reset(newValues);
        toast.success("Settings updated successfully");
        // Force a hard refresh to apply new theme settings
        window.location.reload();
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
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
                    <FormDescription>
                      Choose a layout style for your website
                    </FormDescription>
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
                    <FormDescription>
                      Upload your website logo (recommended size: 200x50px)
                    </FormDescription>
                    <FormControl>
                      <ImageUpload
                        onFileSelect={(file) => {
                          if (file) {
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Social Media Links</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    form.setValue("facebook", "");
                    form.setValue("twitter", "");
                    form.setValue("instagram", "");
                    form.setValue("youtube", "");
                    form.setValue("linkedin", "");
                  }}
                  disabled={loading}
                >
                  Clear All
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="https://facebook.com/your-page"
                            {...field}
                            disabled={loading}
                            className="pl-10"
                          />
                          <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
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
                        <div className="relative">
                          <Input
                            placeholder="https://twitter.com/your-handle"
                            {...field}
                            disabled={loading}
                            className="pl-10"
                          />
                          <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </div>
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
                        <div className="relative">
                          <Input
                            placeholder="https://instagram.com/your-profile"
                            {...field}
                            disabled={loading}
                            className="pl-10"
                          />
                          <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                          </svg>
                        </div>
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
                        <div className="relative">
                          <Input
                            placeholder="https://youtube.com/your-channel"
                            {...field}
                            disabled={loading}
                            className="pl-10"
                          />
                          <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </div>
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
                        <div className="relative">
                          <Input
                            placeholder="https://linkedin.com/in/your-profile"
                            {...field}
                            disabled={loading}
                            className="pl-10"
                          />
                          <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
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
