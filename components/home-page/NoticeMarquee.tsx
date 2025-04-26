import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

export default function NoticeMarquee() {
  return (
    <div className="py-2 text-white container mx-auto">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="font-bold text-lg bg-red-600 ">সর্বশেষ:</div>
        <Marquee speed={50} gradient={false}>
          <Link href={"/"} className="hover:underline">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
            maiores!
          </Link>
          <span className="mx-4">|</span>
          <Link href={"/"} className="hover:underline">
            Breaking news: Another important update for our readers
          </Link>
          <span className="mx-4">|</span>
          <Link href={"/"} className="hover:underline">
            Latest developments in technology sector
          </Link>
        </Marquee>
      </div>
    </div>
  );
}
