"use client";

import { useState } from "react";
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

const menuItems = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Project Progress", href: "/progress", icon: ListChecks },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Withdraw", href: "/withdraw", icon: LogOut },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
   const pathname = usePathname();

  return (
     <aside className="w-64 min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">F3</h2>
            <p className="text-xs text-gray-400">Chitral Huts</p>
            <p className="text-xs text-gray-500">Real Estate</p>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-gray-400 hover:bg-zinc-900 hover:text-white"
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
