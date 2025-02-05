import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentNews() {
  return (
    <div className="space-y-8">
      {recentNews.map((news) => (
        <div key={news.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={news.image} alt="News" />
            <AvatarFallback>NN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{news.title}</p>
            <p className="text-sm text-muted-foreground">{news.category}</p>
          </div>
          <div className="ml-auto font-medium">{news.date}</div>
        </div>
      ))}
    </div>
  );
}

const recentNews = [
  {
    id: "1",
    title: "Breaking News Story",
    category: "Politics",
    date: "Just now",
    image: "/placeholder.png",
  },
  {
    id: "2",
    title: "Technology Update",
    category: "Tech",
    date: "2h ago",
    image: "/placeholder.png",
  },
  {
    id: "3",
    title: "Sports Highlights",
    category: "Sports",
    date: "5h ago",
    image: "/placeholder.png",
  },
  {
    id: "4",
    title: "Entertainment News",
    category: "Entertainment",
    date: "2d ago",
    image: "/placeholder.png",
  },
];
