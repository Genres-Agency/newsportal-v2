"use client";

import Script from "next/script";
import { useEffect } from "react";

interface GoogleAdsenseProps {
  client: string;
  slot: string;
  style?: React.CSSProperties;
  format?: "auto" | "fluid";
  responsive?: boolean;
  className?: string;
}

const GoogleAdsense: React.FC<GoogleAdsenseProps> = ({
  client,
  slot,
  style = {},
  format = "auto",
  responsive = true,
  className = "",
}) => {
  useEffect(() => {
    try {
      // Push the command to Google AdSense
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (err) {
      console.error("Error loading AdSense:", err);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          ...style,
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default GoogleAdsense;

export const GoogleAdsenseScript: React.FC = () => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4798069224424379"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};
