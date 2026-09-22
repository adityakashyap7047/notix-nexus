"use client";

import { useState } from "react";
import { Server, Shield, Users, Bot, ChevronDown, ChevronUp, Globe } from "lucide-react";
import clsx from "clsx";

const servers = [
  { id: 1, name: "NEXUS HQ", members: 24891, bots: 12, security: "max", status: "online", color: "#00F5FF", icon: "N" },
  { id: 2, name: "Cyber Lounge", members: 18234, bots: 8, security: "high", status: "online", color: "#8B5CF6", icon: "C" },
  { id: 3, name: "Dev Nexus", members: 15892, bots: 15, security: "max", status: "online", color: "#3B82F6", icon: "D" },
  { id: 4, name: "Gaming Zone", members: 12453, bots: 6, security: "medium", status: "online", color: "#00FF9C", icon: "G" },
  { id: 5, name: "Art Studio", members: 9847, bots: 4, security: "high", status: "idle", color: "#FF3B5C", icon: "A" },
  { id: 6, name: "Music Hub", members: 8234, bots: 5, security: "medium", status: "online", color: "#FFD700", icon: "M" },
  { id: 7, name: "Code Academy", members: 7621, bots: 9, security: "high", status: "online", color: "#FF8C42", icon: "C" },
  { id: 8, name: "Crypto Nexus", members: 6198, bots: 7, security: "max", status: "idle", color: "#FF69B4", icon: "X" },
  { id: 9, name: "Study Group", members: 5432, bots: 3, security: "low", status: "online", color: "#00F5FF", icon: "S" },
  { id: 10, name: "Anime Realm", members: 4891, bots: 4, security: "medium", status: "online", color: "#8B5CF6", icon: "A" },
];

const securityColors: Record<string, string> = {
  max: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30",
  high: "text-neon-green bg-neon-green/10 border-neon-green/30",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  low: "text-gray-400 bg-gray-400/10 border-gray-400/30",
};

export default function ServersPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">SERVER MANAGEMENT</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">Monitor and manage all connected servers</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-nexus-surface border border-nexus-border rounded-lg">
          <Server className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs font-mono text-gray-500">{servers.length} SERVERS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => (
          <div
            key={server.id}
            className={clsx(
              "nexus-card p-5 cursor-pointer transition-all duration-300",
              expandedId === server.id ? "ring-1 ring-neon-cyan/40" : ""
            )}
            onClick={() => setExpandedId(expandedId === server.id ? null : server.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-mono"
                  style={{ backgroundColor: `${server.color}20`, border: `1px solid ${server.color}40`, color: server.color }}
                >
                  {server.icon}
                </div>
                <div>
                  <h3 className="font-mono font-bold text-white text-sm">{server.name}</h3>
                  <p className="text-xs text-gray-500">{server.members.toLocaleString()} members</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={clsx("w-2 h-2 rounded-full", server.status === "online" ? "bg-neon-green" : "bg-yellow-500")} />
                {expandedId === server.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={clsx("text-[10px] font-mono px-2 py-0.5 rounded border", securityColors[server.security])}>
                {server.security.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{server.members.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bot className="w-3 h-3" />
                <span>{server.bots} bots</span>
              </div>
            </div>

            {expandedId === server.id && (
              <div className="mt-4 pt-4 border-t border-nexus-border space-y-3 animate-slide-in">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-nexus-bg border border-nexus-border">
                    <p className="text-[10px] text-gray-500 font-mono mb-1">CHANNELS</p>
                    <p className="text-sm font-mono text-white">47</p>
                  </div>
                  <div className="p-3 rounded-lg bg-nexus-bg border border-nexus-border">
                    <p className="text-[10px] text-gray-500 font-mono mb-1">ROLES</p>
                    <p className="text-sm font-mono text-white">23</p>
                  </div>
                  <div className="p-3 rounded-lg bg-nexus-bg border border-nexus-border">
                    <p className="text-[10px] text-gray-500 font-mono mb-1">BOOSTS</p>
                    <p className="text-sm font-mono text-neon-purple">14</p>
                  </div>
                  <div className="p-3 rounded-lg bg-nexus-bg border border-nexus-border">
                    <p className="text-[10px] text-gray-500 font-mono mb-1">UPTIME</p>
                    <p className="text-sm font-mono text-neon-green">99.9%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Globe className="w-3 h-3" />
                  <span className="font-mono">Region: Global</span>
                  <span className="mx-1">·</span>
                  <Shield className="w-3 h-3" />
                  <span className="font-mono">Verification: High</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
