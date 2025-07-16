import Advertisement from "@/components/ads/advertisement";
import Footer from "@/components/layout/layouts/footer/Footer";
import Header from "@/components/layout/layouts/header/Header";

import { getSettings } from "@/lib/actions/getSettings";
import { defaultSettings } from "@/lib/constants/settings";
import { solaimanLipi } from "../layout";

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
    <div
      className={`${solaimanLipi.className} min-h-screen bg-gray-100 font-solaimanlipi`}
    >
      <Header settings={settings || defaultSettings} />
      {children}
      <Advertisement />
      <Footer settings={settings || defaultSettings} />
    </div>
  );
}
