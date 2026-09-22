"use client";

import Sidebar from "../../../components/layout/Sidebar";

const stats = [
  { label: "Total Coins", value: "12.4M" },
  { label: "Active Users", value: "3,847" },
  { label: "Daily Claims", value: "1,293" },
  { label: "Shop Items", value: "48" },
];

const leaders = [
  { rank: 1, user: "RichKing#0001", coins: 847293, level: 42 },
  { rank: 2, user: "CoinMaster#1234", coins: 623847, level: 38 },
  { rank: 3, user: "WealthyUser#5678", coins: 412938, level: 35 },
];

function getRankColor(rank: number) {
  if (rank === 1) return "text-yellow-400";
  if (rank === 2) return "text-gray-400";
  return "text-amber-600";
}

export default function EconomyPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-yellow-400 font-mono tracking-wider">ECONOMY CENTER</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">BYTE // Economy Manager</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="nexus-card p-4">
                <p className="text-xs text-gray-500 font-mono">{s.label}</p>
                <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="nexus-card p-4">
            <h3 className="text-sm font-mono text-yellow-400 mb-4 tracking-wider">LEADERBOARD</h3>
            <div className="space-y-2">
              {leaders.map((e) => (
                <div key={e.rank} className="flex items-center gap-3 p-3 bg-[#080B12] rounded-lg">
                  <span className={"text-lg font-mono font-bold " + getRankColor(e.rank)}>#{e.rank}</span>
                  <div className="flex-1">
                    <p className="text-sm font-mono text-white">{e.user}</p>
                    <p className="text-xs text-gray-500">Level {e.level}</p>
                  </div>
                  <span className="text-sm font-mono text-yellow-400">{e.coins.toLocaleString()} coins</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
