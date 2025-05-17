"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/heading";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { updateProfile } from "../_actions/profile";
import { SecurityForm } from "../_components/security-form";
import { getUserProfile } from "@/lib/actions/user.action";

const profileSchema = z.object({
  image: z.string().optional(),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  location: z
    .string()
    .max(100, "Location must not exceed 100 characters")
    .optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const user = useCurrentUser();
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Get user's profile data
  const [profile, setProfile] = useState<{
    image?: string | null;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
  }>({});

  const userInfo = {
    name: user?.name || "N/A",
    email: user?.email || "N/A",
    role: user?.role || "N/A",
    createdAt: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "N/A",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      image: profile.image || "",
      bio: profile.bio || "",
      location: profile.location || "",
      website: profile.website || "",
    },
  });

  // Update form values when profile data changes
  useEffect(() => {
    form.reset({
      image: profile.image || "",
      bio: profile.bio || "",
      location: profile.location || "",
      website: profile.website || "",
    });
  }, [profile, form]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        const profileData = await getUserProfile(user.id);
        if (profileData) {
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, [user?.id]);

  const onSubmit = async (data: ProfileFormValues) => {
    startTransition(async () => {
      try {
        const response = await updateProfile(data);

        if (response.error) {
          toast.error(response.error);
          return;
        }

        if (response.success) {
          // Update session if image changed
          if (data.image !== profile.image) {
            await update();
          }

          toast.success(response.success);
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Heading
        title="Profile Settings"
        description="Manage your profile settings and preferences."
      />

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">User Information</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Name</h3>
              <p className="mt-1">{userInfo.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Email</h3>
              <p className="mt-1">{userInfo.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Role</h3>
              <p className="mt-1 capitalize">{userInfo.role}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Member Since</h3>
              <p className="mt-1">{userInfo.createdAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Profile Information</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          defaultImage={field.value}
                          onFileSelect={(file) => {
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                field.onChange(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share a brief description about yourself"
                          className="resize-none h-32"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Country"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://your-website.com"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="min-w-[100px]"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <SecurityForm />
    </div>
  );
}
