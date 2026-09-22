"use client";

import Sidebar from "../../../components/layout/Sidebar";

const rewards = [
  { level: 5, role: "Member" },
  { level: 10, role: "Regular" },
  { level: 20, role: "Veteran" },
  { level: 30, role: "Elite" },
  { level: 50, role: "Legend" },
  { level: 100, role: "Transcendent" },
];

const top = [
  { rank: 1, user: "NoLifeKing", level: 67, xp: "2.4M", prestige: 3 },
  { rank: 2, user: "XPGod", level: 58, xp: "1.8M", prestige: 2 },
  { rank: 3, user: "Grinder", level: 52, xp: "1.4M", prestige: 1 },
];

function getRankColor(rank: number) {
  if (rank === 1) return "text-yellow-400";
  if (rank === 2) return "text-gray-400";
  return "text-amber-600";
}

export default function LevelingPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-green-400 font-mono tracking-wider">LEVELING SYSTEM</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">Experience points and rewards</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="nexus-card p-4">
              <h3 className="text-sm font-mono text-green-400 mb-4 tracking-wider">LEVEL REWARDS</h3>
              <div className="space-y-2">
                {rewards.map((r) => (
                  <div key={r.level} className="flex items-center gap-3 p-3 bg-[#080B12] rounded-lg">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm bg-green-400/10 text-green-400 border border-green-400/30">
                      {r.level}
                    </div>
                    <div>
                      <p className="text-sm font-mono text-white">{r.role}</p>
                      <p className="text-xs text-gray-500">Level {r.level}+</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="nexus-card p-4">
              <h3 className="text-sm font-mono text-green-400 mb-4 tracking-wider">TOP LEVELS</h3>
              <div className="space-y-2">
                {top.map((e) => (
                  <div key={e.rank} className="flex items-center gap-3 p-3 bg-[#080B12] rounded-lg">
                    <span className={"text-lg font-mono font-bold " + getRankColor(e.rank)}>#{e.rank}</span>
                    <div className="flex-1">
                      <p className="text-sm font-mono text-white">{e.user}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-green-400">Lvl {e.level}</span>
                        <span className="text-xs text-gray-500">{e.xp} XP</span>
                        {e.prestige > 0 && <span className="text-xs text-purple-400">P{e.prestige}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
