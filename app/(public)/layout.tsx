import Advertisement from "@/components/ads/advertisement";
import Footer from "@/components/layout/layouts/footer/Footer";
import Header from "@/components/layout/layouts/header/Header";
import { defaultSettings } from "@/lib/constants/settings";
import { solaimanLipi } from "../layout";
import { api } from "@/trpc/server";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await api.settings.getSettings();

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
