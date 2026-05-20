"use client";

import Link from "next/link";
import { BookOpen, Heart, Globe, Send, MessageCircle } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Explore Rooms", href: "/rooms" },
    { label: "Book a Room", href: "/rooms" },
    { label: "Pricing", href: "/rooms" },
  ],
  Account: [
    { label: "Sign In", href: "/login" },
    { label: "Get Started", href: "/register" },
    { label: "My Bookings", href: "/my-bookings" },
  ],
  Support: [
    { label: "Help Center", href: "/" },
    { label: "Contact Us", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">StudyNook</span>
            </Link>
            <p className="text-inverse-on-surface/70 text-sm leading-relaxed mb-4">
              Premium study spaces designed for focus and collaboration. Book
              your perfect study room today.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, Send, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-inverse-on-surface/10 flex items-center justify-center hover:bg-inverse-on-surface/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-inverse-on-surface mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-inverse-on-surface/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-inverse-on-surface/50">
            &copy; {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>
          <p className="text-sm text-inverse-on-surface/50 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-error fill-error" /> for
            focused learners
          </p>
        </div>
      </div>
    </footer>
  );
}
