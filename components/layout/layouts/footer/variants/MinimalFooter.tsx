import React from "react";
import Link from "next/link";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons";
import { minimalLinks, socialLinks } from "@/lib/constants/footer-links";

interface MinimalFooterProps {
  settings: Settings;
}

const MinimalFooter: React.FC<MinimalFooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {minimalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex space-x-6">
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
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </Link>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} {settings?.siteName || "আপনার নিউজ পোর্টাল"}। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;