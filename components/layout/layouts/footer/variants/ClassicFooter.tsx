import React from "react";
import Link from "next/link";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

interface ClassicFooterProps {
  settings: Settings;
}

const ClassicFooter: React.FC<ClassicFooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const categories = [
    { name: "Bangladesh", href: "/news/bangladesh" },
    { name: "International", href: "/news/international" },
    { name: "Sports", href: "/news/sports" },
    { name: "Entertainment", href: "/news/entertainment" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Your trusted source for the latest news and updates from Bangladesh and around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
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
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://youtube.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>&copy; {currentYear} {settings?.siteName || "Your News Portal"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ClassicFooter;