import React from "react";
import Link from "next/link";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

interface MinimalFooterProps {
  settings: Settings;
}

const MinimalFooter: React.FC<MinimalFooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Terms", href: "/terms" },
    { name: "Advertise", href: "/advertise" },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {links.map((link) => (
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
            <Link
              href="https://facebook.com"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <FaFacebook size={18} />
            </Link>
            <Link
              href="https://twitter.com"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <FaTwitter size={18} />
            </Link>
            <Link
              href="https://instagram.com"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <FaInstagram size={18} />
            </Link>
            <Link
              href="https://youtube.com"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <FaYoutube size={18} />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} {settings?.siteName || "Your News Portal"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;