"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
};

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  media?: { url: string } | null;
  createdAt: Date;
};

const videos: Video[] = [
  {
    id: "1",
    title: "Sample Video Title 1",
    thumbnail: "https://img.youtube.com/vi/gOENzvDKLoE/maxresdefault.jpg",
    url: "https://youtu.be/gOENzvDKLoE?si=CHPIf-zv-5MXM0l4",
  },
  {
    id: "2",
    title: "Sample Video Title 2",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "3",
    title: "Sample Video Title 3",
    thumbnail: "https://img.youtube.com/vi/YtUdCyDMxtE/maxresdefault.jpg",
    url: "https://youtu.be/YtUdCyDMxtE?si=CS7g8iSuwa5pl0lT",
  },
  {
    id: "4",
    title: "Sample Video Title 4",
    thumbnail: "https://img.youtube.com/vi/1kqf-mMBxc8/maxresdefault.jpg",
    url: "https://youtu.be/1kqf-mMBxc8?si=n-oEYTeP9tPcva0w",
  },
  {
    id: "5",
    title: "Sample Video Title 5",
    thumbnail: "https://img.youtube.com/vi/PhMVEtH1Y9s/maxresdefault.jpg",
    url: "https://youtu.be/PhMVEtH1Y9s?si=pCrts_rx4cVHK-lt",
  },
  {
    id: "6",
    title: "Sample Video Title 6",
    thumbnail: "https://img.youtube.com/vi/h2WneRKufYo/maxresdefault.jpg",
    url: "https://youtu.be/h2WneRKufYo?si=35kDBOgEhUTOaWfB",
  },
  {
    id: "7",
    title: "Sample Video Title 7",
    thumbnail: "https://img.youtube.com/vi/XgVeMDMsoTs/maxresdefault.jpg",
    url: "https://youtu.be/XgVeMDMsoTs?si=vLRTIVf_086Ph2TF",
  },
  {
    id: "8",
    title: "Sample Video Title 8",
    thumbnail: "https://img.youtube.com/vi/Q85aRiRoJCw/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Q85aRiRoJCw&pp=0gcJCYQJAYcqIYzv",
  },
  {
    id: "9",
    title: "Sample Video Title 9",
    thumbnail: "https://img.youtube.com/vi/gyOFdkWx7j0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=gyOFdkWx7j0",
  },
  {
    id: "10",
    title: "Sample Video Title 10",
    thumbnail: "https://img.youtube.com/vi/OocqG7u1r6U/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=OocqG7u1r6U",
  },
  {
    id: "11",
    title: "Sample Video Title 11",
    thumbnail: "https://img.youtube.com/vi/AL2XYSSMP9M/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=AL2XYSSMP9M",
  },
  {
    id: "12",
    title: "Sample Video Title 12",
    thumbnail: "https://img.youtube.com/vi/gY2xQHUQkHE/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=gY2xQHUQkHE",
  },
  {
    id: "13",
    title: "Sample Video Title 13",
    thumbnail: "https://img.youtube.com/vi/uELebpJaEEg/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=uELebpJaEEg",
  },
  {
    id: "14",
    title: "Sample Video Title 13",
    thumbnail: "https://img.youtube.com/vi/bbbMERki3gI/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=bbbMERki3gI",
  },
  {
    id: "15",
    title: "Sample Video Title 13",
    thumbnail: "https://img.youtube.com/vi/Q30nodJ03T0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Q30nodJ03T0",
  },
];

const sidebarNews: NewsItem[] = [
  {
    id: "6",
    title: "মাওয়া এক্সপ্রেসওয়ে উদ্বোধন আজ",
    slug: "mawa-expressway-opening",
    content:
      "দেশের প্রথম এক্সপ্রেসওয়ে মাওয়া-ভাঙ্গা মহাসড়ক আজ উদ্বোধন করা হবে...",
    media: { url: "/images/news1.png" },
    createdAt: new Date(),
  },
  {
    id: "7",
    title: "শিক্ষা প্রতিষ্ঠানে ছুটি বাড়লো আরও এক সপ্তাহ",
    slug: "school-holiday-extended",
    content:
      "শীতের প্রকোপ বৃদ্ধির কারণে শিক্ষা প্রতিষ্ঠানে ছুটি বাড়ানো হয়েছে...",
    media: { url: "/images/news2.png" },
    createdAt: new Date(),
  },
  {
    id: "8",
    title: "বিশ্বকাপ ক্রিকেটে বাংলাদেশের সম্ভাব্য দল",
    slug: "cricket-world-cup-team",
    content: "আসন্ন বিশ্বকাপ ক্রিকেটে বাংলাদেশের সম্ভাব্য দল ঘোষণা...",
    media: { url: "/images/news3.png" },
    createdAt: new Date(),
  },
  {
    id: "9",
    title: "রাজধানীতে বায়ু দূষণের মাত্রা বিপজ্জনক পর্যায়ে",
    slug: "air-pollution-dhaka",
    content: "ঢাকার বায়ু দূষণের মাত্রা আবারও বিপজ্জনক পর্যায়ে পৌঁছেছে...",
    media: { url: "/images/news4.jpg" },
    createdAt: new Date(),
  },
  {
    id: "10",
    title: "নতুন সড়ক আইনে জরিমানার পরিমাণ বৃদ্ধি",
    slug: "new-traffic-law",
    content: "যানবাহন চালকদের জন্য কঠোর হচ্ছে সড়ক আইন...",
    media: { url: "/images/news2.png" },
    createdAt: new Date(),
  },
];

export default function VideoSection() {
  const [rowPositions, setRowPositions] = useState([0, 0, 0]); // Track position for each row

  const handlePrevRow = (rowIndex: number, count: number) => {
    setRowPositions((prev) => {
      const newPositions = [...prev];
      const maxPosition = Math.ceil((videos.length - count) / count);
      newPositions[rowIndex] =
        prev[rowIndex] > 0 ? prev[rowIndex] - 1 : maxPosition;
      return newPositions;
    });
  };

  const handleNextRow = (rowIndex: number, count: number) => {
    setRowPositions((prev) => {
      const newPositions = [...prev];
      const maxPosition = Math.ceil((videos.length - count) / count);
      newPositions[rowIndex] =
        prev[rowIndex] < maxPosition ? prev[rowIndex] + 1 : 0;
      return newPositions;
    });
  };

  const VideoRow = ({
    rowIndex,
    count,
  }: {
    rowIndex: number;
    count: number;
  }) => {
    const start = rowPositions[rowIndex] * count;
    const rowVideos = videos.slice(start, start + count);
    return (
      <div className="relative group">
        <button
          onClick={() => handlePrevRow(rowIndex, count)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        <div
          className={
            count === 2 ? "grid grid-cols-2 gap-4" : "grid grid-cols-3 gap-4"
          }
        >
          {rowVideos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover rounded"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium group-hover:text-red-600 transition-colors">
                {video.title}
              </h3>
            </a>
          ))}
        </div>
        <button
          onClick={() => handleNextRow(rowIndex, count)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar News */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-red-600">
            সর্বশেষ সংবাদ
          </h2>
          <div className="space-y-4">
            {sidebarNews.map((news) => (
              <div key={news.id} className="flex items-start space-x-3 group">
                <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={news.media?.url || "/images/placeholder.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/news/${news.slug}`}
                    className="font-medium text-sm hover:text-red-600 line-clamp-2 leading-tight"
                  >
                    {news.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(news.createdAt).toLocaleString("bn-BD", {
                      hour: "numeric",
                      minute: "numeric",
                    })}{" "}
                    আগে
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-red-600">
            ভিডিও
          </h2>
          <div className="space-y-6">
            <VideoRow rowIndex={0} count={2} />
            <VideoRow rowIndex={1} count={3} />
            <VideoRow rowIndex={2} count={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
