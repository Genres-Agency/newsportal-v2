"use client";

export default function NewsItemSkeleton() {
  return (
    <div className="block p-4 border-b border-gray-100">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="h-28 w-40 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="flex-grow space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
