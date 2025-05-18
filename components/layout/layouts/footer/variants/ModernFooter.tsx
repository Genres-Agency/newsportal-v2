import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings } from "@prisma/client";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

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
              <Image
                src={settings?.logo || "/logo.png"}
                alt="Logo"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600">
              Stay informed with the latest news and updates from around the world.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* News Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">News Categories</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/news/bangladesh" className="text-gray-600 hover:text-primary transition-colors">
                Bangladesh
              </Link>
              <Link href="/news/international" className="text-gray-600 hover:text-primary transition-colors">
                International
              </Link>
              <Link href="/news/sports" className="text-gray-600 hover:text-primary transition-colors">
                Sports
              </Link>
              <Link href="/news/entertainment" className="text-gray-600 hover:text-primary transition-colors">
                Entertainment
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span className="text-gray-600">123 News Street, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span className="text-gray-600">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span className="text-gray-600">contact@newsportal.com</span>
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
              &copy; {currentYear} {settings?.siteName || "Your News Portal"}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-600 hover:text-primary text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;