"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function login(newToken) {
    sessionStorage.setItem("accessToken", newToken);
    setToken(newToken);
  }

  function logout() {
    sessionStorage.removeItem("accessToken");
    setToken(null);
    fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);