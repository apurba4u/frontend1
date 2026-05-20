"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { useRoom } from "@/hooks/useRooms";
import { useCreateBooking } from "@/hooks/useBookings";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { formatPrice, formatTime, calculateTotalPrice } from "@/utils/formatters";
import { AMENITY_ICONS, TIME_SLOTS } from "@/utils/constants";
import { toast } from "react-toastify";
import * as LucideIcons from "lucide-react";
import {
  Users,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function RoomDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { data: room, isLoading } = useRoom(params.id);
  const createBooking = useCreateBooking();

  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const getAmenityIcon = (amenity) => {
    const iconName = AMENITY_ICONS[amenity] || "circle";
    const name =
      iconName.charAt(0).toUpperCase() +
      iconName.slice(1).replace(/-./g, (m) => m[1].toUpperCase());
    return LucideIcons[name] || LucideIcons.Circle;
  };

  const totalPrice =
    bookingData.startTime && bookingData.endTime && room
      ? calculateTotalPrice(
          bookingData.startTime,
          bookingData.endTime,
          room.pricePerHour
        )
      : 0;

  const handleBook = () => {
    if (!isAuthenticated) {
      toast.warning("Please sign in to book a room.");
      router.push("/login");
      return;
    }

    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      toast.warning("Please select a date and time range.");
      return;
    }

    if (bookingData.startTime >= bookingData.endTime) {
      toast.error("End time must be after start time.");
      return;
    }

    createBooking.mutate(
      {
        room: params.id,
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
      },
      {
        onSuccess: () => {
          setBookingData({ date: "", startTime: "", endTime: "" });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="Loading room details..." />
        </main>
        <Footer />
      </>
    );
  }

  if (!room) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-on-surface mb-2">
              Room not found
            </h2>
            <p className="text-on-surface-variant mb-4">
              The room you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.push("/rooms")}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-medium"
            >
              Browse Rooms
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to rooms
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-64 md:h-96 rounded-2xl overflow-hidden"
              >
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-primary/90 text-white text-sm font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Floor {room.floor}
                  </span>
                  <span className="px-3 py-1.5 rounded-xl glass text-sm font-medium text-on-surface flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {room.capacity} seats
                  </span>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
                  {room.name}
                </h1>
                <p className="text-on-surface-variant leading-relaxed">
                  {room.description}
                </p>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-on-surface mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities?.map((amenity) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-on-surface">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-center">
                  <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold text-on-surface">
                    {formatPrice(room.pricePerHour)}
                  </p>
                  <p className="text-xs text-on-surface-variant">per hour</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-center">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold text-on-surface">
                    {room.capacity}
                  </p>
                  <p className="text-xs text-on-surface-variant">seats</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-center">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold text-on-surface">
                    {room.bookingCount || 0}
                  </p>
                  <p className="text-xs text-on-surface-variant">bookings</p>
                </div>
              </motion.div>
            </div>

            {/* Booking Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-lg">
                <h2 className="text-lg font-semibold text-on-surface mb-1">
                  Book This Room
                </h2>
                <p className="text-sm text-on-surface-variant mb-6">
                  Select your preferred date and time
                </p>

                <div className="space-y-4">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">
                      Start Time
                    </label>
                    <select
                      value={bookingData.startTime}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          startTime: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    >
                      <option value="">Select start time</option>
                      {TIME_SLOTS.slice(0, -1).map((time) => (
                        <option key={time} value={time}>
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">
                      End Time
                    </label>
                    <select
                      value={bookingData.endTime}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          endTime: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    >
                      <option value="">Select end time</option>
                      {TIME_SLOTS.filter(
                        (t) => !bookingData.startTime || t > bookingData.startTime
                      ).map((time) => (
                        <option key={time} value={time}>
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  {totalPrice > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 rounded-xl bg-surface-container border border-outline-variant/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-on-surface-variant">
                          Rate
                        </span>
                        <span className="text-sm text-on-surface">
                          {formatPrice(room.pricePerHour)}/hr
                        </span>
                      </div>
                      <div className="h-px bg-outline-variant/20 my-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-on-surface">
                          Total
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Book Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleBook}
                    disabled={createBooking.isPending}
                    className="w-full py-3.5 rounded-xl gradient-primary text-on-primary font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {createBooking.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Book Now
                      </>
                    )}
                  </motion.button>

                  {!isAuthenticated && (
                    <p className="text-xs text-center text-on-surface-variant">
                      You&apos;ll be redirected to sign in to complete your
                      booking.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
