"use client";

import { useState } from "react";

const periods = ["24H", "7D", "30D", "ALL"];

const messageData = [
  { label: "00:00", value: 120 }, { label: "04:00", value: 45 },
  { label: "08:00", value: 320 }, { label: "12:00", value: 680 },
  { label: "16:00", value: 890 }, { label: "20:00", value: 750 },
  { label: "Now", value: 540 },
];

const channelStats = [
  { name: "#general", messages: 4521, percentage: 35 },
  { name: "#memes", messages: 2847, percentage: 22 },
  { name: "#gaming", messages: 1923, percentage: 15 },
  { name: "#tech-talk", messages: 1456, percentage: 11 },
  { name: "#music", messages: 892, percentage: 7 },
  { name: "#off-topic", messages: 1291, percentage: 10 },
];

const topCommands = [
  { name: "/balance", uses: 4521, category: "Economy" },
  { name: "/daily", uses: 3847, category: "Economy" },
  { name: "/rank", uses: 2913, category: "Leveling" },
  { name: "/meme", uses: 2456, category: "Fun" },
  { name: "/play", uses: 1923, category: "Music" },
  { name: "/warn", uses: 847, category: "Moderation" },
  { name: "/8ball", uses: 734, category: "Fun" },
  { name: "/slots", uses: 612, category: "Economy" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7D");
  const maxVal = Math.max(...messageData.map((d) => d.value));

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neon-purple font-mono tracking-wider">ANALYTICS</h1>
          <p className="text-sm text-gray-500 mt-1 font-mono">ORACLE // Data Intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                period === p
                  ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan"
                  : "border-nexus-border text-gray-500 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-lg text-xs font-mono border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-all">
            EXPORT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Messages", value: "12,930", change: "+18%", up: true },
          { label: "Active Members", value: "3,291", change: "+7%", up: true },
          { label: "Voice Hours", value: "847h", change: "+12%", up: true },
          { label: "Commands Used", value: "8,293", change: "-3%", up: false },
        ].map((s) => (
          <div key={s.label} className="nexus-card p-4">
            <p className="text-xs text-gray-500 font-mono">{s.label}</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
            <p className={`text-xs font-mono mt-1 ${s.up ? "text-neon-green" : "text-neon-red"}`}>{s.change}</p>
          </div>
        ))}
      </div>

      {/* Message Activity Chart */}
      <div className="nexus-card p-5">
        <h3 className="text-sm font-mono text-neon-purple mb-4 tracking-wider">MESSAGE ACTIVITY</h3>
        <div className="flex items-end gap-3 h-48">
          {messageData.map((d) => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-gray-500">{d.value}</span>
              <div
                className="w-full rounded-t bg-gradient-to-t from-neon-purple to-neon-cyan transition-all duration-500"
                style={{ height: `${(d.value / maxVal) * 100}%` }}
              />
              <span className="text-[10px] font-mono text-gray-600">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Stats */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-purple mb-4 tracking-wider">CHANNEL BREAKDOWN</h3>
          <div className="space-y-3">
            {channelStats.map((ch) => (
              <div key={ch.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-mono text-white">{ch.name}</span>
                  <span className="text-xs font-mono text-gray-500">{ch.messages.toLocaleString()} • {ch.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-nexus-bg rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                    style={{ width: `${ch.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Commands */}
        <div className="nexus-card p-5">
          <h3 className="text-sm font-mono text-neon-purple mb-4 tracking-wider">TOP COMMANDS</h3>
          <div className="space-y-2">
            {topCommands.map((cmd, i) => (
              <div key={cmd.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-nexus-bg/50 transition-colors">
                <span className="text-xs font-mono text-gray-500 w-6">{i + 1}.</span>
                <span className="text-xs font-mono text-neon-cyan flex-1">{cmd.name}</span>
                <span className="text-[10px] font-mono text-gray-500 px-2 py-0.5 rounded bg-nexus-bg border border-nexus-border">{cmd.category}</span>
                <span className="text-xs font-mono text-white">{cmd.uses.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
