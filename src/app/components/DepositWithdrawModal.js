"use client";

import { useState } from "react";
import { CreditCard, X } from "lucide-react";

export default function DepositWithdrawModal({ isOpen, onClose, type = "deposit" }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const numAmount = parseFloat(amount);
      if (!numAmount || numAmount <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const token = sessionStorage.getItem("accessToken");

      // Create payment intent
      const intentResponse = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          amount: numAmount,
          type: type,
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${new Date().toLocaleDateString()}`,
        }),
      });

      if (!intentResponse.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret, intentId } = await intentResponse.json();

      // In a real implementation, you would use Stripe Elements here
      // For MVP, we'll simulate successful payment
      const confirmResponse = await fetch("/api/payments/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ intentId }),
      });

      if (!confirmResponse.ok) {
        throw new Error("Failed to process payment");
      }

      const confirmData = await confirmResponse.json();
      setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} of $${numAmount.toFixed(2)} successfully processed!`);
      setAmount("");
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#121212] rounded-lg p-8 max-w-md w-full border border-[#1A212B]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CreditCard size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1A212B] rounded transition"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2 bg-[#1A212B] border border-[#2D3748] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                disabled={loading}
              />
            </div>
          </div>

          {/* Info Text */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm text-blue-300">
            {type === "deposit"
              ? "Funds will be added to your account immediately after payment."
              : "Withdrawal requests are processed within 1-2 business days."}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-sm text-green-300">
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#1A212B] hover:bg-[#2D3748] text-white rounded-lg font-medium transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !amount}
              className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Processing..." : `${type.charAt(0).toUpperCase() + type.slice(1)} $${amount || "0.00"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
