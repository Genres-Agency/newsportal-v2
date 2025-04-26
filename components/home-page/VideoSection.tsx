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
  thumbnail: string;
  slug: string;
};

const videos: Video[] = [
  {
    id: "1",
    title: "Sample Video Title 1",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
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
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "4",
    title: "Sample Video Title 4",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "5",
    title: "Sample Video Title 5",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "6",
    title: "Sample Video Title 6",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "7",
    title: "Sample Video Title 7",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "8",
    title: "Sample Video Title 8",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
];

const sidebarNews: NewsItem[] = [
  {
    id: "1",
    title: "Sample News Title 1",
    thumbnail: "/images/news/placeholder.jpg",
    slug: "sample-news-1",
  },
  // Add more static news data as needed
];

export default function VideoSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerRow = [2, 3, 3]; // Number of videos to show in each row
  const totalPages = Math.ceil(videos.length / 8); // 8 videos per page (2+3+3)

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const VideoRow = ({ start, count }: { start: number; count: number }) => {
    const rowVideos = videos.slice(start, start + count);
    return (
      <div className="relative group">
        <button
          onClick={handlePrevPage}
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
          onClick={handleNextPage}
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
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="flex items-start space-x-3 group"
              >
                <div className="relative w-24 h-20 flex-shrink-0">
                  <Image
                    src={news.thumbnail}
                    alt={news.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h3 className="text-sm group-hover:text-red-600 transition-colors">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-red-600">
            ভিডিও
          </h2>
          <div className="space-y-6">
            <VideoRow start={currentPage * 8} count={2} />
            <VideoRow start={currentPage * 8 + 2} count={3} />
            <VideoRow start={currentPage * 8 + 5} count={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
