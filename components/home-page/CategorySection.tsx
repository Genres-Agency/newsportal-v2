import Image from "next/image";
import Link from "next/link";
import React from "react";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  media?: { url: string } | null;
  createdAt: Date;
};

export default function CategorySection() {
  // Static data for demonstration
  const categoryNews: { [key: string]: NewsItem[] } = {
    জাতীয়: [
      {
        id: "11",
        title: "রাজধানীতে ভোর থেকে বৃষ্টি, দুপুরে বাড়তে পারে",
        slug: "dhaka-rain-forecast",
        content:
          "রাজধানীতে সকাল থেকে হালকা বৃষ্টি হচ্ছে। আবহাওয়া অধিদপ্তর জানিয়েছে, দিনের দ্বিতীয়ার্ধে বৃষ্টিপাতের প্রবণতা বাড়তে পারে...",
        media: { url: "/images/news/rain.jpg" },
        createdAt: new Date(),
      },
      {
        id: "12",
        title: "বিদ্যুৎ বিল নিয়ে নতুন সিদ্ধান্ত আসছে",
        slug: "electricity-bill-update",
        content:
          "বিদ্যুৎ বিলের নতুন কাঠামো নিয়ে আলোচনা শুরু হয়েছে। সরকার জানিয়েছে, শীঘ্রই এ বিষয়ে নতুন সিদ্ধান্ত ঘোষণা করা হবে...",
        media: { url: "/images/news/electricity.jpg" },
        createdAt: new Date(),
      },
    ],
    অর্থনীতি: [
      {
        id: "13",
        title: "রেমিট্যান্স প্রবাহ বেড়েছে ২০ শতাংশ",
        slug: "remittance-increase",
        content:
          "চলতি মাসে রেমিট্যান্স প্রবাহ গত মাসের তুলনায় ২০ শতাংশ বেড়েছে। কেন্দ্রীয় ব্যাংক সূত্রে এ তথ্য জানা গেছে...",
        media: { url: "/images/news/remittance.jpg" },
        createdAt: new Date(),
      },
      {
        id: "14",
        title: "শেয়ারবাজারে নতুন বিনিয়োগ আসছে",
        slug: "stock-market-investment",
        content:
          "পুঁজিবাজারে বড় ধরনের বিনিয়োগ আসছে। বিদেশি বিনিয়োগকারীরা বাংলাদেশের শেয়ারবাজারে আগ্রহ দেখাচ্ছেন...",
        media: { url: "/images/news/stock-market.jpg" },
        createdAt: new Date(),
      },
    ],
    আন্তর্জাতিক: [
      {
        id: "15",
        title: "মধ্যপ্রাচ্যে উত্তেজনা: জরুরি বৈঠক ডেকেছে জাতিসংঘ",
        slug: "un-middle-east-meeting",
        content:
          "মধ্যপ্রাচ্যের পরিস্থিতি নিয়ে উদ্বেগ প্রকাশ করে জরুরি বৈঠক ডেকেছে জাতিসংঘ। আগামীকাল এ বৈঠক অনুষ্ঠিত হবে...",
        media: { url: "/images/news/un-meeting.jpg" },
        createdAt: new Date(),
      },
      {
        id: "16",
        title: "চীন-যুক্তরাষ্ট্র বাণিজ্য সম্পর্কে নতুন মোড়",
        slug: "china-us-trade",
        content:
          "চীন ও যুক্তরাষ্ট্রের মধ্যে বাণিজ্য সম্পর্কে নতুন মোড় দেখা দিয়েছে। দুই দেশের মধ্যে নতুন বাণিজ্য চুক্তির আলোচনা শুরু হয়েছে...",
        media: { url: "/images/news/china-us.jpg" },
        createdAt: new Date(),
      },
    ],
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(categoryNews).map(([category, news]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-red-600 pb-2 mb-4 border-b border-gray-200">
              {category}
            </h2>
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="group">
                  <div className="relative h-48 mb-2 overflow-hidden rounded">
                    <Image
                      src={item.media?.url || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold hover:text-red-600 line-clamp-2 mb-2">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
