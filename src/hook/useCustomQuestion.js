import { useQuery } from "@tanstack/react-query";
import { getCustomReferenceQuestions } from "../api/ai-reference/custom-questions/custom-questions-api";

export const useGetCustomQuestions = (user) => {
  return useQuery({
    queryKey: ["custom-questions"],
    queryFn: () => getCustomReferenceQuestions(user),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
};
