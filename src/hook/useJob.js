import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/ai-reference/job/jobs-api";

export const useGetJobs = (user) => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobs(user),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
};
