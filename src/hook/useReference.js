import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getCompletedReferences,
  getReferences,
  deleteReference,
  fetchReferenceByReferenceId,
  updateReference,
} from "../api/ai-reference/reference-request/reference-request-api";

export const useGetCompletedReference = (user) => {
  return useQuery({
    queryKey: ["completed-reference", user],
    queryFn: () => getCompletedReferences(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useGetReferences = (user) => {
  return useQuery({
    queryKey: ["references", user],
    queryFn: () => getReferences(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteReference = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (referenceId) => {
      await deleteReference({ user, referenceId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
      queryClient.invalidateQueries({ queryKey: ["archivedReferenceRequest"] });
    },
    onSettled: onSettled,
  });
};

export const useGetReferencesById = (params) => {
  return useQuery({
    queryKey: ["reference", params],
    queryFn: () => fetchReferenceByReferenceId(params),
    staleTime: 1000 * 60 * 5,
    enabled: !!params.referenceId && !!params.refereeId && !!params.token,
  });
};

export const useUpdateReferee = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (payload) => {
      await updateReference({ user, payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
    },
    onSettled: onSettled,
  });
};
