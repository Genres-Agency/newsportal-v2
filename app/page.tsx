"use client";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📰</span>
            </div>
            <span className="text-white text-xl font-semibold">NewsPortal</span>
          </div>
          <Link href="/auth/login">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-500 hover:text-blue-400"
            >
              Sign in
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-20">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold text-white leading-tight",
                font.className
              )}
            >
              Your Source for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                {" "}
                Breaking News
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              Stay informed with real-time updates, in-depth analysis, and
              comprehensive coverage of the stories that matter most.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-lg"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-500/30 text-blue-500 hover:text-blue-400"
              >
                Learn More
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-white font-medium">{feature.title}</div>
                  <div className="text-gray-400 text-sm mt-1">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - News Preview */}
          <div className="flex-1 relative w-full max-w-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-3/4 h-4 rounded-full bg-gray-700/50"></div>
                  <div className="w-1/2 h-4 rounded-full bg-gray-700/50"></div>
                </div>
                <div className="h-40 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 rounded-full bg-gray-700/50"></div>
                  <div className="w-5/6 h-4 rounded-full bg-gray-700/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    icon: "🌐",
    title: "Global Coverage",
    description: "News from around the world",
  },
  {
    icon: "⚡",
    title: "Real-time",
    description: "Instant updates",
  },
  {
    icon: "🎯",
    title: "Accurate",
    description: "Verified sources",
  },
  {
    icon: "📱",
    title: "Mobile First",
    description: "Read anywhere",
  },
];
