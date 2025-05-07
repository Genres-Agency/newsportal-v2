import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/components/providers/query-provider";
import { GoogleAdsenseScript } from "@/components/ads/GoogleAdsense";

// Use Inter with expanded subsets for better language support
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "News Portal - Breaking News, Latest Updates & Analysis",
  description:
    "Your trusted source for breaking news, in-depth analysis, and latest updates from Bangladesh and around the world. Features real-time coverage in both Bengali and English.",
  authors: [{ name: "Md Ataullah" }],
  keywords: [
    "breaking news",
    "bangladesh news",
    "international news",
    "latest news",
    "bengali news portal",
    "news analysis",
    "real-time updates",
    "current affairs",
    "politics",
    "business news",
    "technology news",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "News Portal - Breaking News & Latest Updates",
    description:
      "Your trusted source for breaking news, in-depth analysis, and latest updates from Bangladesh and around the world. Features real-time coverage in both Bengali and English.",
    images: [
      {
        url: "/hero-img.png",
        width: 1200,
        height: 630,
        alt: "News Portal - Breaking News Coverage",
      },
    ],
    locale: "bn_BD",
    type: "website",
    siteName: "News Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Portal - Breaking News & Latest Updates",
    description:
      "Your trusted source for breaking news, in-depth analysis, and latest updates from Bangladesh and around the world. Features real-time coverage in both Bengali and English.",
    images: ["/hero-img.png"],
    creator: "@ataullah",
    site: "@newsportal",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon.png",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: ["ca-pub-4798069224424379", "google-site-verification-token"],
    yandex: "verification_token",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "bn-BD": "/bn-BD",
    },
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
      <QueryProvider>
        <html lang="en" className={inter.variable} suppressHydrationWarning>
          <body
            className={`${inter.className} antialiased min-h-screen bg-background`}
          >
            <NextTopLoader
              color="#3b81f3"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px rgba(59, 129, 243, 0.5), 0 0 5px rgba(59, 129, 243, 0.5)"
            />
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1 animate-fade-in">{children}</main>
            </div>
            <GoogleAdsenseScript />
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
      </QueryProvider>
    </SessionProvider>
  );
}
