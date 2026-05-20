"use client";

import RoomCard from "./RoomCard";
import { motion } from "framer-motion";

export default function RoomGrid({ rooms, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <div className="h-48 skeleton-pulse" />
            <div className="p-5 space-y-3 bg-surface-container-lowest">
              <div className="h-5 skeleton-pulse rounded-lg w-3/4" />
              <div className="h-4 skeleton-pulse rounded-lg w-full" />
              <div className="h-4 skeleton-pulse rounded-lg w-2/3" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 skeleton-pulse rounded-lg w-16" />
                <div className="h-6 skeleton-pulse rounded-lg w-16" />
                <div className="h-6 skeleton-pulse rounded-lg w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!rooms?.length) {
    return null;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {rooms.map((room, index) => (
        <RoomCard key={room._id} room={room} index={index} />
      ))}
    </motion.div>
  );
}
