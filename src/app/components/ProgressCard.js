"use client";

export default function ProgressCard({
  icon,
  percentage,
  title,
  amount,
  transactions,
}) {
  return (
    <div className="bg-[#11161D] rounded-2xl h-[208px] p-5 space-y-3">
      {/* <div className="flex justify-between items-center">
        <div className="p-2 bg-[#1A212B] rounded-lg text-emerald-400">
          {icon}
        </div>

        <span className="text-xs font-normal text-[var(--color-primary)]">
          {percentage}
        </span>
      </div> */}

      <div>
        <p className="text-[var(--color-gray-50)] text-sm font-medium mt-3">
          {title}
        </p>
<div className="flex mt-4">
        <h3 className="text-2xl font-bold text-white ">
          {amount}
        </h3>
         <span className="text-sm font-medium  text-[var(--color-primary)] mt-2 ml-4">
          {percentage}
        </span>
</div>
        {/* <p className="text-xs font-normal text-[var(--color-gray-50)] mt-3">
          {transactions}
        </p> */}
      </div>
    </div>
  );
}