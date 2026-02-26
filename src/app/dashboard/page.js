"use client";

import {
  Wallet,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";

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
    <main className="min-h-screen bg-[#0B0F14] text-white ">
      <div className="w-full p-6 mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Project ID: CHT-2025-001
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
            Chitral Valley, KPK • Phase 2 Development • Started Jan 15, 2025 • Est Completion: Dec 2025
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

          {/* Card 1 */}
          <div className="bg-[#11161D] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-[#1A212B] rounded-lg text-emerald-400">
                <Wallet size={20} />
              </div>
              <span className="text-xs text-emerald-400">+12%</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Invested</p>
              <h3 className="text-lg sm:text-xl font-semibold">$250K</h3>
              <p className="text-xs text-gray-500 mt-1">3 transactions</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#11161D] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-[#1A212B] rounded-lg text-blue-400">
                <BarChart3 size={20} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Available Funds</p>
              <h3 className="text-lg sm:text-xl font-semibold">$84.3K</h3>
              <p className="text-xs text-gray-500 mt-1">33.7% remaining</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#11161D] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-[#1A212B] rounded-lg text-yellow-400">
                <Clock size={20} />
              </div>
              <span className="text-xs text-yellow-400">On Track</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Project Progress</p>
              <h3 className="text-lg sm:text-xl font-semibold">45%</h3>
              <p className="text-xs text-gray-500 mt-1">
                Est. 8 months remaining
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#11161D] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-[#1A212B] rounded-lg text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <span className="text-xs text-emerald-400">+5%</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Projected ROI</p>
              <h3 className="text-lg sm:text-xl font-semibold">+28%</h3>
              <p className="text-xs text-gray-500 mt-1">
                Expected by Q4 2025
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart */}
          <div className="lg:col-span-2 bg-[#11161D] rounded-2xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
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
            <h2 className="text-base sm:text-lg font-semibold">
              Fund Breakdown
            </h2>

            {/* Construction */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Construction</span>
                <span>$98.5K</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-emerald-500 h-2 rounded-full w-[59%]" />
              </div>
            </div>

            {/* Materials */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Materials</span>
                <span>$42.7K</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-[25%]" />
              </div>
            </div>

            {/* Labor */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Labor</span>
                <span>$24.5K</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-yellow-400 h-2 rounded-full w-[14%]" />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Total Utilized</span>
                <span className="text-white">$165.7K</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Remaining Balance</span>
                <span className="text-white">$84.3K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Activity */}
          <div className="bg-[#11161D] rounded-2xl p-4 sm:p-6 space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">
              Recent Activity
            </h2>

            <div className="border-b border-gray-800 pb-3">
              <p className="font-medium">Foundation Work Completed</p>
              <p className="text-sm text-gray-400">
                Block A & B piling finished ahead of schedule
              </p>
            </div>

            <div className="border-b border-gray-800 pb-3">
              <p className="font-medium">Material Delivery</p>
              <p className="text-sm text-gray-400">
                Steel beams & cement delivered to site
              </p>
            </div>

            <div className="border-b border-gray-800 pb-3">
              <p className="font-medium">Labor Payment</p>
              <p className="text-sm text-gray-400">
                Monthly wages for excavation team
              </p>
            </div>

            <div>
              <p className="font-medium">Permit Approved</p>
              <p className="text-sm text-gray-400">
                Phase 2 building permit approved
              </p>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-[#11161D] rounded-2xl p-4 sm:p-6 space-y-6">
            <h2 className="text-base sm:text-lg font-semibold">
              Project Milestones
            </h2>

            <div>
              <div className="flex justify-between">
                <p className="font-medium">Phase 1: Land Acquisition</p>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="font-medium">
                  Phase 2: Foundation Development
                </p>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                  In Progress
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-yellow-400 h-2 rounded-full w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="font-medium">
                  Phase 3: Structure Construction
                </p>
                <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded-full">
                  Pending
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}