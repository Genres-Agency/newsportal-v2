import NoticeMarqueeSelector from "./NoticeMarqueeSelector";
import { defaultSettings } from "@/lib/constants/settings";
import { api } from "@/trpc/server";

export default async function NoticeMarquee() {
  const settings = await api.settings.getSettings();
  //  Add empty state UI for the settings
  if (!settings) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No settings found</p>
      </div>
    );
  }

  return <NoticeMarqueeSelector settings={settings || defaultSettings} />;
}
