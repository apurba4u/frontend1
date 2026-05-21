"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useAuth } from "@/providers/AuthProvider";
import { DEFAULT_AVATAR } from "@/utils/constants";
import {
  BookOpen,
  Search,
  Plus,
  List,
  CalendarCheck,
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { href: "/rooms", label: "Explore Rooms", icon: Search },
];

const authLinks = [
  { href: "/add-room", label: "Add Room", icon: Plus },
  { href: "/my-listings", label: "My Listings", icon: List },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarCheck },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-lg shadow-primary/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25"
              >
                <BookOpen className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gradient">StudyNook</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-primary text-on-primary shadow-md shadow-primary/25"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </span>
                </Link>
              ))}

              {isAuthenticated &&
                authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? "bg-primary text-on-primary shadow-md shadow-primary/25"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </span>
                  </Link>
                ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {/* User Menu / Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-surface-container transition-colors"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={user?.photoURL || DEFAULT_AVATAR}
                        alt={user?.name || "User"}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.src = DEFAULT_AVATAR;
                        }}
                        unoptimized
                      />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-on-surface">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-on-surface-variant transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl glass shadow-xl shadow-black/10 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-outline-variant/30">
                          <p className="text-sm font-semibold text-on-surface truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-on-surface-variant truncate">
                            {user?.email}
                          </p>
                        </div>
                        {authLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                          >
                            <link.icon className="w-4 h-4" />
                            {link.label}
                          </Link>
                        ))}
                        <div className="border-t border-outline-variant/30 mt-1 pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setIsUserMenuOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/50 w-full transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </span>
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-on-primary hover:bg-primary-container shadow-md shadow-primary/25 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] glass z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gradient">
                      StudyNook
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.href)
                          ? "bg-primary text-on-primary"
                          : "text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  ))}
                </div>

                {isAuthenticated && (
                  <>
                    <div className="h-px bg-outline-variant/30 my-4" />
                    <p className="px-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                      Account
                    </p>
                    <div className="space-y-1">
                      {authLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive(link.href)
                              ? "bg-primary text-on-primary"
                              : "text-on-surface-variant hover:bg-surface-container"
                          }`}
                        >
                          <link.icon className="w-5 h-5" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                <div className="h-px bg-outline-variant/30 my-4" />

                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={user?.photoURL || DEFAULT_AVATAR}
                          alt={user?.name || "User"}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.target.src = DEFAULT_AVATAR;
                          }}
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">
                          {user?.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error-container/50 w-full transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-outline-variant hover:bg-surface-container w-full transition-all"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-primary text-on-primary shadow-md shadow-primary/25 w-full transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
