"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Sidebar from "../components/AdminSidebar";
import Header from "../components/Header";

export default function AdminLayout({ children }) {
  const { isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/auth/login");
      } else if (user?.role !== "admin") {
        router.replace("/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
     <div className="flex h-screen bg-gray-100">
          {/* Sidebar component */}
          <Sidebar />
    
          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Header component */}
            <Header />
    
            {/* Page content */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
  );
}
