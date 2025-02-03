"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
  defaultImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelect,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [dragOver, setDragOver] = useState(false);

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {preview ? (
        <div className="w-full rounded-lg mx-auto flex items-center justify-center">
          <div className="relative w-[230px] h-[180px] rounded-xl overflow-hidden border shadow-lg">
            <Image
              src={preview}
              alt="Uploaded Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
              onClick={handleRemove}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`w-full flex flex-col items-center justify-center gap-3 cursor-pointer py-8 px-6 rounded-lg border-2 border-dashed ${
            dragOver
              ? "bg-gray-100 border-gray-300"
              : "bg-gray-50 border-gray-200"
          } hover:bg-gray-100`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="text-gray-600 cursor-pointer">
            Drag & drop an image here, or{" "}
            <span className="text-blue-500 font-semibold">click to upload</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
