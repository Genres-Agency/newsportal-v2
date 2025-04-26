import React from "react";
import Navbar from "../navigation/NavBar";
import NoticeMarquee from "./NoticeMarquee";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Navigation */}
        {/* <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
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
      </nav> */}

        {/* Main UI ================ */}
        <NoticeMarquee />
      </main>
    </div>
  );
}
