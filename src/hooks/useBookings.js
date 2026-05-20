import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "@/services/bookingService";
import { toast } from "react-toastify";

export function useMyBookings() {
  return useQuery({
    queryKey: ["bookings", "my"],
    queryFn: async () => {
      const data = await bookingService.getMyBookings();
      return data.bookings || [];
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room booked successfully!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking cancelled successfully.");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to cancel booking."
      );
    },
  });
}
