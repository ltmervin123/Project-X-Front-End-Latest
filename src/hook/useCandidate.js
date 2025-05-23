import { useQuery } from "@tanstack/react-query";
import { getCandidate } from "../api/ai-reference/candidate/candidate-api";

export const useGetCandidate = (user) => {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidate(user),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
};
