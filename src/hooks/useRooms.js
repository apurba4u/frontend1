import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService } from "@/services/roomService";
import { toast } from "react-toastify";

export function useRooms(params = {}) {
  return useQuery({
    queryKey: ["rooms", params],
    queryFn: () => roomService.getAll(params),
    keepPreviousData: true,
  });
}

export function useRoom(id) {
  return useQuery({
    queryKey: ["rooms", id],
    queryFn: () => roomService.getById(id),
    enabled: !!id,
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create room.");
    },
  });
}

export function useUpdateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => roomService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update room.");
    },
  });
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete room.");
    },
  });
}
