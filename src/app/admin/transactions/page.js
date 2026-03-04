"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/app/hooks/useApi";
import TransactionForm from "@/app/components/TransactionForm";

export default function AdminTransactionsPage() {
  const { data: users = [] } = useApi({ url: "/api/users" });
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const {
    data: userTx = [],
    isLoading: txLoading,
    refetch: refetchTx,
  } = useApi({ url: `/api/transactions${selected ? `?userId=${selected}` : ""}` });

  const handleUserChange = (e) => {
    setSelected(e.target.value);
    setEditingTransaction(null);
    setActiveTab("form");
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch(`/api/transactions/${transactionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId: parseInt(selected) }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      setDeleteConfirm(null);
      refetchTx();
    } catch (err) {
      alert("Error deleting transaction: " + err.message);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setActiveTab("form");
  };

  const handleFormSuccess = () => {
    refetchTx();
    setEditingTransaction(null);
    setActiveTab("list");
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Transactions</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select User</label>
        <select
          className="p-2 bg-[#11161D] rounded w-full max-w-sm text-white border border-gray-600"
          value={selected || ""}
          onChange={handleUserChange}
        >
          <option value="">-- Select a user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email} ({u.role})
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {activeTab === "form" && (
              <TransactionForm
                userId={selected}
                editingTransaction={editingTransaction}
                onSuccess={handleFormSuccess}
              />
            )}
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-3">
            <div className="bg-[#11161D] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Transactions</h2>
              {txLoading ? (
                <p className="text-gray-400">Loading transactions...</p>
              ) : userTx.length === 0 ? (
                <p className="text-gray-400">No transactions found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 px-2">ID</th>
                        <th className="text-left py-2 px-2">Date & Time</th>
                        <th className="text-left py-2 px-2">Description</th>
                        <th className="text-left py-2 px-2">Status</th>
                        <th className="text-right py-2 px-2">Amount</th>
                        <th className="text-center py-2 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userTx.map((tx) => (
                        <tr key={tx.id} className="border-b border-gray-700 hover:bg-[#0B0F14]">
                          <td className="py-3 px-2 font-mono text-xs">{tx.id}</td>
                          <td className="py-3 px-2 text-sm">
                            {tx.date} {tx.time}
                          </td>
                          <td className="py-3 px-2">
                            <div>
                              <p className="font-medium">{tx.description}</p>
                              {tx.details && (
                                <p className="text-gray-400 text-xs">{tx.details}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                tx.status === "Completed"
                                  ? "bg-green-900 text-green-200"
                                  : tx.status === "Pending"
                                  ? "bg-yellow-900 text-yellow-200"
                                  : "bg-red-900 text-red-200"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right font-medium">{tx.amount}</td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEditTransaction(tx)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(tx.id)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#11161D] p-6 rounded-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Delete Transaction?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete transaction {deleteConfirm}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTransaction(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
