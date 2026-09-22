"use client";

import Sidebar from "../../../components/layout/Sidebar";

const stats = [
  { label: "Total Members", value: "847,392", change: "+1,847" },
  { label: "Messages Today", value: "24,891", change: "+3,247" },
  { label: "Voice Minutes", value: "128,473", change: "+12,847" },
  { label: "Commands Used", value: "8,293", change: "+1,247" },
];

const chart = [
  { h: "00", m: 1200 }, { h: "04", m: 400 }, { h: "08", m: 2800 },
  { h: "12", m: 4200 }, { h: "16", m: 5800 }, { h: "20", m: 7200 },
];

const channels = [
  { name: "#general", msgs: 4829, pct: 24 },
  { name: "#bot-commands", msgs: 3847, pct: 19 },
  { name: "#memes", msgs: 2938, pct: 15 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-purple-400 font-mono tracking-wider">ANALYTICS CENTER</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="nexus-card p-4">
                <p className="text-xs text-gray-500 font-mono">{s.label}</p>
                <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
                <p className="text-xs text-green-400 font-mono mt-1">{s.change}</p>
              </div>
            ))}
          </div>
          <div className="nexus-card p-4">
            <h3 className="text-sm font-mono text-purple-400 mb-4 tracking-wider">MESSAGE ACTIVITY (24H)</h3>
            <div className="flex items-end gap-2 h-40">
              {chart.map((p) => {
                const height = (p.m / 7200) * 100;
                return (
                  <div key={p.h} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-gradient-to-t from-purple-500/20 to-purple-400 rounded-t" style={{ height: height + "%" }} />
                    <span className="text-[10px] text-gray-500 font-mono">{p.h}:00</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="nexus-card p-4">
            <h3 className="text-sm font-mono text-purple-400 mb-4 tracking-wider">TOP CHANNELS</h3>
            <div className="space-y-3">
              {channels.map((ch, i) => (
                <div key={ch.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-mono text-white">{ch.name}</span>
                      <span className="text-xs text-gray-500">{ch.msgs.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-[#080B12] rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: ch.pct + "%" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
