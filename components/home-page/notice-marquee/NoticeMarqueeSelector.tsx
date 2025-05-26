import { Settings } from "@prisma/client";
import ClassicNoticeMarquee from "./variants/ClassicNoticeMarquee";
import ModernNoticeMarquee from "./variants/ModernNoticeMarquee";
import MinimalNoticeMarquee from "./variants/MinimalNoticeMarquee";

interface NoticeMarqueeSelectorProps {
  settings: Settings;
}

export default function NoticeMarqueeSelector({
  settings,
}: NoticeMarqueeSelectorProps) {
  switch (settings.layout) {
    case "modern":
      return <ModernNoticeMarquee />;
    case "minimal":
      return <MinimalNoticeMarquee />;
    default:
      return <ClassicNoticeMarquee />;
  }
}