"use client";

import { useState } from "react";

export default function TransactionForm({ userId, onSuccess, editingTransaction = null }) {
  const [formData, setFormData] = useState(
    editingTransaction || {
      id: "",
      date: "",
      time: "",
      description: "",
      details: "",
      status: "Pending",
      amount: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = sessionStorage.getItem("accessToken");
      const url = editingTransaction
        ? `/api/transactions/${editingTransaction.id}`
        : "/api/transactions";
      const method = editingTransaction ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...formData, userId: parseInt(userId) }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save transaction");
      }

      setMessage({ type: "success", text: editingTransaction ? "Transaction updated!" : "Transaction added!" });
      
      // Reset form
      if (!editingTransaction) {
        setFormData({
          id: "",
          date: "",
          time: "",
          description: "",
          details: "",
          status: "Pending",
          amount: "",
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#11161D] p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">
        {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Transaction ID *</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g., TRX-89201"
            required
            disabled={editingTransaction ? true : false}
            className="w-full p-2 bg-[#0B0F14] text-white rounded border border-gray-600 focus:border-emerald-500 focus:outline-none disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#0B0F14] text-white rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Time *</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#0B0F14] text-white rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#0B0F14] text-white rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Description *</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Quarterly Dividend Payout"
            required
            className="w-full p-2 bg-[#0B0F14] text-white rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Amount *</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g., +$4,200.00"
            required
            className="w-full p-2 bg-[#0B0F14] text-white rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Details</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="e.g., Q3 2025 Distribution"
          rows={3}
          className="w-full p-2 bg-[#0B0F14] text-white rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        {loading ? "Saving..." : editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>

      {message && (
        <p
          className={`p-2 rounded text-sm ${
            message.type === "error" ? "bg-red-900 text-red-200" : "bg-green-900 text-green-200"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
