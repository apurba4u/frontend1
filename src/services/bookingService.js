import api from "@/lib/axios";

export const bookingService = {
  create: async (data) => {
    const response = await api.post("/bookings", data);
    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");
    return response.data;
  },

  cancel: async (id) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
};
