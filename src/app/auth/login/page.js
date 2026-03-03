"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth"; // use the centralized auth hook

// Validation schema
const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Form submit handler simply passes credentials to the hook
  const onSubmit = (values) => {
    login({
      email: values.email,
      password: values.password,
      remember: values.remember || false,
    });
    // redirect happens automatically via the isAuthenticated effect above
  };

  return (
    <div className="min-h-screen w-screen flex bg-black text-white overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden md:block w-1/2 h-screen relative">
        <img
          src="/login-bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />
        <div className="relative z-10 p-16">
          <h1 className="text-5xl font-bold leading-tight max-w-md">
            Invest in the Future of <span className="text-emerald-400">Chitral.</span>
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Enter your credentials to access your dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm mb-2 block">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="name@company.com"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-900 border ${
                    errors.email
                      ? "border-red-500"
                      : "border-neutral-700 focus:border-emerald-500"
                  } focus:outline-none`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm">Password</label>
                <button
                  type="button"
                  className="text-emerald-400 text-sm hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2 rounded-lg bg-neutral-900 border ${
                    errors.password
                      ? "border-red-500"
                      : "border-neutral-700 focus:border-emerald-500"
                  } focus:outline-none`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} className="accent-emerald-500" />
              <span className="text-sm text-gray-400">Remember me</span>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            © 2025 F3. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}