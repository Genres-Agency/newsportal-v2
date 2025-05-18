import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "@prisma/client";
import { FaSearch } from "react-icons/fa";
import { getCurrentBanglaDate } from "@/lib/utils/bengali-date";
import NavSheet from "../../navigation/NavSheet";

interface MinimalHeaderProps {
  settings: Settings;
  menuItems: Array<{ title: string; path: string }>;
}

const MinimalHeader: React.FC<MinimalHeaderProps> = ({ settings, menuItems }) => {
  const currentDate = getCurrentBanglaDate();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        {/* Mobile Date Display */}
        <div className="md:hidden py-2 text-sm text-gray-600 text-center border-b">
          {currentDate}
        </div>

        <div className="py-4 flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavSheet menuItems={menuItems} />
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/" className="block">
              <Image
                src={settings?.logo || "/logo.png"}
                alt="Logo"
                width={160}
                height={45}
                className="h-9 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-gray-600 hover:text-primary transition-colors text-sm"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Search Icon */}
          <div className="flex-1 flex justify-end">
            <button className="p-2 text-gray-600 hover:text-primary transition-colors">
              <FaSearch size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MinimalHeader;