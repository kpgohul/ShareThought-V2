"use client";
import { QueryClientProvider, focusManager } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../lib/queryClient";
import { useEffect } from "react";

const onVisibilityChange = () => {
  focusManager.setFocused(document.visibilityState === "visible");
};

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.addEventListener("visibilitychange", onVisibilityChange);
    return () => window.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};
