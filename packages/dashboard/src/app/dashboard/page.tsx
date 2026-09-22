"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthContext";

const liveStats = [
  { label: "COMMANDS USED", value: "8,293", change: "+127 today", color: "text-neon-cyan", icon: "⚡" },
  { label: "TOTAL MEMBERS", value: "24,891", change: "+142 today", color: "text-neon-green", icon: "◎" },
  { label: "MESSAGES TODAY", value: "12,847", change: "+2,391 hr", color: "text-neon-purple", icon: "◇" },
  { label: "ACTIVE NOW", value: "3,291", change: "25.6%", color: "text-neon-blue", icon: "◈" },
];

const systemHealth = [
  { name: "BOT STATUS", value: "ONLINE", status: "online", detail: "Uptime: 72d 14h" },
  { name: "GATEWAY", value: "31ms", status: "online", detail: "v10 • Shard #1-8" },
  { name: "DATABASE", value: "12ms", status: "online", detail: "MongoDB 7.0" },
  { name: "API", value: "38ms", status: "online", detail: "1,247 req/s" },
];

interface Module {
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
  color: string;
}

const initialModules: Module[] = [
  { name: "Security Core", description: "Anti-raid, scam detection, link reputation", enabled: true, icon: "🛡️", color: "neon-red" },
  { name: "Moderation", description: "AutoMod, warnings, bans, timeouts", enabled: true, icon: "🔨", color: "neon-orange" },
  { name: "Economy", description: "Currency system, daily rewards, shop", enabled: true, icon: "💰", color: "neon-yellow" },
  { name: "Leveling", description: "XP system, level roles, leaderboard", enabled: true, icon: "📈", color: "neon-green" },
  { name: "Fun & Games", description: "8ball, RPS, slots, coinflip", enabled: true, icon: "🎮", color: "neon-pink" },
  { name: "Tickets", description: "Support ticket management", enabled: true, icon: "🎫", color: "neon-purple" },
  { name: "AI Characters", description: "8 AI personas for different tasks", enabled: true, icon: "🤖", color: "neon-cyan" },
  { name: "Welcome System", description: "Join/leave messages + auto-role", enabled: true, icon: "👋", color: "neon-green" },
  { name: "Giveaways", description: "Create & manage giveaways", enabled: false, icon: "🎁", color: "neon-green" },
  { name: "Reaction Roles", description: "Self-assignable roles via reactions", enabled: true, icon: "🎭", color: "neon-purple" },
  { name: "Custom Commands", description: "Server-specific command creation", enabled: true, icon: "⚙️", color: "neon-blue" },
  { name: "Logging", description: "Message, member, and mod logs", enabled: true, icon: "📋", color: "neon-cyan" },
];

const recentActivity = [
  { type: "SECURITY", event: "Scam link blocked in #general", user: "SYSTEM", time: "2m ago", color: "bg-neon-red" },
  { type: "MOD", event: "ToxicUser#1234 warned for spam", user: "AdminBot", time: "5m ago", color: "bg-neon-orange" },
  { type: "JOIN", event: "CyberNinja#7742 joined the server", user: "", time: "8m ago", color: "bg-neon-green" },
  { type: "TICKET", event: "Ticket #4521 opened by PlayerOne", user: "", time: "12m ago", color: "bg-neon-purple" },
  { type: "ECONOMY", event: "CryptoKing#5567 won 5000 coins at slots", user: "", time: "15m ago", color: "bg-neon-yellow" },
  { type: "LEVEL", event: "NightHawk#8876 reached Level 42", user: "", time: "18m ago", color: "bg-neon-green" },
  { type: "AI", event: "NOVA answered a question in #ai-chat", user: "", time: "22m ago", color: "bg-neon-cyan" },
  { type: "SECURITY", event: "Rate limit triggered for suspicious IP", user: "SYSTEM", time: "30m ago", color: "bg-neon-red" },
];

const quickActions = [
  { label: "SEND ANNOUNCEMENT", icon: "📢", color: "border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan" },
  { label: "START GIVEAWAY", icon: "🎁", color: "border-neon-green/30 bg-neon-green/5 text-neon-green" },
  { label: "TOGGLE LOCKDOWN", icon: "🔒", color: "border-neon-red/30 bg-neon-red/5 text-neon-red" },
  { label: "CLEAR WARNINGS", icon: "🧹", color: "border-neon-yellow/30 bg-neon-yellow/5 text-neon-yellow" },
];

export default function DashboardOverview() {
  const { selectedGuild } = useAuth();
  const [modules, setModules] = useState(initialModules);

  const toggleModule = (index: number) => {
    setModules((prev) =>
      prev.map((m, i) => (i === index ? { ...m, enabled: !m.enabled } : m))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">
            COMMAND CENTER
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">
            {selectedGuild?.name || "NEXUS HQ"} • System Overview
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-nexus-surface border border-nexus-border rounded-lg">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-[10px] font-mono text-gray-500">ALL SYSTEMS ONLINE</span>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {liveStats.map((stat) => (
          <div key={stat.label} className="nexus-card p-4 hover-lift">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-lg ${stat.color}`}>{stat.icon}</span>
              <div className="status-dot online" />
            </div>
            <p className="text-[10px] text-gray-500 font-mono tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold text-white font-mono mt-1">{stat.value}</p>
            <p className="text-xs text-neon-green font-mono mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* System Health */}
      <div className="nexus-card p-5">
        <h2 className="text-sm font-bold text-neon-cyan font-mono tracking-wider mb-4">
          SYSTEM HEALTH
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {systemHealth.map((sys) => (
            <div key={sys.name} className="p-3 rounded-lg bg-nexus-bg border border-nexus-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-gray-500 tracking-wider">{sys.name}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                </div>
              </div>
              <p className="text-lg font-bold font-mono text-neon-green">{sys.value}</p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">{sys.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className={`p-4 rounded-lg border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${action.color}`}
          >
            <span className="text-xl mb-2 block">{action.icon}</span>
            <span className="text-[10px] font-mono font-bold tracking-wider">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Module Toggles */}
        <div className="lg:col-span-3 nexus-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neon-cyan font-mono tracking-wider">
              MODULE CONTROL
            </h2>
            <span className="text-[10px] font-mono text-gray-500">
              {modules.filter((m) => m.enabled).length}/{modules.length} ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {modules.map((mod, i) => (
              <div
                key={mod.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-nexus-bg border border-nexus-border hover:border-nexus-border/80 transition-colors"
              >
                <span className="text-lg flex-shrink-0">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-white truncate">{mod.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{mod.description}</p>
                </div>
                <button
                  onClick={() => toggleModule(i)}
                  className={`toggle ${mod.enabled ? "active" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 nexus-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neon-purple font-mono tracking-wider">
              LIVE ACTIVITY
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-mono text-gray-500">LIVE</span>
            </div>
          </div>
          <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
            {recentActivity.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-nexus-bg/50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${event.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-gray-400 px-1.5 py-0.5 rounded bg-nexus-bg border border-nexus-border">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 truncate">{event.event}</p>
                </div>
                <span className="text-[10px] font-mono text-gray-600 flex-shrink-0 mt-0.5">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
