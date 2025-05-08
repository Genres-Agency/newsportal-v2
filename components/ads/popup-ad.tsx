"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

interface PopupAdProps {
  title: string;
  imageUrl: string;
  link: string;
  isFirstVisit?: boolean;
}

export const PopupAd = ({
  title,
  imageUrl,
  link,
  isFirstVisit = true,
}: PopupAdProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisitedBefore");

    if (!hasVisited && isFirstVisit) {
      setIsOpen(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, [isFirstVisit]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">{title}</h2>
          <Link href={link} className="block">
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={300}
              className="w-full object-cover rounded-lg"
            />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
