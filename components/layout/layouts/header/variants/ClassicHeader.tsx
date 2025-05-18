import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { getCurrentBanglaDate } from "@/lib/utils/bengali-date";
import NavSheet from "../../navigation/NavSheet";

interface ClassicHeaderProps {
  settings: Settings;
  menuItems: Array<{ title: string; path: string }>;
}

const ClassicHeader: React.FC<ClassicHeaderProps> = ({ settings, menuItems }) => {
  const currentDate = getCurrentBanglaDate();

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center border-b">
        <div className="text-sm text-gray-600">{currentDate}</div>
        <div className="flex space-x-4">
          <Link href="https://facebook.com" className="text-gray-600 hover:text-blue-600">
            <FaFacebook size={20} />
          </Link>
          <Link href="https://twitter.com" className="text-gray-600 hover:text-blue-400">
            <FaTwitter size={20} />
          </Link>
          <Link href="https://youtube.com" className="text-gray-600 hover:text-red-600">
            <FaYoutube size={20} />
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="block">
            <Image
              src={settings?.logo || "/logo.png"}
              alt="Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavSheet menuItems={menuItems} />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ClassicHeader;