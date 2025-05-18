import { Settings } from "@prisma/client";
import ClassicHero from "./variants/ClassicHero";
import ModernHero from "./variants/ModernHero";
import MinimalHero from "./variants/MinimalHero";

interface HeroSelectorProps {
  settings: Settings;
}

export default function HeroSelector({ settings }: HeroSelectorProps) {
  switch (settings.layout) {
    case "modern":
      return <ModernHero />;
    case "minimal":
      return <MinimalHero />;
    default:
      return <ClassicHero />;
  }
}