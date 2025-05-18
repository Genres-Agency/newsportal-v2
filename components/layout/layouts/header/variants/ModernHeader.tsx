import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaYoutube, FaSearch } from "react-icons/fa";
import { getCurrentBanglaDate } from "@/lib/utils/bengali-date";
import NavSheet from "../../navigation/NavSheet";

interface ModernHeaderProps {
  settings: Settings;
  menuItems: Array<{ title: string; path: string }>;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ settings, menuItems }) => {
  const currentDate = getCurrentBanglaDate();

  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-sm text-gray-600">{currentDate}</div>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaFacebook size={18} />
            </Link>
            <Link href="https://twitter.com" className="text-gray-600 hover:text-blue-400 transition-colors">
              <FaTwitter size={18} />
            </Link>
            <Link href="https://youtube.com" className="text-gray-600 hover:text-red-600 transition-colors">
              <FaYoutube size={18} />
            </Link>
          </div>
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
              width={180}
              height={50}
              className="h-10 w-auto"
            />
          </Link>

          {/* Search Button */}
          <button className="p-2 text-gray-600 hover:text-primary transition-colors">
            <FaSearch size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4">
          {/* Mobile Menu */}
          <div className="md:hidden py-3 flex justify-end">
            <NavSheet menuItems={menuItems} />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex justify-center space-x-8 py-3">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-white hover:text-gray-200 transition-colors text-sm uppercase tracking-wide"
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

export default ModernHeader;