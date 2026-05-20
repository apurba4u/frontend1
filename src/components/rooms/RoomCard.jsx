"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, MapPin, DollarSign, Calendar } from "lucide-react";
import { formatPrice } from "@/utils/formatters";
import { AMENITY_ICONS } from "@/utils/constants";
import * as LucideIcons from "lucide-react";

export default function RoomCard({ room, index = 0 }) {
  const getAmenityIcon = (amenity) => {
    const iconName = AMENITY_ICONS[amenity] || "circle";
    const Icon = LucideIcons[iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, (m) => m[1].toUpperCase())] || LucideIcons.Circle;
    return Icon;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/rooms/${room._id}`}>
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={room.image}
              alt={room.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl glass text-sm font-bold text-on-surface">
              {formatPrice(room.pricePerHour)}
              <span className="text-xs font-normal opacity-70">/hr</span>
            </div>

            {/* Floor Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-primary/90 text-white text-xs font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Floor {room.floor}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-on-surface mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
              {room.name}
            </h3>
            <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
              {room.description}
            </p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {room.amenities?.slice(0, 4).map((amenity) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container text-xs text-on-surface-variant"
                  >
                    <Icon className="w-3 h-3" />
                    {amenity}
                  </span>
                );
              })}
              {room.amenities?.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 rounded-lg bg-surface-container text-xs text-on-surface-variant">
                  +{room.amenities.length - 4} more
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <Users className="w-4 h-4" />
                <span>{room.capacity} seats</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <Calendar className="w-4 h-4" />
                <span>{room.bookingCount || 0} bookings</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
