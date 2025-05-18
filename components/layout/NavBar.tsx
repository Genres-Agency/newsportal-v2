import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import Image from "next/image";
import NavSheet from "./NavSheet";
import { getSettings } from "@/lib/actions/getSettings";

import { getCurrentBanglaDate } from "@/lib/utils/bengali-date";

const menuItems = [
  { title: "হোম", path: "/" },
  { title: "সর্বশেষ", path: "/latest" },
  { title: "সারাদেশ", path: "/bangladesh" },
  { title: "আন্তর্জাতিক", path: "/international" },
  { title: "রাজনীতি", path: "/politics" },
  { title: "খেলাধুলা", path: "/sports" },
  { title: "প্রযুক্তি", path: "/technology" },
  { title: "বিনোদন", path: "/entertainment" },
  { title: "চাকরি", path: "/jobs" },
  { title: "সব", path: "/news/category" },
];

const Navbar = async () => {
  const { settings } = await getSettings();
  // console.log("Settings:", settings);
  return (
    <nav className="shadow-md">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-center ">
          {/* Sheet for Menu Button */}
          <div className="flex items-center">
            <div className="w-9 mt-1">
              <NavSheet menuItems={menuItems} />
            </div>
            <div className="text-xl font-bold py-2 md:hidden">
              <Link href="/" className="block">
                <Image
                  src={settings?.logo || "/logo.svg"}
                  alt={settings?.siteName || "Logo image"}
                  width={200}
                  height={100}
                  className=" w-24 h-12"
                />
              </Link>
            </div>
          </div>
          {/* Logo */}
          <div className="text-xl font-bold py-2 hidden md:block">
            <Link href="/">
              <Image
                src={settings?.logo || "/logo.svg"}
                alt={settings?.siteName || "Logo image"}
                width={180}
                height={100}
              />
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <FaFacebook className="text-blue-500" />
            <FaTwitter className="text-blue-400" />
            <FaInstagram className="text-pink-500" />
            <FaYoutube className="text-red-500" />
          </div>
        </div>

        {/* Bottom Section with Date and Full Menu */}
        <div className="flex flex-row justify-between items-center p-4 border-t">
          <div className="text-gray-600">{getCurrentBanglaDate()}</div>
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

          {/* More button for mobile */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden bg-gray-200 px-4 py-2 rounded">
              More
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {menuItems.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={item.path} className="relative group block p-2">
                    {item.title}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Search Link */}
          <Link
            href="/search"
            className="text-xl hover:text-gray-600 transition-colors"
          >
            <FaSearch />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
