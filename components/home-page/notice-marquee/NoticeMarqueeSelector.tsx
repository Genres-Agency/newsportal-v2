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
  const NoNewsMessage = () => (
    <div className="container mx-auto mt-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center">
        <p className="text-gray-600 text-sm">
          No latest news available at the moment
        </p>
      </div>
    </div>
  );

  switch (settings.layout) {
    case "modern":
      return <ModernNoticeMarquee fallback={NoNewsMessage} />;
    case "minimal":
      return <MinimalNoticeMarquee fallback={NoNewsMessage} />;
    default:
      return <ClassicNoticeMarquee fallback={NoNewsMessage} />;
  }
}
