"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileText,
  Calculator,
  Briefcase,
  Scale,
} from "lucide-react";

const navItems = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/registration", label: "등기 정보 조회", icon: Search },
  { href: "/forms", label: "서식 관리", icon: FileText },
  { href: "/calculator", label: "비용 계산기", icon: Calculator },
  { href: "/cases", label: "사건 관리", icon: Briefcase },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-white flex flex-col z-50">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">법무 관리</h1>
            <p className="text-xs text-slate-400">업무 통합 시스템</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-active text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-300 hover:bg-sidebar-hover hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="px-4 py-3 bg-sidebar-hover rounded-lg">
          <p className="text-xs text-slate-400">데모 버전</p>
          <p className="text-sm font-medium text-slate-200">v1.0.0 Prototype</p>
        </div>
      </div>
    </aside>
  );
}
