import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getCandidate,
  updateCandidate,
  addCandidate,
  deleteCandidate,
  sendCandidateReminder,
  checkCandidateReminder,
  updateCandidateStatus,
} from "../api/ai-reference/candidate/candidate-api";

export const useGetCandidate = (user) => {
  return useQuery({
    queryKey: ["candidates", user],
    queryFn: () => getCandidate(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useCreateCandidate = (user, options = {}) => {
  const { onSuccess } = options;

  return useMutation({
    mutationFn: async (payload) => {
      await addCandidate(user, payload);
    },
    onSuccess: onSuccess,
  });
};

export const useDeleteCandidate = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (candidateId) => {
      await deleteCandidate({ user, candidateId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      queryClient.invalidateQueries({ queryKey: ["references"] });
      queryClient.invalidateQueries({ queryKey: ["archivedCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["archivedReferenceRequest"] });
    },
    onSettled: onSettled,
  });
};

export const useUpdateCandidate = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async ({ candidateId, payload }) => {
      await updateCandidate({ user, candidateId, payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onSettled: onSettled,
  });
};

export const useCheckCandidateReminder = (user, candidateId) => {
  return useQuery({
    queryKey: ["reminder", user, candidateId],
    queryFn: () => checkCandidateReminder({ user, candidateId }),
    enabled: !!candidateId,
    staleTime: 1000 * 60 * 10,
  });
};

export const useSendCandidateReminder = (user, options = {}) => {
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (candidateId) => {
      await sendCandidateReminder({ user, candidateId });
    },

    onSettled: onSettled,
  });
};

export const useUpdateCandidateStatus = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (payload) => {
      await updateCandidateStatus({ user, payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onSettled: onSettled,
  });
};
