"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNews } from "../../hooks/useNews";
import GoogleAdsense, { GoogleAdsenseScript } from "../ads/GoogleAdsense";
import VideoModal from "./VideoModal";

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

export default function VideoSection() {
  const [rowPositions, setRowPositions] = useState([0, 0, 0]); // Track position for each row
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { data: newsData, isLoading, error } = useNews();
  const sidebarNews = (newsData || []).slice(0, 5);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading news</div>;
  }

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
      22;
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
      <div className="relative group transition-transform duration-500 ease-out">
        <button
          onClick={() => handlePrevRow(rowIndex, count)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 z-10"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        <div
          className={
            count === 2 ? "grid grid-cols-2 gap-4" : "grid grid-cols-3 gap-4"
          }
        >
          {rowVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group/video relative block w-full text-left"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover rounded transform transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover/video:bg-opacity-40 transition-all duration-300 ease-in-out">
                  <FaPlay className="text-white text-4xl transform scale-0 group-hover/video:scale-100 transition-transform duration-300 ease-out" />
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium group-hover:text-red-600 transition-colors">
                {video.title}
              </h3>
            </button>
          ))}
        </div>
        <button
          onClick={() => handleNextRow(rowIndex, count)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 z-10"
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
            {sidebarNews.map((news: NewsItem) => (
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
                    className="font-medium text-base md:text-lg hover:text-red-600 line-clamp-2 leading-tight hover:underline"
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
            {/* Google AdSense Advertisement */}
            <GoogleAdsense
              client="ca-pub-4798069224424379"
              slot="3438443280"
              format="auto"
              responsive={true}
              className="w-full min-h-[250px] bg-gray-50 rounded-lg overflow-hidden"
            />
            <GoogleAdsenseScript />
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
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
