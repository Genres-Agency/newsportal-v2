import { Settings } from "@prisma/client";

export const defaultSettings: Settings = {
  siteName: "News Portal",
  layout: "classic",
  logo: "/logo.svg",
  primaryColor: "#1a73e8",
  secondaryColor: "#f8f9fa",
  primaryForegroundColor: "#ffffff",
  secondaryForegroundColor: "#000000",
  facebook: "",
  twitter: "",
  instagram: "",
  youtube: "",
  linkedin: "",
  id: "default",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "default",
};
