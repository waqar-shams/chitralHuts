"use client";

import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  ListChecks,
  FileText,
  LogOut,
  ChevronDown,
} from "lucide-react";

const baseItems = [
  { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { name: "Transactions", href: "/admin/transactions", icon: ArrowLeftRight },
  { name: "Project", href: "/admin/project", icon: ListChecks },
  { name: "Documents", href: "/admin/documents", icon: FileText },
  { name: "Withdraw", href: "/admin/withdraw", icon: LogOut },
];

const adminItem = { name: "Admin", href: "/admin", icon: ChevronDown };

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [...baseItems];
  if (user?.role === "admin") {
    menuItems.push(adminItem);
  }

  return (
     <aside className="w-64 min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_2314)">
<path d="M0 0.0996475C1.79423 0.0996475 3.46652 0.0996475 5.31737 0.0996475C5.31737 2.39155 5.31737 4.64446 5.31737 7.088C7.03756 7.088 8.58356 7.088 10.2471 7.088C10.2471 8.21879 10.2471 9.15895 10.2471 10.3027C8.6663 10.3027 7.1203 10.3027 5.38704 10.3027C5.38704 12.261 5.38704 14.02 5.38704 15.87C3.49701 15.87 1.78987 15.87 0 15.87C0 10.6277 0 5.45464 0 0.0996475Z" fill="white"/>
<path d="M26.3732 6.50745C26.3732 4.23287 26.3732 2.24425 26.3732 0.281613C28.3155 -0.138642 30.6541 1.01381 31.6514 3.09342C32.0347 3.89927 32.0651 5.06038 31.8038 5.92255C31.5643 6.70674 30.7108 7.30896 30.0357 8.10181C32.1871 9.04197 32.2132 10.918 31.7734 12.7419C31.3988 14.306 28.3417 16.0043 26.4516 15.883C26.4516 13.7731 26.4516 11.6415 26.4516 9.32792C25.1669 9.32792 24.0564 9.32792 22.7979 9.32792C22.7979 8.3271 22.7979 7.50826 22.7979 6.50311C23.9214 6.50745 25.0363 6.50745 26.3732 6.50745Z" fill="white"/>
<path d="M25.5114 0.00866457C25.5114 1.2391 25.5114 2.19226 25.5114 3.34037C24.2136 3.34037 22.9942 3.34037 21.6791 3.34037C21.5832 4.19388 21.5092 4.86975 21.4221 5.65827C19.7411 5.65827 18.0862 5.65827 16.3269 5.65827C15.9915 4.36718 16.1614 3.37937 17.0498 2.16626C19.3448 -0.96182 22.4847 0.316274 25.5114 0.00866457Z" fill="white"/>
<path d="M9.13662 5.20336C9.07565 4.51882 9.02774 3.99025 8.97113 3.34471C8.08272 3.28405 7.24222 3.22773 6.27979 3.16274C6.27979 2.17059 6.27979 1.23044 6.27979 0.160305C8.94064 0.160305 11.6189 0.160305 14.393 0.160305C14.393 1.83266 14.393 3.47902 14.393 5.20336C12.6162 5.20336 10.9526 5.20336 9.13662 5.20336Z" fill="white"/>
<path d="M25.4938 15.9567C23.5297 15.9567 21.6353 16.0693 19.7627 15.9263C17.9816 15.792 15.9826 12.534 16.3093 10.4717C16.5444 10.437 16.8014 10.3677 17.0627 10.3677C18.4693 10.3547 19.8716 10.3634 21.3871 10.3634C21.4699 11.0783 21.5439 11.6978 21.6441 12.5297C22.8721 12.586 24.1351 12.6423 25.4938 12.703C25.4938 13.7991 25.4938 14.7956 25.4938 15.9567Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_2314">
<rect width="32" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
<div>

            <p className="text-sm font-semibold text-white">Chitral Huts</p>
            <p className="text-xs font-normal text-[#6B7280]">Real Estate</p>
            </div>
          </div>
          <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium  transition-all
                ${
                  isActive
                    ? "bg-[#0D0D0D] text-white"
                    : "text-[#9CA3AF] hover:bg-zinc-900 hover:text-white"
                }
              `}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
