"use client";

import {
  Wallet,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";
import StatsCard from "@/app/components/StatsCard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Overview() {
  const chartData = [
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

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-sm font-normal text-gray-100">
            Project ID: CHT-2025-001
          </h1>
          <p className="text-gray-50 text-sm font-normal  mt-1 leading-relaxed">
            Chitral Valley, KPK • Phase 2 Development • Started Jan 15, 2025 • Est Completion: Dec 2025
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

          {/* Card 1 */}
          <StatsCard
      icon={<Wallet size={20} />}
      percentage="+12%"
      title="Total Invested"
      amount="$250K"
      transactions="3 transactions"
    />
         

          {/* Card 2 */}
          <StatsCard
      icon={<Wallet size={20} />}
      percentage="+12%"
      title="Total Invested"
      amount="$250K"
      transactions="3 transactions"
    />

          {/* Card 3 */}
         <StatsCard
      icon={<Wallet size={20} />}
      percentage="+12%"
      title="Total Invested"
      amount="$250K"
      transactions="3 transactions"
    />

          {/* Card 4 */}
        <StatsCard
      icon={<Wallet size={20} />}
      percentage="+12%"
      title="Total Invested"
      amount="$250K"
      transactions="3 transactions"
    />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart */}
          <div className="lg:col-span-2 bg-[#11161D] rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg text-white font-semibold mb-8">
              Fund Utilization Over Time
            </h2>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fund Breakdown */}
          <div className="bg-[#11161D] rounded-2xl p-4 sm:p-6 space-y-6">
            <h2 className="text-lg text-white font-semibold">
              Fund Breakdown
            </h2>

            {/* Construction */}
            <div>
              <div className="flex justify-between text-sm font-normal mb-2">
                <span className="text-sm font-normal text-[var(--color-gray-50)]">Construction</span>
                <span className="text-sm font-semibold text-white ">$98.5K</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-emerald-500 h-2 rounded-full w-[59%]" />
              </div>
               <div className="flex justify-between text-sm font-normal mt-2">
                <span className="text-xs font-normal text-[var(--color-gray-100)]">59.4% of total</span>
                <span className="text-xs font-normal text-[var(--color-gray-100)] ">Foundation & Structure</span>
              </div>
            </div>

            {/* Materials */}
            <div>
              <div className="flex justify-between text-sm font-normal mb-2">
                <span className="text-sm font-normal text-[var(--color-gray-50)]">Construction</span>
                <span className="text-sm font-semibold text-white ">$98.5K</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-emerald-500 h-2 rounded-full w-[59%]" />
              </div>
               <div className="flex justify-between text-sm font-normal mt-2">
                <span className="text-xs font-normal text-[var(--color-gray-100)]">59.4% of total</span>
                <span className="text-xs font-normal text-[var(--color-gray-100)] ">Foundation & Structure</span>
              </div>
            </div>

            {/* Labor */}
             <div>
              <div className="flex justify-between text-sm font-normal mb-2">
                <span className="text-sm font-normal text-[var(--color-gray-50)]">Construction</span>
                <span className="text-sm font-semibold text-white ">$98.5K</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-emerald-500 h-2 rounded-full w-[59%]" />
              </div>
               <div className="flex justify-between text-sm font-normal mt-2">
                <span className="text-xs font-normal text-[var(--color-gray-100)]">59.4% of total</span>
                <span className="text-xs font-normal text-[var(--color-gray-100)] ">Foundation & Structure</span>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-4 text-sm text-gray-400">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-white">Total Utilized</span>
                <span className="text-white text-base font-bold">$165.7K</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm font-medium text-white opacity-43">Remaining Balance</span>
                <span className="text-white text-base font-medium">$84.3K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Activity */}
          <div className="bg-[#11161D] rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-lg  text-white font-semibold">
              Recent Activity
            </h2>
            <span className="text-xs font-normal text-[var(--color-gray-50)]">View all</span>
</div>

            <div className=" pb-3">
              <p className="font-medium text-sm text-white">Foundation Work Completed</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
                Block A & B piling finished ahead of schedule
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">2 days ago</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">Construction Phase</p>
              </div>

            </div>
             <div className=" pb-3">
              <p className="font-medium text-sm text-white">Foundation Work Completed</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
                Block A & B piling finished ahead of schedule
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">2 days ago</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">Construction Phase</p>
              </div>

            </div>
             <div className=" pb-3">
              <p className="font-medium text-sm text-white">Foundation Work Completed</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
                Block A & B piling finished ahead of schedule
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">2 days ago</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">Construction Phase</p>
              </div>

            </div>
           
          </div>

          {/* Milestones */}
         <div className="bg-[#11161D] rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-lg  text-white font-semibold">
             Project Milestones
            </h2>
            <span className="text-xs font-normal text-[var(--color-gray-50)]">View all</span>
</div>

            <div className=" pb-3">
              <p className="font-medium text-sm text-white">Phase 1: Land Acquisition</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
               Legal documentation, permits, and site surveys completed
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">Completed: Jan 2025</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">$ $45K spent</p>
              </div>

            </div>
             <div className=" pb-3">
              <p className="font-medium text-sm text-white">Phase 1: Land Acquisition</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
                Block A & B piling finished ahead of schedule
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">2 days ago</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">Construction Phase</p>
              </div>

            </div>
             <div className=" pb-3">
              <p className="font-medium text-sm text-white">Phase 1: Land Acquisition</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
                Block A & B piling finished ahead of schedule
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">2 days ago</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">Construction Phase</p>
              </div>

            </div>
           
          </div>
        </div>

      </div>
    </main>
  );
}