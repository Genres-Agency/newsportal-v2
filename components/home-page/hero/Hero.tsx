import React from "react";
import HeroSelector from "./HeroSelector";
import { getSettings } from "@/lib/actions/getSettings";
import { defaultSettings } from "@/lib/constants/settings";

const Hero = async () => {
  const response = await getSettings();
  const settings = response.settings || defaultSettings;

  return <HeroSelector settings={settings} />;
};

export default Hero;
