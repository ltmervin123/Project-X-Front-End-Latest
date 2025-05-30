import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getJobs,
  deleteJob,
  updateJob,
} from "../api/ai-reference/job/jobs-api";

export const useGetJobs = (user) => {
  return useQuery({
    queryKey: ["jobs", user],
    queryFn: () => getJobs(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteJob = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (jobId) => {
      await deleteJob(user, jobId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      queryClient.invalidateQueries({ queryKey: ["references"] });
      queryClient.invalidateQueries({ queryKey: ["archivedJobs"] });
      queryClient.invalidateQueries({ queryKey: ["archivedCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["archivedReferenceRequest"] });
    },
    onSettled: onSettled,
  });
};

export const useUpdateJob = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async ({ jobId, payload }) => {
      await updateJob(user, jobId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onSettled: onSettled,
  });
};
