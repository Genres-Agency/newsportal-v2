"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
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
  const [isChanged, setIsChanged] = useState(false);
  const [open, setOpen] = useState(false);

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
      name: userInfo.name,
      image: profile.image || "",
      bio: profile.bio || "",
      location: profile.location || "",
      website: profile.website || "",
    },
  });

  // Update form values when profile data changes
  useEffect(() => {
    form.reset({
      name: userInfo.name,
      image: profile.image || "",
      bio: profile.bio || "",
      location: profile.location || "",
      website: profile.website || "",
    });
    setIsChanged(false);
  }, [profile, form, userInfo.name, userInfo.email]);

  // Watch for form changes
  const formValues = form.watch();
  const initialValues = React.useRef({
    name: userInfo.name,
    email: userInfo.email,
    image: profile.image || "",
    bio: profile.bio || "",
    location: profile.location || "",
    website: profile.website || "",
  });

  // Check if form values have changed
  useEffect(() => {
    const hasChanges =
      formValues.name !== initialValues.current.name ||
      formValues.email !== initialValues.current.email ||
      formValues.image !== initialValues.current.image ||
      formValues.bio !== initialValues.current.bio ||
      formValues.location !== initialValues.current.location ||
      formValues.website !== initialValues.current.website;

    setIsChanged(hasChanges);
  }, [formValues]);

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
          // Update session and close dialog
          await update();
          setOpen(false);

          // Refresh user data
          router.refresh();
          toast.success(response.success);
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 relative mb-4">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                    <span className="text-4xl text-muted-foreground">
                      {userInfo.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold">{userInfo.name}</h2>
              <p className="text-muted-foreground capitalize font-semibold  ">
                {userInfo.role}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {userInfo.email}
              </p>
              <p className="text-sm text-muted-foreground">
                Member since {userInfo.createdAt}
              </p>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-6">
                    Update Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </AlertDialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                              <ImageUpload
                                defaultImage={field.value || ""}
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
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            value={userInfo.email}
                            type="email"
                            disabled={true}
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground mt-1">
                          Email cannot be changed
                        </p>
                      </FormItem>
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isPending || !isChanged}
                          className={
                            !isChanged ? "opacity-50 cursor-not-allowed" : ""
                          }
                        >
                          {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <p className="text-muted-foreground">
              Update your profile information
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself"
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

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isPending || !isChanged}
                    className={`min-w-[120px] ${
                      !isChanged ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <SecurityForm />
    </div>
  );
}
