import { Link } from "wouter";
import { Bitcoin, Twitter, MessageCircle, Youtube } from "lucide-react";
import { SiReddit } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="container-layout">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bitcoin-bg rounded-full flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Bitcoin Mining Insider</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Educational guides, hardware context, and network insights for
              learning how Bitcoin mining works—informational only.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mining-guides"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mining Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/hardware-reviews"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Hardware Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Profitability Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  News & Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mining-guides"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Beginner's Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/mining-guides"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mining Setup Tutorial
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Electricity Cost Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/mining-guides"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mining Pool Basics
                </Link>
              </li>
              <li>
                <Link
                  href="/search?q=glossary"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="block">contact@bitcoinmininginsider.com</span>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="mb-2">
            &copy; 2024 Bitcoin Mining Insider. All rights reserved.
          </p>
          <p className="text-sm">
            This website is for educational and informational purposes only and
            does not constitute financial or investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
