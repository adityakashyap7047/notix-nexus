"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { clsx } from "clsx";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: "◈" },
  { name: "Security", href: "/dashboard/security", icon: "⬡" },
  { name: "Moderation", href: "/dashboard/moderation", icon: "◈" },
  { name: "AI Center", href: "/dashboard/ai", icon: "◎" },
  { name: "Economy", href: "/dashboard/economy", icon: "◈" },
  { name: "Leveling", href: "/dashboard/leveling", icon: "◎" },
  { name: "Tickets", href: "/dashboard/tickets", icon: "⬡" },
  { name: "Analytics", href: "/dashboard/analytics", icon: "◈" },
  { name: "Automations", href: "/dashboard/automation", icon: "◎" },
  { name: "Fun & Social", href: "/dashboard/fun", icon: "🎮" },
  { name: "Settings", href: "/dashboard/settings", icon: "◈" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "h-screen bg-nexus-surface border-r border-nexus-border flex flex-col transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-nexus-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-sm font-bold text-nexus-bg">
            N
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-neon-cyan font-mono tracking-wider">NOTIXNEX</h1>
              <p className="text-[10px] text-gray-500 font-mono">DISCORD OS v2.0</p>
            </div>
          )}
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-1",
                isActive
                  ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                  : "text-gray-400 hover:text-white hover:bg-nexus-bg"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      {session?.user && !collapsed && (
        <div className="p-4 border-t border-nexus-border">
          <div className="flex items-center gap-3 mb-3">
            {(session.user as any).image && (
              <img
                src={(session.user as any).image}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-neon-cyan/30"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
              <p className="text-[10px] text-gray-500 font-mono">LOGGED IN</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full px-3 py-1.5 rounded-lg text-xs font-mono text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            SIGN OUT
          </button>
        </div>
      )}
      <div className="p-4 border-t border-nexus-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green" />
          {!collapsed && <span className="text-xs font-mono text-gray-500">SYSTEM ONLINE</span>}
        </div>
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-3 w-6 h-6 bg-nexus-card border border-nexus-border rounded-full flex items-center justify-center text-gray-500 hover:text-neon-cyan transition-colors z-10 text-xs"
      >
        {collapsed ? "\u2192" : "\u2190"}
      </button>
    </aside>
  );
}
