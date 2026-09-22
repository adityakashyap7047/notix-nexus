"use client";
import { useState, useEffect } from "react";
import StatusCard from "../ui/StatusCard";
import Terminal from "../ui/Terminal";
import ActivityFeed from "../ui/ActivityFeed";
import CharacterStatus from "../characters/CharacterStatus";

const terminalLines = [
  "> INITIALIZING NEXUS_CORE...",
  "> CONNECTING DISCORD_GATEWAY...",
  "> AUTHENTICATING USER...",
  "> LOADING SERVER_DATA...",
  "> SECURITY CHECK PASSED",
  "> ALL SYSTEMS OPERATIONAL",
  "> SYSTEM READY_",
];

const stats = [
  { label: "Total Servers", value: "1,247", change: "+12", status: "online" as const, icon: "?" },
  { label: "Total Members", value: "847,392", change: "+1,847", status: "online" as const, icon: "?" },
  { label: "Uptime", value: "99.97%", change: "72d 14h", status: "online" as const, icon: "?" },
  { label: "Security", value: "NOMINAL", change: "0 threats", status: "online" as const, icon: "?" },
  { label: "Moderation", value: "ACTIVE", change: "24h: 47", status: "online" as const, icon: "?" },
  { label: "AI Core", value: "ONLINE", change: "NOVA ready", status: "online" as const, icon: "?" },
  { label: "Database", value: "CONNECTED", change: "12ms", status: "online" as const, icon: "?" },
  { label: "API", value: "HEALTHY", change: "38ms", status: "online" as const, icon: "?" },
];

export default function CommandCenter() {
  const [terminalIdx, setTerminalIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => { setTerminalIdx((prev) => (prev < terminalLines.length - 1 ? prev + 1 : prev)); }, 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400 font-mono tracking-wider">COMMAND CENTER</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">NOTIX NEXUS v1.0 // Discord Intelligence Platform</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1423] border border-[#1E293B] rounded-lg">
          <div className="status-dot online" />
          <span className="text-xs font-mono text-gray-500">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>
      <Terminal title="NEXUS TERMINAL" lines={terminalLines.slice(0, terminalIdx + 1)} prompt="nexus@core:~$" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (<StatusCard key={stat.label} {...stat} />))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 nexus-card p-4">
          <h3 className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">LIVE ACTIVITY</h3>
          <ActivityFeed />
        </div>
        <div className="nexus-card p-4">
          <h3 className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">AI CHARACTERS</h3>
          <CharacterStatus />
        </div>
      </div>
    </div>
  );
}
