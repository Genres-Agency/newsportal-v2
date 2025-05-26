import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/components/providers/query-provider";
import { GoogleAdsenseScript } from "@/components/ads/GoogleAdsense";
import localFont from "next/font/local";
import { StyleProvider } from "@/components/providers/style-provider";

const solaimanLipi = localFont({
  src: [
    {
      path: "../public/font/SolaimanLipi-Normal.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/SolaimanLipi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/SolaimanLipi-Thin.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-solaimanlipi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ক্রাইম সিন ২৪ - বাংলাদেশের প্রথম ক্রাইম নিউজ পোর্টাল",
  description:
    "বাংলাদেশের সর্বপ্রথম ক্রাইম নিউজ পোর্টাল। সারাদেশের সকল অপরাধ সংক্রান্ত খবর, তদন্ত প্রতিবেদন এবং বিশ্লেষণ নিয়ে আমরা আছি আপনার পাশে।",
  authors: [{ name: "Md Ataullah" }],
  keywords: [
    "crime news",
    "bangladesh crime",
    "criminal activities",
    "police news",
    "crime investigation",
    "law enforcement",
    "court news",
    "crime analysis",
    "crime reports",
    "crime scene",
    "crime updates",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "ক্রাইম সিন ২৪ - বাংলাদেশের প্রথম ক্রাইম নিউজ পোর্টাল",
    description:
      "বাংলাদেশের সর্বপ্রথম ক্রাইম নিউজ পোর্টাল। সারাদেশের সকল অপরাধ সংক্রান্ত খবর, তদন্ত প্রতিবেদন এবং বিশ্লেষণ নিয়ে আমরা আছি আপনার পাশে।",
    images: [
      {
        url: "/hero-img.png",
        width: 1200,
        height: 630,
        alt: "Crime Seen 24 - Crime News Coverage",
      },
    ],
    locale: "bn_BD",
    type: "website",
    siteName: "Crime Seen 24",
  },
  twitter: {
    card: "summary_large_image",
    title: "ক্রাইম সিন ২৪ - বাংলাদেশের প্রথম ক্রাইম নিউজ পোর্টাল",
    description:
      "বাংলাদেশের সর্বপ্রথম ক্রাইম নিউজ পোর্টাল। সারাদেশের সকল অপরাধ সংক্রান্ত খবর, তদন্ত প্রতিবেদন এবং বিশ্লেষণ নিয়ে আমরা আছি আপনার পাশে।",
    images: ["/hero-img.png"],
    creator: "@ataullah",
    site: "@crimeseen24",
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
    google: "ca-pub-4798069224424379",
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
        <StyleProvider>
          <html lang="bn">
            <body
              className={`${solaimanLipi.variable} font-solaimanlipi antialiased min-h-screen bg-background`}
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
        </StyleProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
