"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomGrid from "@/components/rooms/RoomGrid";
import RoomSearch from "@/components/rooms/RoomSearch";
import RoomFilters from "@/components/rooms/RoomFilters";
import EmptyState from "@/components/shared/EmptyState";
import { useRooms } from "@/hooks/useRooms";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    amenities: [],
    floor: null,
    priceMin: null,
    priceMax: null,
  });
  const [page, setPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      page,
      limit: 9,
      ...(search && { search }),
      ...(filters.amenities?.length && { amenities: filters.amenities.join(",") }),
      ...(filters.floor && { floor: filters.floor }),
      ...(filters.priceMin && { priceMin: filters.priceMin }),
      ...(filters.priceMax && { priceMax: filters.priceMax }),
    }),
    [search, filters, page]
  );

  const { data, isLoading } = useRooms(queryParams);
  const rooms = data?.rooms || [];
  const totalPages = data?.pagination?.pages || 1;
  const total = data?.pagination?.total || 0;

  const resetFilters = () => {
    setFilters({
      amenities: [],
      floor: null,
      priceMin: null,
      priceMax: null,
    });
    setSearch("");
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
              Explore Study Rooms
            </h1>
            <p className="text-on-surface-variant">
              Find the perfect space for your study session
              {total > 0 && (
                <span className="text-primary font-medium"> &middot; {total} rooms available</span>
              )}
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <RoomSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
            </div>
            <RoomFilters
              filters={filters}
              onChange={(f) => { setFilters(f); setPage(1); }}
              onReset={resetFilters}
            />
          </div>

          {/* Room Grid */}
          <RoomGrid rooms={rooms} isLoading={isLoading} />

          {/* Empty State */}
          {!isLoading && rooms.length === 0 && (
            <EmptyState
              icon={Search}
              title="No rooms found"
              description="Try adjusting your search or filters to find available study rooms."
              action={
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-medium text-sm shadow-md shadow-primary/25 hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              }
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mt-10"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                      p === page
                        ? "bg-primary text-on-primary shadow-md shadow-primary/25"
                        : "border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
