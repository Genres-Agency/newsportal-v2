"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition } from "react";
import { settings } from "@/actions/auth/settings";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

const SecuritySchema = z.object({
  password: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export function SecurityForm() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [isChanged, setIsChanged] = useState(false);

  const form = useForm<z.infer<typeof SecuritySchema>>({
    resolver: zodResolver(SecuritySchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
      role: user?.role || "USER",
    },
  });

  // Watch for form changes
  const formValues = form.watch();
  const initialValues = {
    password: undefined,
    newPassword: undefined,
    isTwoFactorEnabled: user?.isTwoFactorEnabled,
    role: user?.role || "USER",
  };

  // Check if form values have changed from initial values
  const hasChanges = () => {
    return (
      formValues.password !== initialValues.password ||
      formValues.newPassword !== initialValues.newPassword ||
      formValues.isTwoFactorEnabled !== initialValues.isTwoFactorEnabled
    );
  };

  // Update isChanged state when form values change
  React.useEffect(() => {
    setIsChanged(hasChanges());
  }, [formValues]);

  const onSubmit = (values: z.infer<typeof SecuritySchema>) => {
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
            toast.success("Security settings updated successfully");
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
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter current password"
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter new password"
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
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Two Factor Authentication</FormLabel>
                    <div className="text-[0.8rem] text-muted-foreground">
                      Enable two factor authentication for your account
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setIsChanged(true);
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
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
