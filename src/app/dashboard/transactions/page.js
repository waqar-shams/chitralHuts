"use client";

import { useState } from "react";
import { TrendingUp, Download, Plus, Minus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import TransactionCard from "@/app/components/TransactionCard";
import DepositWithdrawModal from "@/app/components/DepositWithdrawModal";
import { useApi } from "@/app/hooks/useApi";

export default function TransactionsPage() {
  const { data: transactions = [], isLoading: txLoading, refetch } = useApi({ url: "/api/transactions" });
  const [filterType, setFilterType] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("deposit");

  const defaultChartData = [
    { month: "Jan", value: 20000 },
    { month: "Feb", value: 28000 },
    { month: "Mar", value: 35000 },
    { month: "Apr", value: 45000 },
    { month: "May", value: 55000 },
    { month: "Jun", value: 80000 },
    { month: "Jul", value: 95000 },
    { month: "Aug", value: 105000 },
    { month: "Sep", value: 130000 },
    { month: "Oct", value: 165700 },
  ];

  const chartData = defaultChartData;

  // compute basic stats from transactions
  if (txLoading) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-white flex items-center justify-center">
        <p>Loading transactions...</p>
      </main>
    );
  }

  // Filter transactions by type
  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === "all") return true;
    return tx.type === filterType;
  });

  const deposits = transactions.filter((tx) => tx.type === "deposit");
  const withdrawals = transactions.filter((tx) => tx.type === "withdrawal");
  const dividends = transactions.filter((tx) => tx.type === "dividend");

  const depositsSum = deposits.reduce((sum, tx) => {
    const num = parseFloat(tx.amount.replace(/[^0-9.-]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const withdrawalsSum = withdrawals.reduce((sum, tx) => {
    const num = parseFloat(tx.amount.replace(/[^0-9.-]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const dividendsSum = dividends.reduce((sum, tx) => {
    const num = parseFloat(tx.amount.replace(/[^0-9.-]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const stats = {
    deposits: {
      percentage: "",
      title: "Total Deposits",
      amount: `$${(depositsSum / 1000).toFixed(1)}K`,
      transactions: `${deposits.length} deposits`,
    },
    withdrawals: {
      percentage: "",
      title: "Total Withdrawals",
      amount: `$${Math.abs(withdrawalsSum / 1000).toFixed(1)}K`,
      transactions: `${withdrawals.length} withdrawals`,
    },
    dividends: {
      percentage: "",
      title: "Dividends Received",
      amount: `$${(dividendsSum / 1000).toFixed(1)}K`,
      transactions: `${dividends.length} dividends`,
    },
  };

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    refetch();
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <div className="w-full p-6 mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Transactions History</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => openModal("deposit")}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm transition font-medium"
            >
              <Plus size={16} />
              Deposit
            </button>
            <button
              onClick={() => openModal("withdrawal")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm transition font-medium"
            >
              <Minus size={16} />
              Withdraw
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#11161D] hover:bg-[#1A212B] rounded-lg text-sm transition">
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TransactionCard
            icon={<TrendingUp size={20} />}
            percentage={stats.deposits?.percentage}
            title={stats.deposits?.title}
            amount={stats.deposits?.amount}
            transactions={stats.deposits?.transactions}
          />
          <TransactionCard
            icon={<TrendingUp size={20} />}
            percentage={stats.withdrawals?.percentage}
            title={stats.withdrawals?.title}
            amount={stats.withdrawals?.amount}
            transactions={stats.withdrawals?.transactions}
          />
          <TransactionCard
            icon={<TrendingUp size={20} />}
            percentage={stats.dividends?.percentage}
            title={stats.dividends?.title}
            amount={stats.dividends?.amount}
            transactions={stats.dividends?.transactions}
          />
        </div>

        {/* Investment Timeline Chart */}
        <div className="bg-[#121212] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Investment Timeline</h2>
            <span className="text-emerald-400 text-sm">All Time</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A212B" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A212B",
                  border: "1px solid #2D3748",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                dot={{ fill: "#10B981", r: 4 }}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Filters and Table */}
        <div className=" p-6 space-y-6">
          {/* Tabs/Filters */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 bg-[#121212] border border-[#1A212B] rounded-lg p-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  filterType === "all"
                    ? "bg-[#0D0D0D] text-white"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("deposit")}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  filterType === "deposit"
                    ? "bg-[#0D0D0D] text-white"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                Deposits
              </button>
              <button
                onClick={() => setFilterType("withdrawal")}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  filterType === "withdrawal"
                    ? "bg-[#0D0D0D] text-white"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                Withdrawals
              </button>
              <button
                onClick={() => setFilterType("dividend")}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  filterType === "dividend"
                    ? "bg-[#0D0D0D] text-white"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                Dividends
              </button>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full px-4 py-2 bg-[#121212] border border-[#1A212B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Transaction Table */}
          <div className="border border-[#1A212B] rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1A212B]">
                    <th className="text-left py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Transaction ID</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-[var(--color-gray-100)]">Date & Time</th>
                    <th className="text-left py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Description</th>
                    <th className="text-left py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Type</th>
                    <th className="text-left py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Status</th>
                    <th className="text-right py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx, idx) => (
                      <tr key={idx} className="border-b border-[#1A212B] hover:bg-[#151B23] transition">
                        <td className="py-4 px-2  text-sm font-normal text-[var(--color-gray-50)] ">{tx.id}</td>
                        <td className="py-4 px-2 text-sm font-normal text-white">
                          {tx.date}
                          <br />
                          <span className="text-xs font-normal  text-[var(--color-gray-100)]">{tx.time}</span>
                        </td>
                        <td className="py-4 px-2">
                          <div>
                            <p className="text-sm font-normal text-white">{tx.description}</p>
                            <p className="text-xs font-normal text-[var(--color-gray-100)]">{tx.details}</p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${
                            tx.type === "deposit"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : tx.type === "withdrawal"
                              ? "bg-orange-500/20 text-orange-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}>
                            {tx.type?.charAt(0).toUpperCase() + tx.type?.slice(1) || "Unknown"}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="inline-flex items-center px-3 py-2 rounded-md text-xs font-normal bg-emerald-500/20 text-[var(--color-primary)]">
                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0Z" fill="#10B981"/>
                              <path d="M3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0Z" stroke="#E5E7EB"/>
                            </svg>
                            <span className="ml-2"> {tx.status} </span>
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right text-sm font-normal text-white">{tx.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 px-2 text-center text-gray-400">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t border-[#1A212B]">
                <p className="text-xs font-normal text-[var(--color-gray-50)]">
                  {" "}
                  Showing <span className="text-xs font-medium text-white"> 1-{filteredTransactions.length} </span> of{" "}
                  <span className="text-xs font-medium text-white"> {filteredTransactions.length} </span> transactions
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-normal  text-[var(--color-gray-100)] hover:text-white transition cursor-pointer border border-[#1A212B] rounded-md">
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-emerald-500/20 rounded">1</button>
                  <button className="px-3 py-1  hover:text-white transition">2</button>
                  <button className="px-3 py-1 text-xs font-normal  text-[var(--color-gray-100)] hover:text-white transition cursor-pointer border border-[#1A212B] rounded-md">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deposit/Withdraw Modal */}
      <DepositWithdrawModal isOpen={modalOpen} onClose={closeModal} type={modalType} />
    </main>
  );
}
