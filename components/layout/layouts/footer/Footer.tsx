import React from "react";
import { Settings } from "@prisma/client";
import ClassicFooter from "./variants/ClassicFooter";
import ModernFooter from "./variants/ModernFooter";
import MinimalFooter from "./variants/MinimalFooter";

interface FooterProps {
  settings: Settings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  // Switch footer based on settings
  switch (settings?.layout) {
    case "modern":
      return <ModernFooter settings={settings} />;
    case "minimal":
      return <MinimalFooter settings={settings} />;
    case "classic":
    default:
      return <ClassicFooter settings={settings} />;
  }
};

export default Footer;