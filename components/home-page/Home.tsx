import React from "react";
import Navbar from "../navigation/NavBar";
import NoticeMarquee from "./NoticeMarquee";
import Hero from "./Hero";
import CategorySection from "./CategorySection";
import VideoSection from "./VideoSection";
import BangladeshSection from "./BangladeshSection";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <NoticeMarquee />
      <Hero />
      <CategorySection />
      <VideoSection />
      <BangladeshSection />
    </div>
  );
}
