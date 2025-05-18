import React from "react";
import { Settings } from "@prisma/client";
import ClassicHeader from "./variants/ClassicHeader";
import ModernHeader from "./variants/ModernHeader";
import MinimalHeader from "./variants/MinimalHeader";
import { menuItems } from "@/lib/constants/header-link";

interface HeaderProps {
  settings: Settings;
  menuItems: Array<{ title: string; path: string }>;
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  // console.log(settings)
  // Switch header based on settings
  switch (settings?.layout) {
    case "modern":
      return <ModernHeader settings={settings} menuItems={menuItems} />;
    case "minimal":
      return <MinimalHeader settings={settings} menuItems={menuItems} />;
    case "classic":
    default:
      return <ClassicHeader settings={settings} menuItems={menuItems} />;
  }
};

export default Header;