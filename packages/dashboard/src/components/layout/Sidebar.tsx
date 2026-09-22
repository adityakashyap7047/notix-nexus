"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useAuth } from "../AuthContext";

interface NavSection {
  title: string;
  items: { name: string; href: string; icon: string; color?: string }[];
}

const navSections: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: "◈", color: "text-neon-cyan" },
      { name: "Analytics", href: "/dashboard/analytics", icon: "◎", color: "text-neon-purple" },
      { name: "Members", href: "/dashboard/members", icon: "◇", color: "text-neon-blue" },
      { name: "Servers", href: "/dashboard/servers", icon: "⬡", color: "text-neon-green" },
    ],
  },
  {
    title: "PROTECTION",
    items: [
      { name: "Security", href: "/dashboard/security", icon: "⬡", color: "text-neon-red" },
      { name: "Moderation", href: "/dashboard/moderation", icon: "◈", color: "text-neon-orange" },
      { name: "Logs", href: "/dashboard/logs", icon: "◎", color: "text-neon-cyan" },
    ],
  },
  {
    title: "FEATURES",
    items: [
      { name: "AI Center", href: "/dashboard/ai", icon: "◎", color: "text-neon-cyan" },
      { name: "Economy", href: "/dashboard/economy", icon: "◈", color: "text-neon-yellow" },
      { name: "Leveling", href: "/dashboard/leveling", icon: "◎", color: "text-neon-green" },
      { name: "Fun & Social", href: "/dashboard/fun", icon: "◇", color: "text-neon-pink" },
      { name: "Tickets", href: "/dashboard/tickets", icon: "⬡", color: "text-neon-purple" },
      { name: "Giveaways", href: "/dashboard/giveaways", icon: "◈", color: "text-neon-green" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { name: "Automations", href: "/dashboard/automation", icon: "◎", color: "text-neon-cyan" },
      { name: "Webhooks", href: "/dashboard/webhooks", icon: "◇", color: "text-neon-blue" },
      { name: "Integrations", href: "/dashboard/integrations", icon: "⬡", color: "text-neon-purple" },
      { name: "Infrastructure", href: "/dashboard/infrastructure", icon: "◈", color: "text-neon-green" },
    ],
  },
  {
    title: "CONFIG",
    items: [
      { name: "Settings", href: "/dashboard/settings", icon: "◈", color: "text-gray-400" },
      { name: "Developer", href: "/dashboard/developer", icon: "◎", color: "text-neon-cyan" },
      { name: "Billing", href: "/dashboard/billing", icon: "◇", color: "text-neon-yellow" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, selectedGuild, setSelectedGuild, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [guildDropdownOpen, setGuildDropdownOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : null;

  return (
    <aside
      className={clsx(
        "h-screen bg-nexus-surface border-r border-nexus-border flex flex-col transition-all duration-300 relative flex-shrink-0",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Server Selector */}
      <div className="p-3 border-b border-nexus-border">
        {!collapsed ? (
          <div className="relative">
            <button
              onClick={() => setGuildDropdownOpen(!guildDropdownOpen)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-nexus-bg transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-sm font-bold text-nexus-bg flex-shrink-0">
                {selectedGuild?.icon || "N"}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {selectedGuild?.name || "Select Server"}
                </p>
                <p className="text-[10px] text-gray-500 font-mono">
                  {selectedGuild?.memberCount?.toLocaleString() || 0} members
                </p>
              </div>
              <svg
                className={clsx("w-4 h-4 text-gray-500 transition-transform flex-shrink-0", guildDropdownOpen && "rotate-180")}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {guildDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-nexus-card border border-nexus-border rounded-lg shadow-2xl z-50 py-1 max-h-64 overflow-y-auto">
                {user?.guilds.map((guild) => (
                  <button
                    key={guild.id}
                    onClick={() => {
                      setSelectedGuild(guild);
                      setGuildDropdownOpen(false);
                    }}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2 hover:bg-nexus-bg transition-colors",
                      selectedGuild?.id === guild.id && "bg-neon-cyan/5"
                    )}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: selectedGuild?.id === guild.id ? "linear-gradient(135deg, #00F5FF, #8B5CF6)" : "#1a1f35",
                        color: selectedGuild?.id === guild.id ? "#05070D" : "#E2E8F0",
                      }}
                    >
                      {guild.icon}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs font-medium text-white truncate">{guild.name}</p>
                      <p className="text-[10px] text-gray-500">{guild.memberCount.toLocaleString()}</p>
                    </div>
                    {selectedGuild?.id === guild.id && (
                      <div className="w-2 h-2 rounded-full bg-neon-cyan ml-auto flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-sm font-bold text-nexus-bg">
              {selectedGuild?.icon || "N"}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navSections.map((section) => (
          <div key={section.title} className="mb-2">
            {!collapsed && (
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-3 py-1.5 mb-0.5"
              >
                <span className="text-[10px] font-mono text-gray-600 tracking-widest">{section.title}</span>
                <svg
                  className={clsx("w-3 h-3 text-gray-600 transition-transform", collapsedSections[section.title] && "-rotate-90")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
            {!collapsedSections[section.title] &&
              section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-0.5 group relative",
                      isActive
                        ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                        : "text-gray-400 hover:text-white hover:bg-nexus-bg border border-transparent"
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-neon-cyan" />
                    )}
                    <span className={clsx("text-sm", isActive ? "text-neon-cyan" : item.color || "text-gray-500")}>
                      {item.icon}
                    </span>
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      {/* User panel */}
      <div className="p-3 border-t border-nexus-border">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-xs font-bold text-white flex-shrink-0 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.username?.[0]?.toUpperCase() || "?"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.username || "User"}</p>
              <p className="text-[10px] text-gray-500 font-mono">ADMIN</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-neon-red/10 text-gray-500 hover:text-neon-red transition-colors flex-shrink-0"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-xs font-bold text-white overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.username?.[0]?.toUpperCase() || "?"
              )}
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-neon-red/10 text-gray-500 hover:text-neon-red transition-colors"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-3 -right-3 w-6 h-6 bg-nexus-card border border-nexus-border rounded-full flex items-center justify-center text-gray-500 hover:text-neon-cyan transition-colors z-10 text-xs"
      >
        {collapsed ? "→" : "←"}
      </button>
    </aside>
  );
}
