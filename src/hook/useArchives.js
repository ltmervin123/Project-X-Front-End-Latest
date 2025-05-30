import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ReferenceQuestionArchiveAPI from "../api/ai-reference/archive/reference-question-api";
import * as ReferenceRequestArchiveAPI from "../api/ai-reference/archive/reference-request-api";
import * as CandidateArchiveAPI from "../api/ai-reference/archive/candidate-api";
import * as JobArchiveAPI from "../api/ai-reference/archive/jobs-api";

export const useArchiveReference = (user) => {
  return useQuery({
    queryKey: ["archivedReferenceRequest", user],
    queryFn: () => ReferenceRequestArchiveAPI.getArchiveReferenceRequest(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteArchiveReference = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (referenceRequestId) =>
      await ReferenceRequestArchiveAPI.deleteReferenceRequest({
        user,
        referenceRequestId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
    },
    onSettled: onSettled,
  });
};

export const useRestoreArchiveReference = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (referenceRequestId) =>
      await ReferenceRequestArchiveAPI.restoreReferenceRequest({
        user,
        referenceRequestId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
      queryClient.invalidateQueries({
        queryKey: ["references"],
      });
    },
    onSettled: onSettled,
  });
};

export const useArchiveQuestion = (user) => {
  return useQuery({
    queryKey: ["archivedReferenceQuestions", user],
    queryFn: () =>
      ReferenceQuestionArchiveAPI.getArchiveReferenceQuestion(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteArchiveQuestion = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (questionIds) =>
      await ReferenceQuestionArchiveAPI.deleteReferenceQuestion({
        user,
        questionIds,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceQuestions"],
      });
    },
    onSettled: onSettled,
  });
};

export const useRestoreArchiveQuestion = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (questionIds) => {
      return await ReferenceQuestionArchiveAPI.restoreReferenceQuestion({
        user,
        questionIds,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceQuestions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onSettled: onSettled,
  });
};

export const useArchiveCandidate = (user) => {
  return useQuery({
    queryKey: ["archivedCandidates", user],
    queryFn: () => CandidateArchiveAPI.getArchiveCandidate(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteArchiveCandidate = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (candidateIds) =>
      await CandidateArchiveAPI.deleteCandidate({ user, candidateIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedCandidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
    },
    onSettled: onSettled,
  });
};

export const useRestoreArchiveCandidate = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (candidateIds) =>
      await CandidateArchiveAPI.restoreCandidate({ user, candidateIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["references"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedCandidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
    },
    onSettled: onSettled,
  });
};

export const useArchiveJob = (user) => {
  return useQuery({
    queryKey: ["archivedJobs", user],
    queryFn: () => JobArchiveAPI.getArchiveJobs(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteArchiveJob = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (jobIds) =>
      await JobArchiveAPI.deleteJobs({ user, jobIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedJobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedCandidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["candidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["references"],
      });
    },
    onSettled: onSettled,
  });
};

export const useRestoreJob = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;
  return useMutation({
    mutationFn: async (jobIds) =>
      await JobArchiveAPI.restoreJobs({ user, jobIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      queryClient.invalidateQueries({ queryKey: ["references"] });
      queryClient.invalidateQueries({
        queryKey: ["archivedJobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedCandidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
    },
    onSettled: onSettled,
  });
};
