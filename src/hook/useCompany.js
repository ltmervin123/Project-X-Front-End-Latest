import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProfile } from "../api/ai-reference/company/company-api";

export const useGetProfile = (user) => {
  return useQuery({
    queryKey: ["company", user],
    queryFn: () => getProfile(user),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export const useCreateCandidate = (user, options = {}) => {
  const { onSuccess } = options;

  return useMutation({
    mutationFn: async (payload) => {
      //   await addCandidate(user, payload);
    },
    onSuccess: onSuccess,
  });
};
