import { getSettings } from "@/lib/actions/getSettings";
import NoticeMarqueeSelector from "./NoticeMarqueeSelector";
import { defaultSettings } from "@/lib/constants/settings";

export default async function NoticeMarquee() {
  const { settings, error } = await getSettings();
  //  Add empty state UI for the settings
  if (!settings) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No settings found</p>
      </div>
    );
  }
  if (error) {
    console.error(error);
    return (
      <div className="flex h-full items-center justify-center">
        <p>Error loading settings</p>
      </div>
    );
  }

  return <NoticeMarqueeSelector settings={settings || defaultSettings} />;
}
