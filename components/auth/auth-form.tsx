"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { getSettings } from "@/lib/actions/getSettings";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { LoginSchema, RegisterSchema } from "@/schema";
import { Login } from "@/actions/auth/login";
import { register } from "@/actions/auth/register";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface AuthFormProps {
  mode: "login" | "register";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [settings, setSettings] = useState<any>({
    siteName: "News Portal",
    layout: "classic",
  });

  useEffect(() => {
    const loadSettings = async () => {
      const { settings: siteSettings, error } = await getSettings();
      if (siteSettings) {
        setSettings(siteSettings);
      }
    };
    loadSettings();
  }, []);

  const schema = mode === "login" ? LoginSchema : RegisterSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "login"
        ? { email: "", password: "" }
        : { email: "", password: "", confirmPassword: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    setError("");

    startTransition(() => {
      if (mode === "login") {
        Login(values, callbackUrl).then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
        });
      } else {
        register(values as z.infer<typeof RegisterSchema>).then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }
          if (data.success) {
            router.push("/auth/login");
          }
        });
      }
    });
  };

  const getFormStyles = () => {
    switch (settings.layout) {
      case "modern":
        return "bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-2xl shadow-2xl backdrop-blur-sm";
      case "minimal":
        return "bg-background/50 p-6 rounded-lg shadow-sm border border-border/50";
      default: // classic
        return "bg-card p-6 rounded-xl shadow-md border border-border/10";
    }
  };

  const getButtonStyles = () => {
    switch (settings.layout) {
      case "modern":
        return "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transform hover:scale-[1.02] transition-all duration-300";
      case "minimal":
        return "bg-primary/90 hover:bg-primary text-primary-foreground transition-colors";
      default: // classic
        return "bg-primary hover:bg-primary/90 text-primary-foreground";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className={cn("w-full max-w-md", getFormStyles())}>
        <div className="text-center mb-8">
          <h1 className={cn("text-3xl font-semibold mb-2", font.className)}>
            {settings.siteName}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "login"
              ? `Welcome back to ${settings.siteName}`
              : `Join ${settings.siteName}`}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === "register" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
                        className="bg-background/5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="example@gmail.com"
                      type="email"
                      className="bg-background/5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      className="bg-background/5"
                    />
                  </FormControl>
                  {mode === "login" && (
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === "register" && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                        className="bg-background/5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormError message={error} />
            <Button
              disabled={isPending}
              type="submit"
              className={cn("w-full py-2.5", getButtonStyles())}
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Button variant="link" asChild className="font-normal">
            <Link href={mode === "login" ? "/auth/register" : "/auth/login"}>
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
