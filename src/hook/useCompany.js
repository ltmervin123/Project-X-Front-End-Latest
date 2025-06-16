import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  updateCulture,
} from "../api/ai-reference/company/company-api";

export const useGetProfile = (user) => {
  return useQuery({
    queryKey: ["company", user],
    queryFn: () => getProfile(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useUpdateCompany = (user, option = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = option;
  return useMutation({
    mutationFn: async (updatedData) => {
      await updateProfile({ user, updatedData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
    onSettled: onSettled,
  });
};

export const useUpdateCulture = (user, option = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = option;
  return useMutation({
    mutationFn: async (selectedCulture) => {
      await updateCulture({ user, selectedCulture });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
    onSettled: onSettled,
  });
};
