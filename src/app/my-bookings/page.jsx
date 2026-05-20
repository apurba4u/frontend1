"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMyBookings, useCancelBooking } from "@/hooks/useBookings";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import {
  formatPrice,
  formatDate,
  formatTime,
  calculateDuration,
} from "@/utils/formatters";
import {
  CalendarCheck,
  Calendar,
  Clock,
  MapPin,
  Users,
  XCircle,
  CheckCircle,
  Loader2,
  AlertTriangle,
  DollarSign,
  Timer,
} from "lucide-react";

export default function MyBookingsPage() {
  const { data: bookings, isLoading } = useMyBookings();
  const cancelBooking = useCancelBooking();
  const [cancelId, setCancelId] = useState(null);

  const allBookings = bookings || [];
  const activeBookings = allBookings.filter((b) => b.status === "confirmed");
  const cancelledBookings = allBookings.filter(
    (b) => b.status === "cancelled"
  );
  const totalHours = activeBookings.reduce((sum, b) => {
    return sum + calculateDuration(b.startTime, b.endTime);
  }, 0);

  const handleCancel = (id) => {
    cancelBooking.mutate(id, {
      onSuccess: () => setCancelId(null),
    });
  };

  const stats = [
    {
      icon: CheckCircle,
      label: "Active Bookings",
      value: activeBookings.length,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: XCircle,
      label: "Cancelled",
      value: cancelledBookings.length,
      color: "text-error",
      bg: "bg-error-container",
    },
    {
      icon: Timer,
      label: "Total Hours",
      value: Math.round(totalHours * 10) / 10,
      color: "text-tertiary",
      bg: "bg-tertiary-fixed",
    },
    {
      icon: DollarSign,
      label: "Total Spent",
      value: formatPrice(
        activeBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
      ),
      color: "text-secondary",
      bg: "bg-secondary-fixed",
    },
  ];

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-on-surface mb-2">
              My Bookings
            </h1>
            <p className="text-on-surface-variant">
              Track and manage your study room reservations
            </p>
          </motion.div>

          {/* Stats */}
          {!isLoading && allBookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-on-surface">
                    {stat.value}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Content */}
          {isLoading ? (
            <LoadingSpinner text="Loading your bookings..." />
          ) : allBookings.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="No bookings yet"
              description="Start exploring study rooms and make your first booking."
              action={
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-medium text-sm shadow-md shadow-primary/25 hover:shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Browse Rooms
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {allBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-5 rounded-2xl bg-surface-container-lowest border shadow-sm hover:shadow-md transition-all ${
                    booking.status === "cancelled"
                      ? "border-error/20 opacity-75"
                      : "border-outline-variant/20"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Room Image */}
                    <div className="relative w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={booking.room?.image || "/placeholder.jpg"}
                        alt={booking.room?.name || "Room"}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-on-surface truncate">
                          {booking.room?.name || "Unknown Room"}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            booking.status === "confirmed"
                              ? "bg-primary/10 text-primary"
                              : "bg-error-container text-on-error-container"
                          }`}
                        >
                          {booking.status === "confirmed" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Confirmed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              Cancelled
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {formatTime(booking.startTime)} -{" "}
                          {formatTime(booking.endTime)}
                        </span>
                        {booking.room?.floor && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            Floor {booking.room.floor}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 font-semibold text-primary">
                          <DollarSign className="w-4 h-4" />
                          {formatPrice(booking.totalPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Cancel Button */}
                    {booking.status === "confirmed" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCancelId(booking._id)}
                        className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium border border-error/30 text-error hover:bg-error-container hover:text-on-error-container transition-all flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancelId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm p-6 rounded-2xl bg-surface-container-lowest shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <h3 className="text-lg font-semibold text-on-surface mb-2">
                Cancel Booking?
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleCancel(cancelId)}
                  disabled={cancelBooking.isPending}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-error text-on-error hover:bg-error/90 disabled:opacity-70 transition-colors flex items-center justify-center gap-2"
                >
                  {cancelBooking.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  Cancel Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </ProtectedRoute>
  );
}
