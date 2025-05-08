import React from "react";

export function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  // Escape special regex characters in the query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create a regex pattern that matches whole words and handles Unicode characters
  const pattern = new RegExp(`(${escapedQuery})`, "giu");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    // Case-insensitive comparison using localeCompare for Unicode support
    if (part.localeCompare(query, undefined, { sensitivity: "base" }) === 0) {
      return (
        <span key={index} className="bg-yellow-300 rounded px-0.5">
          {part}
        </span>
      );
    }
    return part;
  });
}
