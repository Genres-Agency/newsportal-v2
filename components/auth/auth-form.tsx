"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { getSettings } from "@/lib/actions/getSettings";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
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
import Image from "next/image";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  const generateCrypticError = (error: string) => {
    const timestamp = Date.now().toString(36);
    const errorCode = Math.random().toString(36).substring(7);
    return `Error [${timestamp}${errorCode}]: Operation failed. Contact system administrator.`;
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    setError("");

    startTransition(() => {
      if (mode === "login") {
        const loadingToast = toast.loading("Processing request...");
        Login(values, callbackUrl).then((data) => {
          toast.dismiss(loadingToast);
          if (data?.error) {
            form.reset();
            const crypticError = generateCrypticError(data.error);
            setError(crypticError);
            toast.error(crypticError);
          } else {
            setShowSuccessModal(true);
            setTimeout(() => {
              router.push("/dashboard/overview");
            }, 2000);
          }
        });
      } else {
        const loadingToast = toast.loading("Processing request...");
        register(values as z.infer<typeof RegisterSchema>).then((data) => {
          toast.dismiss(loadingToast);
          if (data.error) {
            const crypticError = generateCrypticError(data.error);
            setError(crypticError);
            toast.error(crypticError);
            return;
          }
          if (data.success) {
            router.push("/auth/login");
          }
        });
      }
    });
  };

  return (
    <>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
            <h3 className={cn("text-xl font-semibold", font.className)}>
              Login Successful!
            </h3>
            <p className="text-center text-gray-600">
              Redirecting you to the dashboard...
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Form Side */}
          <div className="w-full lg:w-1/2 p-6 md:p-12">
            <div className="space-y-6">
              <div>
                <h2 className={cn("text-2xl font-bold", font.className)}>
                  {mode === "login" ? "Sign In" : "Create Account"}
                </h2>
                <div className="mt-2 text-sm text-gray-600">
                  {mode === "login" ? (
                    <p>
                      New to {settings.siteName}?{" "}
                      <Link
                        href="/auth/register"
                        className="text-rose-500 hover:text-rose-600 font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  ) : (
                    <p>
                      Already have an account?{" "}
                      <Link
                        href="/auth/login"
                        className="text-rose-500 hover:text-rose-600 font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                  )}
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {mode === "register" && (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="John Doe"
                              className="h-11 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
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
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="example@gmail.com"
                            type="email"
                            className="h-11 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
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
                        <FormLabel className="text-gray-700">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="••••••"
                            type="password"
                            className="h-11 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
                          />
                        </FormControl>
                        {mode === "login" && (
                          <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal text-rose-500 hover:text-rose-600"
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
                          <FormLabel className="text-gray-700">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="••••••"
                              type="password"
                              className="h-11 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
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
                    className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg"
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {mode === "login"
                          ? "Signing in..."
                          : "Creating account..."}
                      </div>
                    ) : mode === "login" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Illustration Side */}
          <div className="w-full lg:w-1/2 bg-rose-50 flex items-center justify-center p-6 md:p-12">
            <div className="max-w-md text-center">
              <Image
                src="/auth-illustration.svg"
                alt="Authentication illustration"
                className="w-full h-auto max-w-[300px] md:max-w-[500px] mx-auto"
                width={500}
                height={500}
              />
              <h3
                className={cn(
                  "mt-8 text-2xl font-semibold text-gray-900",
                  font.className
                )}
              >
                Welcome to {settings.siteName}
              </h3>
              <p className="mt-4 text-gray-600">
                {mode === "login"
                  ? "Sign in to access your account and stay updated with the latest news."
                  : "Join our community to access exclusive content and features."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
