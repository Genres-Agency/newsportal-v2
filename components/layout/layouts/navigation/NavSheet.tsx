import React from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavSheetProps {
  menuItems: Array<{ title: string; path: string }>;
}

const NavSheet: React.FC<NavSheetProps> = ({ menuItems }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 text-gray-600 hover:text-primary transition-colors">
          <FaBars size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-lg text-gray-600 hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavSheet;