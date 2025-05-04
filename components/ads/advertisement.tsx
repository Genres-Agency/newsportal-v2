"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Advertisement() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 40000); // 40 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:w-[660px]">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl z-10 sm:w-8 sm:h-8 md:w-10 md:h-10"
          aria-label="Close advertisement"
        >
          ×
        </button>
        <div className="relative w-full h-[calc(90vw*0.67)] sm:h-[calc(85vw*0.67)] md:h-[calc(80vw*0.67)] lg:h-[440px]">
          <Image
            src="/ads/ramada-660x440.jpg"
            alt="Advertisement"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 80vw, 660px"
          />
        </div>
      </div>
    </div>
  );
}
