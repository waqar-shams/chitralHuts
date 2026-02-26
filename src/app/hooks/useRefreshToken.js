"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function useRefreshToken() {
  const { login, token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        login(data.accessToken);
      }
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [token]);
}