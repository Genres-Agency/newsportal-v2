import React from "react";

export function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      );
    }
    return part;
  });
}
