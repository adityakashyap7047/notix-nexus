"use client";

import { useState } from "react";
import { Users, UserPlus, Activity, Bot } from "lucide-react";
import clsx from "clsx";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

const growthData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  members: Math.floor(12000 + Math.random() * 1000 + i * 30),
  bots: Math.floor(80 + Math.random() * 20),
}));

const activeUsers = [
  { rank: 1, name: "CyberNinja#0001", messages: 14892, voice: "142h" },
  { rank: 2, name: "DevMaster#3371", messages: 12453, voice: "98h" },
  { rank: 3, name: "Quantum#8842", messages: 11234, voice: "124h" },
  { rank: 4, name: "NeonRunner#5567", messages: 9876, voice: "87h" },
  { rank: 5, name: "ByteKnight#2291", messages: 8432, voice: "76h" },
  { rank: 6, name: "PixelWitch#4418", messages: 7891, voice: "112h" },
  { rank: 7, name: "CodePhantom#7723", messages: 7234, voice: "65h" },
  { rank: 8, name: "SynthWave#1156", messages: 6789, voice: "54h" },
];

const roleData = [
  { role: "Admin", count: 12, color: "#FF3B5C" },
  { role: "Moderator", count: 34, color: "#FFD700" },
  { role: "Member", count: 8921, color: "#00F5FF" },
  { role: "Bot", count: 89, color: "#8B5CF6" },
  { role: "Guest", count: 3800, color: "#3B82F6" },
];

const stats = [
  { label: "Total Members", value: "12,847", change: "+142 today", icon: Users, color: "text-neon-cyan" },
  { label: "New Today", value: "142", change: "+23% avg", icon: UserPlus, color: "text-neon-green" },
  { label: "Active Now", value: "3,291", change: "25.6%", icon: Activity, color: "text-neon-purple" },
  { label: "Bots", value: "89", change: "12 online", icon: Bot, color: "text-neon-blue" },
];

export default function MembersPage() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">MEMBER ANALYTICS</h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">Deep insights into server membership and activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="nexus-card p-4 group">
              <div className="flex items-start justify-between mb-3">
                <Icon className={clsx("w-5 h-5", stat.color)} />
                <div className="status-dot online" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-mono tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-white font-mono">{stat.value}</p>
                <p className="text-xs text-neon-green font-mono">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 nexus-card p-4">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">MEMBER GROWTH (30 DAYS)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1f35" />
                <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <YAxis stroke="#475569" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0D111C", border: "1px solid #1a1f35", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }}
                  labelStyle={{ color: "#00F5FF" }}
                />
                <Line type="monotone" dataKey="members" stroke="#00F5FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bots" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="nexus-card p-4">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">ROLE DISTRIBUTION</h3>
          <div className="space-y-3">
            {roleData.map((role, i) => (
              <div key={role.role}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-gray-400">{role.role}</span>
                  <span className="text-xs font-mono" style={{ color: role.color }}>{role.count.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-nexus-bg rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(role.count / roleData[0].count) * 100}%`,
                      backgroundColor: role.color,
                      opacity: hoveredBar === i ? 1 : 0.7,
                    }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="nexus-card p-4">
        <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">MOST ACTIVE USERS</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-nexus-border">
                <th className="text-left text-[10px] font-mono text-gray-500 uppercase tracking-wider pb-3">Rank</th>
                <th className="text-left text-[10px] font-mono text-gray-500 uppercase tracking-wider pb-3">User</th>
                <th className="text-left text-[10px] font-mono text-gray-500 uppercase tracking-wider pb-3">Messages</th>
                <th className="text-left text-[10px] font-mono text-gray-500 uppercase tracking-wider pb-3">Voice Time</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map((user) => (
                <tr key={user.rank} className="border-b border-nexus-border/50 hover:bg-nexus-bg transition-colors">
                  <td className="py-3 pr-4">
                    <span className={clsx(
                      "text-xs font-mono font-bold",
                      user.rank === 1 ? "text-yellow-400" : user.rank === 2 ? "text-gray-300" : user.rank === 3 ? "text-orange-400" : "text-gray-500"
                    )}>
                      #{user.rank}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm font-mono text-white">{user.name}</td>
                  <td className="py-3 pr-4 text-sm font-mono text-neon-cyan">{user.messages.toLocaleString()}</td>
                  <td className="py-3 text-sm font-mono text-neon-purple">{user.voice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
