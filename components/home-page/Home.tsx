import React from "react";
import Navbar from "../navigation/NavBar";
import NoticeMarquee from "./NoticeMarquee";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* Main UI ================ */}
      <main>
        <NoticeMarquee />
      </main>
    </div>
  );
}
