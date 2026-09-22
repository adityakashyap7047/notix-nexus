"use client";

import { useState } from "react";

const stats = [
  { label: "TOTAL GIVEAWAYS", value: "342", icon: "◈", color: "text-neon-cyan" },
  { label: "TOTAL WINNERS", value: "1,247", icon: "◎", color: "text-neon-green" },
  { label: "TOTAL ENTRIES", value: "89.4K", icon: "◇", color: "text-neon-purple" },
];

const activeGiveaways = [
  {
    id: 1,
    prize: "Nitro Boost (1 Month)",
    host: "xNexusDev",
    entries: 234,
    timeRemaining: "2h 15m",
    winnerCount: 1,
    channel: "#giveaways",
  },
  {
    id: 2,
    prize: "50,000 NexusCoins",
    host: "CryptoQueen",
    entries: 189,
    timeRemaining: "4h 30m",
    winnerCount: 3,
    channel: "#events",
  },
  {
    id: 3,
    prize: "Custom Role + Color",
    host: "ShadowByte",
    entries: 156,
    timeRemaining: "1d 6h",
    winnerCount: 1,
    channel: "#giveaways",
  },
  {
    id: 4,
    prize: "Gaming Headset",
    host: "NeonHacker",
    entries: 412,
    timeRemaining: "3d 12h",
    winnerCount: 1,
    channel: "#events",
  },
];

const pastGiveaways = [
  { prize: "Discord Nitro", winners: "PixelGhost", entries: 567, date: "2 hours ago", status: "ended" },
  { prize: "25,000 NexusCoins", winners: "DataMiner99, VoidWalker", entries: 342, date: "5 hours ago", status: "ended" },
  { prize: "VIP Role", winners: "BitStorm", entries: 198, date: "1 day ago", status: "ended" },
  { prize: "Nitro Boost (1 Month)", winners: "CryptoQueen", entries: 891, date: "2 days ago", status: "ended" },
  { prize: "Custom Crate", winners: "xNexusDev, NeonHacker", entries: 234, date: "3 days ago", status: "ended" },
  { prize: "Profile Badge", winners: "ShadowByte", entries: 156, date: "4 days ago", status: "ended" },
];

export default function GiveawaysPage() {
  const [prize, setPrize] = useState("");
  const [winnerCount, setWinnerCount] = useState("1");
  const [duration, setDuration] = useState("1h");
  const [channel, setChannel] = useState("#giveaways");
  const [requireRole, setRequireRole] = useState(false);
  const [minLevel, setMinLevel] = useState("0");

  return (
    <div className="min-h-screen bg-nexus-bg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-green font-mono tracking-wider">GIVEAWAY SYSTEM</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">Create &amp; manage giveaways</p>
        </div>
        <button className="nexus-button text-xs font-mono tracking-wider">
          + NEW GIVEAWAY
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="nexus-card p-4">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-lg ${stat.color}`}>{stat.icon}</span>
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-mono tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-white font-mono">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-bold text-neon-cyan font-mono tracking-wider mb-4">ACTIVE GIVEAWAYS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeGiveaways.map((gw) => (
            <div
              key={gw.id}
              className="nexus-card p-5 hover:border-neon-green/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-nexus-border flex items-center justify-center text-sm text-neon-green">
                    ◈
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">{gw.prize}</h3>
                    <p className="text-[10px] text-gray-500 font-mono">by {gw.host} in {gw.channel}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neon-green px-2 py-0.5 rounded-full border border-neon-green/30 bg-neon-green/10 animate-pulse">
                  LIVE
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-white font-mono">{gw.entries}</p>
                  <p className="text-[10px] text-gray-500 font-mono">ENTRIES</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neon-green font-mono">{gw.timeRemaining}</p>
                  <p className="text-[10px] text-gray-500 font-mono">REMAINING</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neon-purple font-mono">{gw.winnerCount}</p>
                  <p className="text-[10px] text-gray-500 font-mono">WINNERS</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 nexus-button text-[10px] font-mono tracking-wider py-1.5">
                  REROLL
                </button>
                <button className="flex-1 bg-nexus-bg border border-neon-red/30 text-neon-red text-[10px] font-mono tracking-wider py-1.5 px-3 rounded-lg hover:bg-neon-red/10 transition-colors">
                  END NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 nexus-card p-5">
          <h2 className="text-sm font-bold text-neon-purple font-mono tracking-wider mb-4">PAST GIVEAWAYS</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-nexus-border">
                  <th className="text-left text-xs text-gray-500 font-mono pb-3">PRIZE</th>
                  <th className="text-left text-xs text-gray-500 font-mono pb-3">WINNERS</th>
                  <th className="text-right text-xs text-gray-500 font-mono pb-3">ENTRIES</th>
                  <th className="text-right text-xs text-gray-500 font-mono pb-3">DATE</th>
                </tr>
              </thead>
              <tbody>
                {pastGiveaways.map((gw, i) => (
                  <tr key={i} className="border-b border-nexus-border/50 hover:bg-nexus-bg/50 transition-colors">
                    <td className="py-3 text-sm font-mono text-white">{gw.prize}</td>
                    <td className="py-3 text-xs font-mono text-neon-green">{gw.winners}</td>
                    <td className="py-3 text-right text-xs font-mono text-gray-400">{gw.entries}</td>
                    <td className="py-3 text-right text-xs font-mono text-gray-500">{gw.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="nexus-card p-5">
          <h2 className="text-sm font-bold text-neon-cyan font-mono tracking-wider mb-4">CREATE GIVEAWAY</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-mono mb-1 block">PRIZE</label>
              <input
                type="text"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                placeholder="Enter prize..."
                className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1 block">WINNERS</label>
                <input
                  type="number"
                  value={winnerCount}
                  onChange={(e) => setWinnerCount(e.target.value)}
                  className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1 block">DURATION</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-neon-cyan transition-colors"
                >
                  <option value="30m">30 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="6h">6 hours</option>
                  <option value="1d">1 day</option>
                  <option value="3d">3 days</option>
                  <option value="7d">7 days</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono mb-1 block">CHANNEL</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-neon-cyan transition-colors"
              >
                <option value="#giveaways">#giveaways</option>
                <option value="#events">#events</option>
                <option value="#general">#general</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-nexus-bg rounded-lg border border-nexus-border">
              <div>
                <p className="text-sm font-mono text-white">Require Role</p>
                <p className="text-[10px] text-gray-500 font-mono">Restrict to specific role</p>
              </div>
              <button
                onClick={() => setRequireRole(!requireRole)}
                className={`toggle ${requireRole ? "active" : ""}`}
              />
            </div>
            {requireRole && (
              <div>
                <label className="text-xs text-gray-500 font-mono mb-1 block">MINIMUM LEVEL</label>
                <input
                  type="number"
                  value={minLevel}
                  onChange={(e) => setMinLevel(e.target.value)}
                  className="w-full bg-nexus-bg border border-nexus-border rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>
            )}
            <button className="nexus-button w-full text-xs font-mono tracking-wider">
              CREATE GIVEAWAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
