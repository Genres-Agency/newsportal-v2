
import Advertisement from "@/components/ads/advertisement";
import Footer from "@/components/layout/layouts/footer/Footer";
import Header from "@/components/layout/layouts/header/Header";

import { getSettings } from "@/lib/actions/getSettings";
import { Settings } from "@prisma/client";

const defaultSettings: Settings = {
  siteName: "News Portal",
  layout: "classic",
  logo: "/logo.svg",
  primaryColor: "#1a73e8",
  secondaryColor: "#f8f9fa",
  primaryForegroundColor: "#ffffff",
  secondaryForegroundColor: "#000000",
  id: "default",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "default"
};

const menuItems = [
  { title: "হোম", path: "/" },
  { title: "সর্বশেষ", path: "/latest" },
  { title: "সারাদেশ", path: "/bangladesh" },
  { title: "আন্তর্জাতিক", path: "/international" },
  { title: "রাজনীতি", path: "/politics" },
  { title: "খেলাধুলা", path: "/sports" },
  { title: "প্রযুক্তি", path: "/technology" },
  { title: "বিনোদন", path: "/entertainment" },
  { title: "চাকরি", path: "/jobs" },
  { title: "সব", path: "/news/category" },
];

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings, error } = await getSettings();

  if (error) {
    console.error("[PUBLIC_LAYOUT]", error);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header settings={settings || defaultSettings} menuItems={menuItems} />
      {children}
      <Advertisement />
      <Footer settings={settings || defaultSettings} />
    </div>
  );
}
