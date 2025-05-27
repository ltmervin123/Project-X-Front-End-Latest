import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getCustomReferenceQuestions,
  deleteCustomReferenceQuestion,
  updateCustomReferenceQuestion,
  createCustomReferenceQuestion,
} from "../api/ai-reference/custom-questions/custom-questions-api";

export const useGetCustomQuestions = (user) => {
  return useQuery({
    queryKey: ["custom-questions", user],
    queryFn: () => getCustomReferenceQuestions(user),
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteCustomQuestion = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (questionId) => {
      await deleteCustomReferenceQuestion(user, questionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceQuestions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["custom-questions"],
      });
    },
    onSettled: onSettled,
  });
};

export const useUpdateCustomQuestion = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async ({ questionId, payload }) => {
      await updateCustomReferenceQuestion({ user, questionId, payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["custom-questions"],
      });
    },
    onSettled: onSettled,
  });
};

export const useCreateCustomQuestion = (user, options = {}) => {
  const queryClient = useQueryClient();
  const { onSettled } = options;

  return useMutation({
    mutationFn: async (payload) => {
      await createCustomReferenceQuestion({ payload, user });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["custom-questions"],
      });
    },
    onSettled: onSettled,
  });
};
