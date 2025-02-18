import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";

// Use Inter with expanded subsets for better language support
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "News Portal - Your Gateway to Information",
  description:
    "A modern news portal built with Next.js, featuring real-time updates, user authentication, and role-based access control.",
  authors: [{ name: "Md Ataullah" }],
  keywords: ["news portal", "next.js", "authentication", "dashboard", "roles"],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "News Portal - Your Gateway to Information",
    description:
      "A modern news portal built with Next.js, featuring real-time updates, user authentication, and role-based access control.",
    images: [
      {
        url: "/public/hero-img.png",
        width: 1200,
        height: 630,
        alt: "News Portal Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Portal - Your Gateway to Information",
    description:
      "A modern news portal built with Next.js, featuring real-time updates, user authentication, and role-based access control.",
    images: ["/public/hero-img.png"],
    creator: "@ataullah",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body
          className={`${inter.className} antialiased min-h-screen bg-background`}
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 animate-fade-in">{children}</main>
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast: "group toast-group",
                title: "toast-title",
                description: "toast-description",
                actionButton: "toast-action-button",
                cancelButton: "toast-cancel-button",
                error: "toast-error",
                success: "toast-success",
                warning: "toast-warning",
                info: "toast-info",
              },
              duration: 4000,
            }}
          />
        </body>
      </html>
    </SessionProvider>
  );
}
