"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { AMENITIES, FLOORS } from "@/utils/constants";

export default function RoomFilters({ filters, onChange, onReset }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount =
    (filters.amenities?.length || 0) +
    (filters.floor ? 1 : 0) +
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0);

  const toggleAmenity = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface hover:border-primary/30 transition-all text-sm font-medium w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-lg overflow-hidden"
          >
            {/* Floor Filter */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-on-surface mb-3">Floor</h4>
              <div className="flex flex-wrap gap-2">
                {FLOORS.map((floor) => (
                  <button
                    key={floor}
                    onClick={() =>
                      onChange({
                        ...filters,
                        floor: filters.floor === floor ? null : floor,
                      })
                    }
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                      filters.floor === floor
                        ? "bg-primary text-on-primary shadow-md shadow-primary/25"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    Floor {floor}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-on-surface mb-3">
                Price Range ($/hr)
              </h4>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin || ""}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMin: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <span className="text-on-surface-variant">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax || ""}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMax: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-on-surface mb-3">
                Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((amenity) => {
                  const isSelected = filters.amenities?.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-primary text-on-primary shadow-md shadow-primary/25"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {amenity}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={onReset}
                className="flex items-center gap-2 text-sm text-error hover:text-on-error-container font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
