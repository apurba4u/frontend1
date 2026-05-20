"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useCreateRoom } from "@/hooks/useRooms";
import { AMENITIES } from "@/utils/constants";
import { Loader2, Plus, X } from "lucide-react";

const roomSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL"),
  floor: z.coerce.number().min(1, "Floor must be at least 1").max(50),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1").max(100),
  hourlyPrice: z.coerce.number().min(1, "Price must be at least $1"),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
});

export default function AddRoomPage() {
  const router = useRouter();
  const createRoom = useCreateRoom();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      amenities: [],
    },
  });

  const selectedAmenities = watch("amenities") || [];

  const toggleAmenity = (amenity) => {
    const current = selectedAmenities;
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    setValue("amenities", updated, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    createRoom.mutate(data, {
      onSuccess: () => {
        router.push("/my-listings");
      },
    });
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="flex-1 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-on-surface mb-2">
              Add New Room
            </h1>
            <p className="text-on-surface-variant mb-8">
              List a new study room for others to book
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-lg space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Room Name
              </label>
              <input
                {...register("name")}
                placeholder="e.g., The Quiet Corner"
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-error">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe the room, its atmosphere, and ideal use cases..."
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm resize-none"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Image URL
              </label>
              <input
                {...register("image")}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
              />
              {errors.image && (
                <p className="mt-1 text-xs text-error">{errors.image.message}</p>
              )}
            </div>

            {/* Floor, Capacity, Price */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Floor
                </label>
                <input
                  {...register("floor")}
                  type="number"
                  min={1}
                  placeholder="1"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
                />
                {errors.floor && (
                  <p className="mt-1 text-xs text-error">
                    {errors.floor.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Capacity
                </label>
                <input
                  {...register("capacity")}
                  type="number"
                  min={1}
                  placeholder="4"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
                />
                {errors.capacity && (
                  <p className="mt-1 text-xs text-error">
                    {errors.capacity.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Price/Hour ($)
                </label>
                <input
                  {...register("hourlyPrice")}
                  type="number"
                  min={1}
                  placeholder="15"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
                />
                {errors.hourlyPrice && (
                  <p className="mt-1 text-xs text-error">
                    {errors.hourlyPrice.message}
                  </p>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-3">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-primary text-on-primary shadow-md shadow-primary/25"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30"
                      }`}
                    >
                      {isSelected ? (
                        <X className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                      {amenity}
                    </button>
                  );
                })}
              </div>
              {errors.amenities && (
                <p className="mt-2 text-xs text-error">
                  {errors.amenities.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={createRoom.isPending}
              className="w-full py-3.5 rounded-xl gradient-primary text-on-primary font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {createRoom.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Room
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
