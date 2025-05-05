"use client";
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
// import Logo from "@/public/logo.png";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

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

const Navbar: React.FC = () => {
  return (
    <nav className="shadow-md">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-center ">
          {/* Sheet for Menu Button */}
          <div className="flex items-center">
            <div className="w-9 mt-1">
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
                          <Link
                            href={item.path}
                            className="relative group block p-2"
                          >
                            {item.title}
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                          </Link>
                        </li>
                      </SheetClose>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
            <div className="text-xl font-bold py-2 md:hidden">
              <Link href="/" className="block">
                <Image
                  src="/logo.svg"
                  alt="Logo image"
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
                src="/logo.svg"
                alt="Logo image"
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

          {/* Search Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xl mt-4 md:mt-0">
                <FaSearch />
              </button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center space-y-4 pt-16">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Search
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
