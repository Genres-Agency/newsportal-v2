import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { api } from "@/trpc/server";

export async function RecentNews() {
  const news = await api.dashboard.getDashboardRecentNews();
  return (
    <div className="space-y-8">
      {news.map((item) => (
        <div key={item.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.media?.url || ""} alt="News" />
            <AvatarFallback>
              {item.title.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none  line-clamp-2">
              {item.title}
            </p>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <div className="ml-auto font-medium">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  );
}
