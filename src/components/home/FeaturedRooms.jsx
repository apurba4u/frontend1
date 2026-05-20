"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import RoomCard from "@/components/rooms/RoomCard";
import { useRooms } from "@/hooks/useRooms";

export default function FeaturedRooms() {
  const { data, isLoading } = useRooms({ limit: 6, page: 1 });
  const rooms = data?.rooms || [];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            Featured Study Rooms
          </h2>
          <p className="text-on-surface-variant text-base max-w-lg mx-auto">
            Discover our most popular study spaces, each designed for maximum
            comfort and productivity.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {rooms.map((room, index) => (
              <RoomCard key={room._id} room={room} index={index} />
            ))}
          </div>
        )}

        {rooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-on-primary font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              View All Rooms
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
