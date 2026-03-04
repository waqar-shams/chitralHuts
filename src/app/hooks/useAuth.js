"use client";

import { useState, useEffect } from "react";
import { useApi } from "./useApi";

export function useAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // decoded token payload
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Auth check in progress

  // React Query hooks
  const loginMutation = useApi({ url: "/api/auth/login", method: "POST" });
  const logoutMutation = useApi({ url: "/api/auth/logout", method: "POST" });
  const refreshQuery = useApi({ method: "GET", url: "/api/auth/refresh", enabled: false });

  // helper to decode jwt payload, avoiding extra dependency
  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  };

  // Login function
  const login = (credentials) => {
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        sessionStorage.setItem("accessToken", data.accessToken); // persist for this session
        setIsAuthenticated(true);
        const info = decodeToken(data.accessToken);
        setUser(info);
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
      setUser(decodeToken(token));
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      // Try refresh from backend session cookie
      refreshQuery
        .refetch()
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          sessionStorage.setItem("accessToken", data.accessToken);
          setUser(decodeToken(data.accessToken));
          setIsAuthenticated(true);
        })
        .catch(() => {
          setAccessToken(null);
          setUser(null);
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
          setUser(decodeToken(data.accessToken));
        })
        .catch(() => {
          logout();
        });
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // NOTE: we no longer log out on `beforeunload` because that triggers on
  // refresh as well. sessionStorage + a session cookie now guarantee that the
  // user is cleared when the browser/tab is closed but kept alive on refresh.

  return { accessToken, user, isAuthenticated, isLoading, login, logout };
}