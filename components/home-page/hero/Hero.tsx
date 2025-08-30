import React from "react";
import HeroSelector from "./HeroSelector";
import { api } from "@/trpc/server";
import { defaultSettings } from "@/lib/constants/settings";

const Hero = async () => {
  const settings = await api.settings.getSettings();

  return <HeroSelector settings={settings || defaultSettings} />;
};

export default Hero;
