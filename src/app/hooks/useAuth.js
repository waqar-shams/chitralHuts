"use client";

import { useState, useEffect } from "react";
import { useApi } from "./useApi";

export function useAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Auth check in progress

  // React Query hooks
  const loginMutation = useApi({ url: "/api/auth/login", method: "POST" });
  const logoutMutation = useApi({ url: "/api/auth/logout", method: "POST" });
  const refreshQuery = useApi({ method: "GET", url: "/api/auth/refresh", enabled: false });

  // Login function
  const login = (credentials) => {
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        sessionStorage.setItem("accessToken", data.accessToken); // persist for this session
        setIsAuthenticated(true);
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setIsAuthenticated(false);
      },
    });
  };

  // Logout function
  const logout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        setAccessToken(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem("accessToken");
      },
      onError: () => {
        // Even if logout API fails, clear frontend auth
        setAccessToken(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem("accessToken");
      },
    });
  };

  // Initialize auth on app load
  useEffect(() => {
    setIsLoading(true);

    const token = sessionStorage.getItem("accessToken");
    if (token) {
      // Use sessionStorage token if available
      setAccessToken(token);
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      // Try refresh from backend session cookie
      refreshQuery
        .refetch()
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          sessionStorage.setItem("accessToken", data.accessToken);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setAccessToken(null);
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  // Auto refresh token every 15 minutes
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      refreshQuery
        .refetch()
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          sessionStorage.setItem("accessToken", data.accessToken);
        })
        .catch(() => {
          logout();
        });
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Logout on browser/tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return { accessToken, isAuthenticated, isLoading, login, logout };
}