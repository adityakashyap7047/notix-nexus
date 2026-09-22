"use client";
import { clsx } from "clsx";

interface Shard {
  id: number;
  status: "online" | "reconnecting" | "offline";
  latency: number;
  guilds: number;
  uptime: string;
}

const shards: Shard[] = [
  { id: 1, status: "online", latency: 31, guilds: 156, uptime: "72d 14h" },
  { id: 2, status: "online", latency: 44, guilds: 162, uptime: "72d 14h" },
  { id: 3, status: "online", latency: 28, guilds: 148, uptime: "72d 14h" },
  { id: 4, status: "online", latency: 35, guilds: 155, uptime: "72d 14h" },
  { id: 5, status: "online", latency: 52, guilds: 161, uptime: "72d 14h" },
  { id: 6, status: "online", latency: 39, guilds: 157, uptime: "72d 14h" },
  { id: 7, status: "online", latency: 22, guilds: 154, uptime: "72d 14h" },
  { id: 8, status: "online", latency: 41, guilds: 154, uptime: "72d 14h" },
];

const healthCards = [
  { name: "GATEWAY", status: "OPERATIONAL", latency: "31ms", uptime: "99.97%", color: "neon-green" },
  { name: "DATABASE", status: "OPERATIONAL", latency: "12ms", uptime: "99.99%", color: "neon-green" },
  { name: "API", status: "OPERATIONAL", latency: "38ms", uptime: "99.95%", color: "neon-green" },
  { name: "CDN", status: "OPERATIONAL", latency: "8ms", uptime: "100%", color: "neon-green" },
];

export default function InfrastructurePage() {
  const totalGuilds = shards.reduce((a, s) => a + s.guilds, 0);
  const avgLatency = Math.round(shards.reduce((a, s) => a + s.latency, 0) / shards.length);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">SHARD MONITOR</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">INFRASTRUCTURE STATUS // REAL-TIME MONITORING</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-mono text-gray-500">UPTIME</p>
            <p className="text-sm font-mono text-neon-green font-bold">72d 14h 23m</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "TOTAL SHARDS", value: String(shards.length), color: "text-neon-cyan" },
          { label: "ONLINE", value: String(shards.filter((s) => s.status === "online").length), color: "text-neon-green" },
          { label: "AVG LATENCY", value: `${avgLatency}ms`, color: "text-white" },
          { label: "TOTAL GUILDS", value: totalGuilds.toLocaleString(), color: "text-neon-cyan" },
        ].map((stat) => (
          <div key={stat.label} className="nexus-card p-4 text-center">
            <p className="text-[10px] font-mono text-gray-500 tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold font-mono ${stat.color} mt-1`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-mono text-neon-cyan mb-3 tracking-wider">SHARD CLUSTER</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shards.map((shard) => (
            <div key={shard.id} className={clsx("nexus-card p-4 transition-all duration-300", shard.status === "online" ? "border-neon-green/20 hover:border-neon-green/40" : shard.status === "reconnecting" ? "border-yellow-500/20" : "border-neon-red/20")}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-gray-500">SHARD #{String(shard.id).padStart(3, "0")}</span>
                <div className="flex items-center gap-2">
                  <div className={clsx("w-2 h-2 rounded-full", shard.status === "online" ? "bg-neon-green" : shard.status === "reconnecting" ? "bg-yellow-500 animate-pulse" : "bg-neon-red")} />
                  <span className={clsx("text-[10px] font-mono", shard.status === "online" ? "text-neon-green" : shard.status === "reconnecting" ? "text-yellow-500" : "text-neon-red")}>
                    {shard.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-gray-500">LATENCY</span>
                  <span className={clsx("text-sm font-mono font-bold", shard.latency < 40 ? "text-neon-green" : shard.latency < 60 ? "text-yellow-500" : "text-neon-red")}>
                    {shard.latency}ms
                  </span>
                </div>
                <div className="w-full h-1.5 bg-nexus-bg rounded-full overflow-hidden">
                  <div
                    className={clsx("h-full rounded-full transition-all", shard.latency < 40 ? "bg-neon-green" : shard.latency < 60 ? "bg-yellow-500" : "bg-neon-red")}
                    style={{ width: `${Math.min(100, shard.latency)}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-mono text-gray-500">GUILDS</span>
                  <span className="text-[10px] font-mono text-gray-400">{shard.guilds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-mono text-gray-500">UPTIME</span>
                  <span className="text-[10px] font-mono text-gray-400">{shard.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono text-neon-cyan mb-3 tracking-wider">SYSTEM HEALTH</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthCards.map((card) => (
            <div key={card.name} className="nexus-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-gray-500 tracking-wider">{card.name}</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full bg-${card.color}`} />
                  <span className={`text-[10px] font-mono text-${card.color}`}>ONLINE</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[10px] font-mono text-gray-500">STATUS</span>
                  <span className={`text-xs font-mono text-${card.color}`}>{card.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-mono text-gray-500">LATENCY</span>
                  <span className="text-xs font-mono text-white">{card.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-mono text-gray-500">UPTIME</span>
                  <span className="text-xs font-mono text-white">{card.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="nexus-card p-6">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">NETWORK STATS</h3>
          <div className="space-y-3">
            {[
              { label: "Total Servers", value: totalGuilds.toLocaleString() },
              { label: "Total Members", value: "847,392" },
              { label: "Messages / sec", value: "1,247" },
              { label: "Events / sec", value: "3,891" },
              { label: "API Requests / min", value: "12,456" },
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between items-center py-2 border-b border-nexus-border/50">
                <span className="text-xs font-mono text-gray-500">{stat.label}</span>
                <span className="text-sm font-mono text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="nexus-card p-6">
          <h3 className="text-sm font-mono text-neon-cyan mb-4 tracking-wider">RESOURCE USAGE</h3>
          <div className="space-y-4">
            {[
              { label: "CPU", value: 12, color: "neon-green" },
              { label: "MEMORY", value: 55, color: "neon-cyan" },
              { label: "DISK", value: 34, color: "neon-green" },
              { label: "NETWORK I/O", value: 67, color: "yellow-500" },
            ].map((res) => (
              <div key={res.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-mono text-gray-500">{res.label}</span>
                  <span className="text-xs font-mono text-white">{res.value}%</span>
                </div>
                <div className="w-full h-2 bg-nexus-bg rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-${res.color}`} style={{ width: `${res.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
