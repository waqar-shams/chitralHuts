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
    <main className="min-h-screen bg-[#0A0A0A] text-white px-4 sm:px-6 lg:px-8 py-6">
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
          <div className="lg:col-span-2 bg-[#121212] rounded-2xl p-4 sm:p-6">
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
          <div className="bg-[#121212] rounded-2xl p-4 sm:p-6 space-y-6">
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
          <div className="bg-[#121212] rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-lg  text-white font-semibold">
              Recent Activity
            </h2>
            <span className="text-xs font-normal text-[var(--color-gray-50)]">View all</span>
</div>

            <div className=" pb-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#1D262D]  flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_482)">
<path d="M11.3066 6.49414C10.5355 6.62539 9.71523 6.3957 9.11914 5.79961L8.07734 4.75781C7.66719 4.34766 7.4375 3.79531 7.4375 3.21563V2.88477L5.2582 1.69531C5.11328 1.61602 5.02305 1.46016 5.03125 1.29336C5.03945 1.12656 5.13789 0.978906 5.29102 0.910547L6.58164 0.336328C7.08477 0.114844 7.62891 0 8.18125 0H8.67617C9.67969 0 10.6449 0.382812 11.375 1.06914L12.5945 2.21758C13.2563 2.84102 13.5023 3.74063 13.3219 4.56914L13.7539 5.00391L13.9727 4.78516C14.2297 4.52812 14.6453 4.52812 14.8996 4.78516L15.5559 5.44141C15.8129 5.69844 15.8129 6.11406 15.5559 6.36836L13.1496 8.77461C12.8926 9.03164 12.477 9.03164 12.2227 8.77461L11.5664 8.11836C11.3094 7.86133 11.3094 7.4457 11.5664 7.19141L11.7852 6.97266L11.3066 6.49414ZM0.749219 10.3113L7.13398 4.99297C7.22969 5.12695 7.33906 5.25547 7.45664 5.37578L8.49844 6.41758C8.6625 6.58164 8.8375 6.72383 9.02344 6.84687L3.68867 13.2508C3.29219 13.7266 2.7043 14 2.08633 14C0.932422 14 0 13.0648 0 11.9137C0 11.2957 0.276172 10.7078 0.749219 10.3113Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_482">
<path d="M0 0H15.75V14H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
                </span>
              </div>
              <div>
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
             <div className=" pb-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#1D262D]  flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_482)">
<path d="M11.3066 6.49414C10.5355 6.62539 9.71523 6.3957 9.11914 5.79961L8.07734 4.75781C7.66719 4.34766 7.4375 3.79531 7.4375 3.21563V2.88477L5.2582 1.69531C5.11328 1.61602 5.02305 1.46016 5.03125 1.29336C5.03945 1.12656 5.13789 0.978906 5.29102 0.910547L6.58164 0.336328C7.08477 0.114844 7.62891 0 8.18125 0H8.67617C9.67969 0 10.6449 0.382812 11.375 1.06914L12.5945 2.21758C13.2563 2.84102 13.5023 3.74063 13.3219 4.56914L13.7539 5.00391L13.9727 4.78516C14.2297 4.52812 14.6453 4.52812 14.8996 4.78516L15.5559 5.44141C15.8129 5.69844 15.8129 6.11406 15.5559 6.36836L13.1496 8.77461C12.8926 9.03164 12.477 9.03164 12.2227 8.77461L11.5664 8.11836C11.3094 7.86133 11.3094 7.4457 11.5664 7.19141L11.7852 6.97266L11.3066 6.49414ZM0.749219 10.3113L7.13398 4.99297C7.22969 5.12695 7.33906 5.25547 7.45664 5.37578L8.49844 6.41758C8.6625 6.58164 8.8375 6.72383 9.02344 6.84687L3.68867 13.2508C3.29219 13.7266 2.7043 14 2.08633 14C0.932422 14 0 13.0648 0 11.9137C0 11.2957 0.276172 10.7078 0.749219 10.3113Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_482">
<path d="M0 0H15.75V14H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
                </span>
              </div>
              <div>
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
             <div className=" pb-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#1D262D]  flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_482)">
<path d="M11.3066 6.49414C10.5355 6.62539 9.71523 6.3957 9.11914 5.79961L8.07734 4.75781C7.66719 4.34766 7.4375 3.79531 7.4375 3.21563V2.88477L5.2582 1.69531C5.11328 1.61602 5.02305 1.46016 5.03125 1.29336C5.03945 1.12656 5.13789 0.978906 5.29102 0.910547L6.58164 0.336328C7.08477 0.114844 7.62891 0 8.18125 0H8.67617C9.67969 0 10.6449 0.382812 11.375 1.06914L12.5945 2.21758C13.2563 2.84102 13.5023 3.74063 13.3219 4.56914L13.7539 5.00391L13.9727 4.78516C14.2297 4.52812 14.6453 4.52812 14.8996 4.78516L15.5559 5.44141C15.8129 5.69844 15.8129 6.11406 15.5559 6.36836L13.1496 8.77461C12.8926 9.03164 12.477 9.03164 12.2227 8.77461L11.5664 8.11836C11.3094 7.86133 11.3094 7.4457 11.5664 7.19141L11.7852 6.97266L11.3066 6.49414ZM0.749219 10.3113L7.13398 4.99297C7.22969 5.12695 7.33906 5.25547 7.45664 5.37578L8.49844 6.41758C8.6625 6.58164 8.8375 6.72383 9.02344 6.84687L3.68867 13.2508C3.29219 13.7266 2.7043 14 2.08633 14C0.932422 14 0 13.0648 0 11.9137C0 11.2957 0.276172 10.7078 0.749219 10.3113Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_482">
<path d="M0 0H15.75V14H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
                </span>
              </div>
              <div>
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
           
          </div>

          {/* Milestones */}
         <div className="bg-[#121212] rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-lg  text-white font-semibold">
             Project Milestones
            </h2>
            <span className="text-xs font-normal text-[var(--color-gray-50)]">View all</span>
</div>

            <div className=" pb-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#1D262D]  flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_482)">
<path d="M11.3066 6.49414C10.5355 6.62539 9.71523 6.3957 9.11914 5.79961L8.07734 4.75781C7.66719 4.34766 7.4375 3.79531 7.4375 3.21563V2.88477L5.2582 1.69531C5.11328 1.61602 5.02305 1.46016 5.03125 1.29336C5.03945 1.12656 5.13789 0.978906 5.29102 0.910547L6.58164 0.336328C7.08477 0.114844 7.62891 0 8.18125 0H8.67617C9.67969 0 10.6449 0.382812 11.375 1.06914L12.5945 2.21758C13.2563 2.84102 13.5023 3.74063 13.3219 4.56914L13.7539 5.00391L13.9727 4.78516C14.2297 4.52812 14.6453 4.52812 14.8996 4.78516L15.5559 5.44141C15.8129 5.69844 15.8129 6.11406 15.5559 6.36836L13.1496 8.77461C12.8926 9.03164 12.477 9.03164 12.2227 8.77461L11.5664 8.11836C11.3094 7.86133 11.3094 7.4457 11.5664 7.19141L11.7852 6.97266L11.3066 6.49414ZM0.749219 10.3113L7.13398 4.99297C7.22969 5.12695 7.33906 5.25547 7.45664 5.37578L8.49844 6.41758C8.6625 6.58164 8.8375 6.72383 9.02344 6.84687L3.68867 13.2508C3.29219 13.7266 2.7043 14 2.08633 14C0.932422 14 0 13.0648 0 11.9137C0 11.2957 0.276172 10.7078 0.749219 10.3113Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_482">
<path d="M0 0H15.75V14H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
                </span>
              </div>
              <div>
              <p className="font-medium text-sm text-white">Phase 1: Land Acquisition</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
               Legal documentation, permits, and site surveys completed
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">Completed: Jan 2025</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">$ $45K spent</p>
              </div>
               </div>

            </div>
            <div className=" pb-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#1D262D]  flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_482)">
<path d="M11.3066 6.49414C10.5355 6.62539 9.71523 6.3957 9.11914 5.79961L8.07734 4.75781C7.66719 4.34766 7.4375 3.79531 7.4375 3.21563V2.88477L5.2582 1.69531C5.11328 1.61602 5.02305 1.46016 5.03125 1.29336C5.03945 1.12656 5.13789 0.978906 5.29102 0.910547L6.58164 0.336328C7.08477 0.114844 7.62891 0 8.18125 0H8.67617C9.67969 0 10.6449 0.382812 11.375 1.06914L12.5945 2.21758C13.2563 2.84102 13.5023 3.74063 13.3219 4.56914L13.7539 5.00391L13.9727 4.78516C14.2297 4.52812 14.6453 4.52812 14.8996 4.78516L15.5559 5.44141C15.8129 5.69844 15.8129 6.11406 15.5559 6.36836L13.1496 8.77461C12.8926 9.03164 12.477 9.03164 12.2227 8.77461L11.5664 8.11836C11.3094 7.86133 11.3094 7.4457 11.5664 7.19141L11.7852 6.97266L11.3066 6.49414ZM0.749219 10.3113L7.13398 4.99297C7.22969 5.12695 7.33906 5.25547 7.45664 5.37578L8.49844 6.41758C8.6625 6.58164 8.8375 6.72383 9.02344 6.84687L3.68867 13.2508C3.29219 13.7266 2.7043 14 2.08633 14C0.932422 14 0 13.0648 0 11.9137C0 11.2957 0.276172 10.7078 0.749219 10.3113Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_482">
<path d="M0 0H15.75V14H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
                </span>
              </div>
              <div>
              <p className="font-medium text-sm text-white">Phase 1: Land Acquisition</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
               Legal documentation, permits, and site surveys completed
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">Completed: Jan 2025</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">$ $45K spent</p>
              </div>
               </div>

            </div>
            <div className=" pb-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#1D262D]  flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_482)">
<path d="M11.3066 6.49414C10.5355 6.62539 9.71523 6.3957 9.11914 5.79961L8.07734 4.75781C7.66719 4.34766 7.4375 3.79531 7.4375 3.21563V2.88477L5.2582 1.69531C5.11328 1.61602 5.02305 1.46016 5.03125 1.29336C5.03945 1.12656 5.13789 0.978906 5.29102 0.910547L6.58164 0.336328C7.08477 0.114844 7.62891 0 8.18125 0H8.67617C9.67969 0 10.6449 0.382812 11.375 1.06914L12.5945 2.21758C13.2563 2.84102 13.5023 3.74063 13.3219 4.56914L13.7539 5.00391L13.9727 4.78516C14.2297 4.52812 14.6453 4.52812 14.8996 4.78516L15.5559 5.44141C15.8129 5.69844 15.8129 6.11406 15.5559 6.36836L13.1496 8.77461C12.8926 9.03164 12.477 9.03164 12.2227 8.77461L11.5664 8.11836C11.3094 7.86133 11.3094 7.4457 11.5664 7.19141L11.7852 6.97266L11.3066 6.49414ZM0.749219 10.3113L7.13398 4.99297C7.22969 5.12695 7.33906 5.25547 7.45664 5.37578L8.49844 6.41758C8.6625 6.58164 8.8375 6.72383 9.02344 6.84687L3.68867 13.2508C3.29219 13.7266 2.7043 14 2.08633 14C0.932422 14 0 13.0648 0 11.9137C0 11.2957 0.276172 10.7078 0.749219 10.3113Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_482">
<path d="M0 0H15.75V14H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
                </span>
              </div>
              <div>
              <p className="font-medium text-sm text-white">Phase 1: Land Acquisition</p>
              <p className="text-xs font-normal text-[var(--color-gray-50)] mt-2">
               Legal documentation, permits, and site surveys completed
              </p>
              <div className="flex mt-2">
              <p className="text-xs font-normal text-[var(--color-gray-100)]">Completed: Jan 2025</p>
              <p className="text-xs font-normal text-[var(--color-gray-100)] ml-4">$ $45K spent</p>
              </div>
               </div>

            </div>
           
          </div>
        </div>

      </div>
    </main>
  );
}