"use client";

import { ArrowDown, AlertCircle, DollarSign, Clock } from "lucide-react";
import { useState } from "react";
import { useApi } from "@/app/hooks/useApi";

export default function WithdrawPage() {
  const { data: projectData } = useApi({ url: "/api/project" });
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const availableBalance = projectData?.withdraw?.availableBalance || 0;
  const lockedAmount = projectData?.withdraw?.lockedAmount || 0;

  const recentWithdrawals = projectData?.withdraw?.recentWithdrawals || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit request
    alert(`Requested $${withdrawAmount}`);
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <div className="w-full p-6 mx-auto  space-y-8">
       
        

        {/* Top balance card */}
        <div className="bg-[#11161D] rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start gap-6">
          <div>
            <p className="text-sm font-medium text-[var(--color-gray-50)]">Available Withdraw Balance</p>
            <h2 className="text-4xl font-bold text-white my-2">${availableBalance.toLocaleString()}</h2>
            <p className="text-sm font-normal text-[var(--color-gray-50)]">
              <span className="mr-1">🔒</span>${lockedAmount.toLocaleString()} currently locked in active phases
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#242424] rounded-lg p-4 text-center">
              <p className="text-xs font-normal text-[var(--color-gray-50)]">Pending Requests</p>
              <p className="text-lg font-semibold text-white">0</p>
            </div>
            <div className="bg-[#242424] rounded-lg p-4 text-center">
              <p className="text-xs font-normal text-[var(--color-gray-50)]">Last Withdrawal</p>
              <p className="text-lg font-semibold text-white">Oct 12</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* left: form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#11161D] rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Request Withdrawal</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* amount */}
                <div>
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Amount to Withdraw</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 bg-[#0B0F14] border border-[#1A212B] rounded-lg text-2xl font-semibold text-[#ADAEBC] placeholder-gray-600 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={availableBalance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full mt-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>50%</span>
                    <span>${availableBalance.toLocaleString()}</span>
                  </div>
                </div>

                {/* notes */}
                <div>
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Notes (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="E.g., Personal expense, Re-investment elsewhere..."
                    className="w-full bg-[#0B0F14] border border-[#1A212B] rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={withdrawAmount <= 0}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
                >
                  <ArrowDown className="w-4 h-4" />
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          {/* right: recent withdrawals table */}
          <div className="space-y-6">
            <div className="bg-[#11161D] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-end">
              <h3 className="text-lg font-semibold text-white">Recent Withdrawals</h3>
               <div className="text-right">
                <a href="#" className="text-xs font-normal text-[#10B981] hover:underline">
                  View All History
                </a>
              </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1A212B]">
                      <th className="text-left py-2 px-1 text-xs font-medium text-[var(--color-gray-50)]">Date</th>
                      <th className="text-left py-2 px-1 text-xs font-medium text-[var(--color-gray-50)]">Status</th>
                      <th className="text-right py-2 px-1 text-xs font-medium text-[var(--color-gray-50)]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentWithdrawals.map((w, i) => (
                      <tr key={i} className="border-b border-[#1A212B] hover:bg-[#151B23] transition">
                        <td className="py-3 px-1 text-sm font-normal text-[#D1D5DB]">{w.date}</td>
                        <td className="py-3 px-1 text-xs font-medium text-[#10B981]">{w.status}</td>
                        <td className="py-3 px-1 text-sm font-medium text-white text-right">{w.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
