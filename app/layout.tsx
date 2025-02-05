import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as HotToaster } from "react-hot-toast";

// Use Inter with expanded subsets for better language support
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "News Portal",
  description: "Next.js + Next Auth V4 + Shadcn",
  authors: [{ name: "Md Ataullah" }],
  keywords: ["dashboard", "next.js", "auth", "roles"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className={inter.variable}>
        <body
          className={`${inter.className} antialiased min-h-screen bg-background`}
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 animate-fade-in">{children}</main>
          </div>

          {/* Toaster configurations */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className: "glass-effect",
            }}
          />
          <HotToaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className: "glass-effect",
            }}
          />
        </body>
      </html>
    </SessionProvider>
  );
}
