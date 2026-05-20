import api from "@/lib/axios";

export const roomService = {
  getAll: async (params = {}) => {
    const response = await api.get("/rooms", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/rooms", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/rooms/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  },
};
