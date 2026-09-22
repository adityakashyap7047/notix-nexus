"use client";

import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  color: string;
  bgGradient: string;
  connected: boolean;
  status: string;
}

const initialIntegrations: Integration[] = [
  {
    id: "youtube",
    name: "YouTube",
    description: "Sync uploads, premiere alerts, and subscriber milestones.",
    color: "text-red-500",
    bgGradient: "from-red-500/20 to-red-600/5",
    connected: true,
    status: "Syncing",
  },
  {
    id: "twitch",
    name: "Twitch",
    description: "Live stream notifications, raid alerts, and channel point rewards.",
    color: "text-neon-purple",
    bgGradient: "from-neon-purple/20 to-neon-purple/5",
    connected: true,
    status: "Connected",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Repository commits, pull request alerts, and issue tracking.",
    color: "text-white",
    bgGradient: "from-white/10 to-white/5",
    connected: false,
    status: "Disconnected",
  },
  {
    id: "minecraft",
    name: "Minecraft",
    description: "Server status, player join/leave alerts, and RCON commands.",
    color: "text-neon-green",
    bgGradient: "from-neon-green/20 to-neon-green/5",
    connected: true,
    status: "Online",
  },
  {
    id: "roblox",
    name: "Roblox",
    description: "Game activity, group updates, and asset notifications.",
    color: "text-neon-blue",
    bgGradient: "from-neon-blue/20 to-neon-blue/5",
    connected: false,
    status: "Disconnected",
  },
  {
    id: "steam",
    name: "Steam",
    description: "Game sales, friend activity, and server browser integration.",
    color: "text-blue-800",
    bgGradient: "from-blue-800/20 to-blue-800/5",
    connected: false,
    status: "Disconnected",
  },
  {
    id: "reddit",
    name: "Reddit",
    description: "Subreddit monitoring, post alerts, and karma tracking.",
    color: "text-orange-500",
    bgGradient: "from-orange-500/20 to-orange-500/5",
    connected: true,
    status: "Monitoring",
  },
  {
    id: "rss",
    name: "RSS Feeds",
    description: "Custom feed monitoring for news, blogs, and update sources.",
    color: "text-yellow-400",
    bgGradient: "from-yellow-400/20 to-yellow-400/5",
    connected: false,
    status: "Disconnected",
  },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id
          ? {
              ...int,
              connected: !int.connected,
              status: !int.connected ? "Connected" : "Disconnected",
            }
          : int
      )
    );
  };

  const connected = integrations.filter((i) => i.connected);
  const available = integrations.filter((i) => !i.connected);

  return (
    <div className="min-h-screen bg-nexus-bg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-cyan font-mono tracking-wider">INTEGRATIONS</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">Connect external services &amp; APIs</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500">CONNECTED</span>
          <span className="text-xs font-mono text-neon-green">{connected.length}</span>
          <span className="text-xs font-mono text-gray-600">/</span>
          <span className="text-xs font-mono text-gray-500">{integrations.length}</span>
        </div>
      </div>

      {connected.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-neon-green font-mono tracking-wider mb-4">CONNECTED</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {connected.map((int) => (
              <div
                key={int.id}
                className={`nexus-card p-5 bg-gradient-to-br ${int.bgGradient} border-neon-green/20 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${int.bgGradient} border border-nexus-border flex items-center justify-center`}>
                    <span className={`text-lg ${int.color}`}>◈</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                    <span className="text-[10px] font-mono text-neon-green">{int.status.toUpperCase()}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white font-mono mb-1">{int.name}</h3>
                <p className="text-[11px] text-gray-400 font-mono leading-relaxed mb-4">{int.description}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-nexus-bg border border-nexus-border text-gray-400 text-[10px] font-mono tracking-wider py-1.5 px-3 rounded-lg hover:text-white hover:border-gray-500 transition-colors">
                    CONFIGURE
                  </button>
                  <button
                    onClick={() => toggleConnection(int.id)}
                    className="flex-1 bg-neon-red/10 border border-neon-red/30 text-neon-red text-[10px] font-mono tracking-wider py-1.5 px-3 rounded-lg hover:bg-neon-red/20 transition-colors"
                  >
                    DISCONNECT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-bold text-neon-cyan font-mono tracking-wider mb-4">AVAILABLE INTEGRATIONS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {available.map((int) => (
            <div
              key={int.id}
              className={`nexus-card p-5 bg-gradient-to-br ${int.bgGradient} group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${int.bgGradient} border border-nexus-border flex items-center justify-center`}>
                  <span className={`text-lg ${int.color}`}>◈</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  <span className="text-[10px] font-mono text-gray-500">DISCONNECTED</span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white font-mono mb-1">{int.name}</h3>
              <p className="text-[11px] text-gray-400 font-mono leading-relaxed mb-4">{int.description}</p>
              <button
                onClick={() => toggleConnection(int.id)}
                className="nexus-button w-full text-[10px] font-mono tracking-wider py-2"
              >
                CONNECT
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="nexus-card p-5">
        <h2 className="text-sm font-bold text-neon-purple font-mono tracking-wider mb-4">INTEGRATION LOG</h2>
        <div className="space-y-2">
          {[
            { service: "YouTube", event: "New video uploaded: NEXUS v2.0 Release", time: "5 min ago", type: "info" },
            { service: "Twitch", event: "xNexusDev went live: Coding Session", time: "1 hr ago", type: "info" },
            { service: "Minecraft", event: "Server restarted successfully", time: "2 hr ago", type: "success" },
            { service: "Reddit", event: "New post in r/notixdev: Update Changelog", time: "4 hr ago", type: "info" },
            { service: "Twitch", event: "Raid received from DevStream (234 viewers)", time: "6 hr ago", type: "info" },
            { service: "Minecraft", event: "Player limit reached (100/100)", time: "1 day ago", type: "warning" },
          ].map((log, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-nexus-bg rounded-lg border border-nexus-border/50"
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                log.type === "success"
                  ? "bg-neon-green"
                  : log.type === "warning"
                  ? "bg-yellow-400"
                  : "bg-neon-cyan"
              }`} />
              <span className="text-xs font-mono text-neon-purple flex-shrink-0 w-20">{log.service}</span>
              <span className="text-xs font-mono text-white flex-1 truncate">{log.event}</span>
              <span className="text-[10px] font-mono text-gray-600 flex-shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
