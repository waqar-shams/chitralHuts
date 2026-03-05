"use client";

export default function StatsCard({
  icon,
  percentage,
  title,
  amount,
  transactions,
}) {
  return (
    <div className="bg-[#121212] rounded-2xl h-[208px] p-5 space-y-3">
      <div className="flex justify-between items-center">
        <div className="p-2 bg-[#1E1E1E] rounded-lg ">
          {icon}
        </div>

        <span className="text-xs font-normal text-[var(--color-primary)]">
          {percentage}
        </span>
      </div>

      <div>
        <p className="text-[var(--color-gray-100)] text-sm font-normal mt-3">
          {title}
        </p>

        <h3 className="text-3xl font-bold text-white mt-4">
          {amount}
        </h3>

        <p className="text-xs font-normal text-[var(--color-gray-50)] mt-3">
          {transactions}
        </p>
      </div>
    </div>
  );
}