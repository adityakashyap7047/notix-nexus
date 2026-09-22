"use client";

import { useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";

const chars = [
  { id: "nova", name: "NOVA", title: "Main AI", color: "#00F5FF", emoji: "🔮", status: "active", queries: 12847 },
  { id: "vex", name: "VEX", title: "Security", color: "#FF3B5C", emoji: "🛡", status: "active", queries: 3891 },
  { id: "aria", name: "ARIA", title: "Community", color: "#8B5CF6", emoji: "💬", status: "idle", queries: 8432 },
  { id: "kai", name: "KAI", title: "Developer", color: "#3B82F6", emoji: "⚡", status: "active", queries: 2156 },
  { id: "byte", name: "BYTE", title: "Economy", color: "#FFD700", emoji: "💰", status: "idle", queries: 5623 },
  { id: "rune", name: "RUNE", title: "Moderation", color: "#FF8C42", emoji: "⚔", status: "active", queries: 4218 },
  { id: "nexus", name: "NEXUS", title: "Infrastructure", color: "#00FF9C", emoji: "🌐", status: "active", queries: 1847 },
  { id: "pixel", name: "PIXEL", title: "Gaming", color: "#FF69B4", emoji: "🎮", status: "idle", queries: 3156 },
];

function charCardStyle(color: string) {
  return { backgroundColor: color + "20", border: "1px solid " + color + "40" };
}

export default function AICorePage() {
  const [sel, setSel] = useState(chars[0]);
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400 font-mono tracking-wider">AI CORE</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">NOVA // Command Center AI</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chars.map((p) => (
              <button
                key={p.id}
                onClick={() => setSel(p)}
                className={"nexus-card p-4 text-left transition-all " + (sel.id === p.id ? "glow-cyan border-cyan-400" : "")}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={charCardStyle(p.color)}>
                    {p.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-mono font-bold" style={{ color: p.color }}>{p.name}</p>
                    <p className="text-[10px] text-gray-500">{p.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500">{p.queries.toLocaleString()} queries</span>
                  <div className={"status-dot " + (p.status === "active" ? "online" : "offline")} />
                </div>
              </button>
            ))}
          </div>
          <div className="nexus-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl" style={charCardStyle(sel.color)}>
                {sel.emoji}
              </div>
              <div>
                <h2 className="text-xl font-mono font-bold" style={{ color: sel.color }}>{sel.name}</h2>
                <p className="text-sm text-gray-500">{sel.title}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#080B12] rounded-lg">
                <p className="text-xs text-gray-500">Total Queries</p>
                <p className="text-lg font-mono font-bold" style={{ color: sel.color }}>{sel.queries.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-[#080B12] rounded-lg">
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-lg font-mono font-bold text-green-400">{sel.status.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
