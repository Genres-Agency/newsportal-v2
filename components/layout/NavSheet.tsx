"use client";

import React from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

interface NavSheetProps {
  menuItems: Array<{
    title: string;
    path: string;
  }>;
}

const NavSheet: React.FC<NavSheetProps> = ({ menuItems }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-2xl w-36">
          <FaBars />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <ul className="flex flex-col space-y-4 p-6">
          {menuItems.map((item, index) => (
            <SheetClose asChild key={index}>
              <li>
                <Link href={item.path} className="relative group block p-2">
                  {item.title}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              </li>
            </SheetClose>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default NavSheet;
