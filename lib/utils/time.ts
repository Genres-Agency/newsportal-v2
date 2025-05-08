export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const diff = Math.floor(diffInSeconds / seconds);
    if (diff >= 1) {
      return `${diff} ${unit}${diff > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
