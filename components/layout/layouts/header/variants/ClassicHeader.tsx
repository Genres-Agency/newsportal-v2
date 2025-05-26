import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "@prisma/client";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { getCurrentBanglaDate } from "@/lib/utils/bengali-date";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import NavSheet from "../../navigation/NavSheet";

interface ClassicHeaderProps {
  settings: Settings;
  menuItems: Array<{ title: string; path: string }>;
}

const ClassicHeader: React.FC<ClassicHeaderProps> = ({
  settings,
  menuItems,
}) => {
  const currentDate = getCurrentBanglaDate();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-center">
          {/* Sheet for Menu Button and Mobile Logo */}
          <div className="flex items-center gap-1">
            <div className="w-9">
              <NavSheet menuItems={menuItems} />
            </div>
            <div className="text-xl font-bold py-2 md:hidden">
              <Link href="/" className="block">
                <Image
                  src={settings?.logo || "/logo.svg"}
                  alt="Logo"
                  width={200}
                  height={100}
                  className="w-24 h-12"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Logo */}
          <div className="text-xl font-bold py-2 hidden md:block">
            <Link href="/">
              <Image
                src={settings?.logo || "/logo.svg"}
                alt="Logo"
                width={180}
                height={100}
              />
            </Link>
          </div>

          {/* Social Media Icons */}
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

        {/* Bottom Section with Date and Menu */}
        <div className="flex flex-row justify-between items-center p-4 border-t">
          <div className="text-gray-600">{currentDate}</div>
          <ul className="hidden md:flex flex-wrap justify-center space-x-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.path} className="relative group block p-2">
                  {item.title}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/search"
            className="text-xl hover:text-gray-600 transition-colors"
          >
            <FaSearch />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ClassicHeader;
