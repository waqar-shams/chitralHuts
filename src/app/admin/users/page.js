"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/app/hooks/useApi";

export default function AdminUsersPage() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useApi({ url: "/api/users" });
  const addMutation = useApi({ url: "/api/users", method: "POST", queryKey: ["/api/users"] });

  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (addMutation.isSuccess) {
      refetch();
    }
  }, [addMutation.isSuccess, refetch]);

  const handleAdd = (e) => {
    e.preventDefault();
    setMessage(null);
    addMutation.mutate(form, {
      onSuccess: () => {
        setMessage({ type: "success", text: "User added" });
        setForm({ email: "", password: "", role: "user" });
      },
      onError: (err) => {
        setMessage({ type: "error", text: err.message });
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-400">Error: {error.message}</p>}

      {users && (
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b border-[#1A212B]">
              <th className="text-left py-2 px-1">ID</th>
              <th className="text-left py-2 px-1">Email</th>
              <th className="text-left py-2 px-1">Role</th>
              <th className="text-right py-2 px-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[#1A212B] hover:bg-[#151B23] transition">
                <td className="py-2 px-1">{u.id}</td>
                <td className="py-2 px-1">{u.email}</td>
                <td className="py-2 px-1">{u.role}</td>
                <td className="py-2 px-1 text-right">
                  <button
                    className="text-red-400 hover:underline"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <section className="bg-[#11161D] p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 p-2 bg-[#0B0F14] border border-[#1A212B] rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-1 p-2 bg-[#0B0F14] border border-[#1A212B] rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full mt-1 p-2 bg-[#0B0F14] border border-[#1A212B] rounded"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded"
          >
            Add User
          </button>
        </form>
        {message && (
          <p className={message.type === "error" ? "text-red-400" : "text-green-400"}>
            {message.text}
          </p>
        )}
      </section>
    </main>
  );
}
