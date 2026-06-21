"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tests", href: "/tests", icon: ClipboardList },
  { label: "Materials", href: "/materials", icon: BookOpen },
  { label: "Progress", href: "/progress", icon: BarChart3 },
  { label: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 border-r bg-zinc-50 min-h-screen px-4 py-6 gap-6">
      <Link href="/">
        <Logo />
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              )}
              style={active ? { background: "linear-gradient(90deg, #9B99FE, #2BC8B7)" } : {}}
            >
              <item.icon className="size-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all">
        <LogOut className="size-4" />
        Sign Out
      </button>
    </aside>
  );
}
