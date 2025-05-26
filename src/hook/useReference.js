import { useQuery } from "@tanstack/react-query";
import {
  getCompletedReferences,
  getReferences,
} from "../api/ai-reference/reference-request/reference-request-api";

export const useGetCompletedReference = (user) => {
  return useQuery({
    queryKey: ["completed-reference", user],
    queryFn: () => getCompletedReferences(user),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
};

export const useGetReferences = (user) => {
  return useQuery({
    queryKey: ["references", user],
    queryFn: () => getReferences(user),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
};
