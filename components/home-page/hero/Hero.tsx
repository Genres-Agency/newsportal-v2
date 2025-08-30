import React from "react";
import HeroSelector from "./HeroSelector";
import { defaultSettings } from "@/lib/constants/settings";
import { api } from "@/trpc/server";

const Hero = async () => {
  const settings = await api.settings.getSettings();

  return <HeroSelector settings={settings || defaultSettings} />;
};

export default Hero;
