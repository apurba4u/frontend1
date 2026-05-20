"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, BookOpen, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-9xl font-bold text-gradient opacity-20">
              404
            </span>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-xl shadow-primary/25">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
          Page Not Found
        </h1>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          Oops! The study room you&apos;re looking for seems to have moved or
          doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-on-primary font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/rooms"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/30 text-on-surface font-medium hover:bg-surface-container transition-all"
          >
            <Search className="w-4 h-4" />
            Browse Rooms
          </Link>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </motion.button>
      </motion.div>
    </main>
  );
}
