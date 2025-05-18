import React from "react";
import Link from "next/link";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons";
import { quickLinks, categories, socialLinks } from "@/lib/constants/footer-links";

interface ClassicFooterProps {
  settings: Settings;
}

const ClassicFooter: React.FC<ClassicFooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">আমাদের সম্পর্কে</h3>
            <p className="text-gray-300">
              বাংলাদেশ এবং বিশ্বের সর্বশেষ খবর ও আপডেটের জন্য আপনার বিশ্বস্ত সূত্র।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">বিভাগসমূহ</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">আমাদের অনুসরণ করুন</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = {
                  FaFacebook,
                  FaTwitter,
                  FaInstagram,
                  FaYoutube
                }[link.icon] as IconType;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon size={24} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>&copy; {currentYear} {settings?.siteName || "আপনার নিউজ পোর্টাল"}। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default ClassicFooter;