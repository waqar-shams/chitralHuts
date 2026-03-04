"use client";

import { TrendingUp, Download } from "lucide-react";
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
import { useApi } from "@/app/hooks/useApi";

export default function TransactionsPage() {
  const { data: transactions = [], isLoading: txLoading } = useApi({ url: "/api/transactions" });

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

  const totalAmount = transactions.reduce((sum, tx) => {
    const num = parseFloat(tx.amount.replace(/[^0-9.-]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
  const stats = {
    totalReturnsPaid: {
      percentage: "",
      title: "Total Returns Paid",
      amount: `$${(totalAmount / 1000).toFixed(1)}K`,
      transactions: `${transactions.length} transactions`,
    },
    pending: {
      percentage: "",
      title: "Pending",
      amount: "$0.00",
      transactions: "0 transactions",
    },
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <div className="w-full p-6 mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Transactions History</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#11161D] hover:bg-[#1A212B] rounded-lg text-sm transition">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Invested */}
          <TransactionCard
            icon={<TrendingUp size={20} />}
            percentage={stats.totalReturnsPaid?.percentage}
            title={stats.totalReturnsPaid?.title}
            amount={stats.totalReturnsPaid?.amount}
            transactions={stats.totalReturnsPaid?.transactions}
          />
          <TransactionCard
            icon={<TrendingUp size={20} />}
            percentage={stats.pending?.percentage}
            title={stats.pending?.title}
            amount={stats.pending?.amount}
            transactions={stats.pending?.transactions}
          />
          {/* add more cards if data exists */}
        </div>

        {/* Investment Timeline Chart */}
        <div className="bg-[#11161D] rounded-2xl p-6">
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
        <div className="bg-[#11161D] rounded-2xl p-6 space-y-6">
          {/* Tabs/Filters */}
          <div className="flex justify-between items-center ">
             <div className="flex gap-6 border border-[#1A212B] rounded-lg px-4 py-2 ">
            <button className=" text-sm font-medium text-[var(--color-gray-50)]  ">
              All
            </button>
            <button className=" text-sm font-medium text-[var(--color-gray-50)] hover:text-white transition">
              Deposits
            </button>
            <button className=" text-sm font-medium text-[var(--color-gray-50)] hover:text-white transition">
              Withdrawals
            </button>
            <button className=" text-sm font-medium text-[var(--color-gray-50)] hover:text-white transition">
              Dividends
            </button>
          </div>
           <div>
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full px-4 py-2 bg-[#0B0F14] border border-[#1A212B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
          </div>
         

          {/* Search Bar */}
         

          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1A212B]">
                  <th className="text-left py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Transaction ID</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-[var(--color-gray-100)]">Date & Time</th>
                  <th className="text-left py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Description</th>
                  <th className="text-left py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Status</th>
                  <th className="text-right py-3 px-2  text-sm font-semibold text-[var(--color-gray-100)]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1A212B]">
            <p className="text-xs font-normal text-[var(--color-gray-50)]"> Showing <span className="text-xs font-medium text-white"> 1-6 </span> of <span className="text-xs font-medium text-white"> 8 </span> transactions</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-normal  text-[var(--color-gray-100)] hover:text-white transition cursor-pointer border border-[#1A212B] rounded-md">Previous</button>
              <button className="px-3 py-1 text-sm text-white bg-emerald-500/20 rounded">1</button>
              <button className="px-3 py-1  hover:text-white transition">2</button>
              <button className="px-3 py-1 text-xs font-normal  text-[var(--color-gray-100)] hover:text-white transition cursor-pointer border border-[#1A212B] rounded-md">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
