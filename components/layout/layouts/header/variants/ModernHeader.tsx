import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "@prisma/client";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaSearch,
  FaInstagram,
} from "react-icons/fa";
import { getCurrentBanglaDate } from "@/lib/utils/bengali-date";
import NavSheet from "../../navigation/NavSheet";

interface ModernHeaderProps {
  settings: Settings;
  menuItems: Array<{ title: string; path: string }>;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ settings, menuItems }) => {
  const currentDate = getCurrentBanglaDate();

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center border-b">
        <div className="text-sm text-gray-600">{currentDate}</div>
        {settings && (
          <div className="flex space-x-4">
            <Link
              href={settings.facebook || ""}
              className="text-blue-500 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </Link>
            <Link
              href={settings.twitter || ""}
              className="text-blue-400 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </Link>
            <Link
              href={settings.instagram || ""}
              className="text-pink-500 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>
            <Link
              href={settings.youtube || ""}
              className="text-red-500 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </Link>
          </div>
        )}
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="block">
            {settings?.logo && settings?.logo !== "" ? (
              <Image
                src={settings.logo}
                alt="Logo"
                width={200}
                height={100}
                className="w-24 h-12"
              />
            ) : (
              <span className="text-2xl font-bold">
                {settings?.siteName || "News Portal"}
              </span>
            )}
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

export default ModernHeader;
