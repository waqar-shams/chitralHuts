"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetcher = async ({ url, method = "GET", data }) => {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
};

export function useApi({ url, method = "GET", queryKey, enabled = true }) {
  const queryClient = useQueryClient();
  const isQuery = method.toUpperCase() === "GET";

  if (isQuery) {
    return useQuery({
  queryKey: queryKey || [url],
  queryFn: () => fetcher({ url, method }),
  enabled,
});
  } else {
   return useMutation({
  mutationFn: (data) => fetcher({ url, method, data }),
  onSuccess: () => {
    if (queryKey) queryClient.invalidateQueries({ queryKey });
    else queryClient.invalidateQueries({ queryKey: [url] });
  },
});

  }
}
