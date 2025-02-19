"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { settings } from "@/actions/auth/settings";
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
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import React from "react";

export function SettingsForm() {
  const user = useCurrentUser();
  console.log(user);
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isChanged, setIsChanged] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
    },
  });

  // Watch for form changes
  const formValues = form.watch();
  const initialValues = {
    name: user?.name || undefined,
    email: user?.email || undefined,
  };

  // Check if form values have changed
  const hasChanges = () => {
    return (
      formValues.name !== initialValues.name ||
      formValues.email !== initialValues.email
    );
  };

  // Update isChanged state when form values change
  React.useEffect(() => {
    setIsChanged(hasChanges());
  }, [formValues]);

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    if (!hasChanges()) {
      toast.error("No changes to save");
      return;
    }

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            update();
            toast.success("Settings updated successfully");
            // Update initial values after successful save
            form.reset(values);
            setIsChanged(false);
          }
        })
        .catch(() => toast.error("Failed to update settings"));
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your name"
                      disabled={isPending}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsChanged(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your email"
                      type="email"
                      disabled={isPending}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsChanged(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending || !isChanged}
              className={!isChanged ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
