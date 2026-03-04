"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <p className="mb-4 text-gray-400">
        Use the links below to manage application data.
      </p>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/project" className="text-emerald-400 underline">
            Edit Project Data
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="text-emerald-400 underline">
            Manage Users
          </Link>
        </li>
      </ul>
    </main>
  );
}
