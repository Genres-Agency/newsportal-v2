"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";

interface VideoModalProps {
  videoUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({
  videoUrl,
  title,
  isOpen,
  onClose,
}: VideoModalProps) {
  if (!isOpen) return null;

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)(\w+).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
          aria-label="Close modal"
        >
          <FaTimes className="text-2xl" />
        </button>

        <div className="relative pt-[56.25%]">
          {videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
