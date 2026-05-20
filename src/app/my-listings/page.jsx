"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { useRooms, useDeleteRoom } from "@/hooks/useRooms";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { formatPrice } from "@/utils/formatters";
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Loader2,
  List,
  AlertTriangle,
} from "lucide-react";

export default function MyListingsPage() {
  const { user } = useAuth();
  const { data, isLoading } = useRooms({ limit: 100 });
  const deleteRoom = useDeleteRoom();
  const [deleteId, setDeleteId] = useState(null);

  const myRooms = (data?.rooms || []).filter(
    (room) => room.owner?._id === user?._id || room.owner === user?._id
  );

  const handleDelete = (id) => {
    deleteRoom.mutate(id, {
      onSuccess: () => setDeleteId(null),
    });
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-on-surface mb-2">
                My Listings
              </h1>
              <p className="text-on-surface-variant">
                Manage your study rooms
                {myRooms.length > 0 && (
                  <span className="text-primary font-medium">
                    {" "}
                    &middot; {myRooms.length} room
                    {myRooms.length !== 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
            <Link
              href="/add-room"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-on-primary font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Room
            </Link>
          </motion.div>

          {/* Content */}
          {isLoading ? (
            <LoadingSpinner text="Loading your rooms..." />
          ) : myRooms.length === 0 ? (
            <EmptyState
              icon={List}
              title="No rooms listed yet"
              description="Start sharing your study spaces with others by adding your first room."
              action={
                <Link
                  href="/add-room"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-medium text-sm shadow-md shadow-primary/25 hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Room
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRooms.map((room, index) => (
                <motion.div
                  key={room._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-40">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl glass text-sm font-bold text-on-surface">
                      {formatPrice(room.hourlyPrice)}/hr
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-on-surface mb-1 line-clamp-1">
                      {room.name}
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">
                      {room.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Floor {room.floor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {room.capacity} seats
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {room.bookingCount || 0} bookings
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-outline-variant/20">
                      <Link
                        href={`/rooms/${room._id}`}
                        className="flex-1 py-2 rounded-xl text-center text-sm font-medium bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => setDeleteId(room._id)}
                        className="py-2 px-4 rounded-xl text-sm font-medium bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
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
                Delete Room?
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                This action cannot be undone. The room and all its booking
                history will be permanently removed.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleteRoom.isPending}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-error text-on-error hover:bg-error/90 disabled:opacity-70 transition-colors flex items-center justify-center gap-2"
                >
                  {deleteRoom.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
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
