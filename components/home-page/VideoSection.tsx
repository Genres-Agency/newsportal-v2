"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

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
    title: "Sample Video Title",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "2",
    title: "Sample Video Title",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "3",
    title: "Sample Video Title",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  {
    id: "4",
    title: "Sample Video Title",
    thumbnail: "https://img.youtube.com/vi/Di_eDRDOC0E/maxresdefault.jpg",
    url: "https://youtu.be/Di_eDRDOC0E?si=kPzaVVm2g9PKGSEf",
  },
  // Add more static video data as needed
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
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
        </div>
      </div>
    </div>
  );
}
