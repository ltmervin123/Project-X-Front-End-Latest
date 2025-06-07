import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAgency,
  createAgency,
  deleteAgency,
  updateAgency,
} from "../api/ai-reference/agency/agency-api";

export const useGetAgency = (user) => {
  return useQuery({
    queryKey: ["agency", user],
    queryFn: () => getAgency(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useCreateAgency = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (agencyData) => {
      await createAgency(user, agencyData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agency"] });
    },
    onSettled: onSettled,
  });
};

export const useDeleteAgency = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (agencyId) => {
      await deleteAgency(user, agencyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agency"] });
    },
    onSettled: onSettled,
  });
};

export const useUpdateAgency = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async ({ agencyId, updatedData }) => {
      await updateAgency({ user, agencyId, updatedData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agency"] });
    },
    onSettled: onSettled,
  });
};
