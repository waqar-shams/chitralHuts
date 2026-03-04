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

import { useApi } from "@/app/hooks/useApi";

export default function Overview() {
  // fetch editable project data from admin API
  const { data: projectData } = useApi({ url: "/api/project" });

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

  const chartData = projectData?.chartData || defaultChartData;
  const project = projectData?.project || {};
  const stats = projectData?.stats || {};
  const breakdown = projectData?.breakdown || [];
  const breakdownTotals = projectData?.breakdownTotals || {};

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white ">
      <div className="w-full p-6 mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Project ID: {project.id || "-"}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
            {project.location || ""}
            {project.location && project.phase ? " • " : ""}
            {project.phase || ""}
            {project.startDate ? " • Started " + project.startDate : ""}
            {project.estimatedCompletion ? " • Est Completion: " + project.estimatedCompletion : ""}
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
              <span className="text-xs text-emerald-400">
                {stats.totalInvested?.change != null
                  ? `${(stats.totalInvested.change * 100).toFixed(0)}%`
                  : ""}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Invested</p>
              <h3 className="text-lg sm:text-xl font-semibold">
                ${stats.totalInvested?.value ? (stats.totalInvested.value / 1000) + "K" : "-"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.totalInvested?.transactions || ""}
              </p>
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
              <h3 className="text-lg sm:text-xl font-semibold">
                ${stats.availableFunds?.value ? (stats.availableFunds.value / 1000) + "K" : "-"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.availableFunds?.remainingPercent
                  ? `${(stats.availableFunds.remainingPercent * 100).toFixed(1)}% remaining`
                  : ""}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#11161D] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-[#1A212B] rounded-lg text-yellow-400">
                <Clock size={20} />
              </div>
              <span className="text-xs text-yellow-400">
                {stats.progress?.status || ""}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Project Progress</p>
              <h3 className="text-lg sm:text-xl font-semibold">
                {stats.progress?.percent != null
                  ? `${(stats.progress.percent * 100).toFixed(0)}%`
                  : "-"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.progress?.remainingMonths != null
                  ? `Est. ${stats.progress.remainingMonths} months remaining`
                  : ""}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#11161D] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="p-2 bg-[#1A212B] rounded-lg text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <span className="text-xs text-emerald-400">
                {stats.projectedROI?.change != null
                  ? `${(stats.projectedROI.change * 100).toFixed(0)}%`
                  : ""}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Projected ROI</p>
              <h3 className="text-lg sm:text-xl font-semibold">
                {stats.projectedROI?.percent != null
                  ? `+${(stats.projectedROI.percent * 100).toFixed(0)}%`
                  : "-"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {project.estimatedCompletion
                  ? `Expected by ${project.estimatedCompletion.split(" ")[1]} ${project.estimatedCompletion.split(" ")[0]}`
                  : ""}
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

            {breakdown.map((item) => {
              const percent = breakdownTotals.utilized
                ? (item.amount / breakdownTotals.utilized) * 100
                : 0;
              return (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{item.name}</span>
                    <span>${(item.amount / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full`}
                      style={{ width: `${percent}%`, backgroundColor: item.name === "Construction" ? "#10B981" : item.name === "Materials" ? "#3B82F6" : "#FBBF24" }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="border-t border-gray-800 pt-4 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Total Utilized</span>
                <span className="text-white">
                  ${breakdownTotals.utilized ? (breakdownTotals.utilized / 1000).toFixed(1) + "K" : "-"}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Remaining Balance</span>
                <span className="text-white">
                  ${breakdownTotals.remaining ? (breakdownTotals.remaining / 1000).toFixed(1) + "K" : "-"}
                </span>
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

              {projectData?.recentActivity && projectData.recentActivity.length > 0 ? (
              projectData.recentActivity.map((act, idx) => (
                <div key={idx} className={idx < projectData.recentActivity.length - 1 ? "border-b border-gray-800 pb-3" : ""}>
                  <p className="font-medium">{act.title || act.description || ""}</p>
                  <p className="text-sm text-gray-400">
                    {act.details || act.subtitle || ""}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No recent activity added.</p>
            )}
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