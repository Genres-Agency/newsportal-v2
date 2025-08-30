import React from "react";
import NoticeMarquee from "../home-page/notice-marquee/NoticeMarquee";
import CategorySection from "../home-page/CategorySection";
import VideoSection from "../home-page/VideoSection";
import BangladeshSection from "../home-page/BangladeshSection";
import RajnitiSection from "../home-page/RajnitiSection";
import InternationalSection from "../home-page/InternationalSection";
import SportsSection from "../home-page/SportsSection";
import EntertainmentSection from "../home-page/EntertainmentSection";
import ModernHero from "../home-page/hero/variants/ModernHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NoticeMarquee />
      <ModernHero />;
      <CategorySection />
      <VideoSection />
      <BangladeshSection />
      <RajnitiSection />
      <InternationalSection />
      <SportsSection />
      <EntertainmentSection />
    </div>
  );
}
