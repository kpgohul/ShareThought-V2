import {
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

const isAxiosError = (error: unknown): error is AxiosError => {
  return !!(error && (error as AxiosError).isAxiosError);
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error(" Query error:", query.queryKey, error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      console.error(" Mutation error:", mutation.options.mutationKey, error);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: "always",
      retry: (failureCount, error) => {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: 0,
    },
  },
});
