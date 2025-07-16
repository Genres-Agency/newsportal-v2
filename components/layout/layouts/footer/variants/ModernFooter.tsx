import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { IconType } from "react-icons";
import { quickLinks, categories, socialLinks, bottomLinks, contactInfo } from "@/lib/constants/footer-links";

interface ModernFooterProps {
  settings: Settings;
}

const ModernFooter: React.FC<ModernFooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
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
            <p className="text-gray-600">
              বিশ্বের সর্বশেষ খবর এবং আপডেট সম্পর্কে অবহিত থাকুন।
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = {
                  FaFacebook,
                  FaTwitter,
                  FaInstagram,
                  FaYoutube,
                }[link.icon] as IconType;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">দ্রুত লিঙ্ক</h3>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* News Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">সংবাদ বিভাগ</h3>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">যোগাযোগ করুন</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">
                  প্রধান সম্পাদক : রুবেল বিন গফফার
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">
                  সম্পাদক ও প্রকাশক: জাকারিয়া রবিউল
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span className="text-gray-600">ঠিকানা: তেজগাঁও ঢাকা ১২১২</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} {settings?.siteName || "আপনার নিউজ পোর্টাল"}।
              সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex space-x-6">
              {bottomLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;