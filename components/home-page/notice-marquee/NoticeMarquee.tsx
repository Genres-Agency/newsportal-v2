import { getSettings } from "@/lib/actions/getSettings";
import NoticeMarqueeSelector from "./NoticeMarqueeSelector";
import { defaultSettings } from "@/lib/constants/settings";

export default async function NoticeMarquee() {
  const { settings, error } = await getSettings();

  if (error) {
    return <div>Error loading settings</div>;
  }

  return <NoticeMarqueeSelector settings={settings || defaultSettings} />;
}
