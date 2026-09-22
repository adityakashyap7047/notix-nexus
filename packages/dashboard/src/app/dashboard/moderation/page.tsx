"use client";

import Sidebar from "../../../components/layout/Sidebar";

const stats = [
  { label: "Warnings", value: "247" },
  { label: "Timeouts", value: "89" },
  { label: "Kicks", value: "34" },
  { label: "Bans", value: "12" },
];

const cases = [
  { id: "CASE-4821", user: "SpamBot#0001", type: "BAN", reason: "Automated spam", time: "2h ago" },
  { id: "CASE-4820", user: "ToxicUser#1234", type: "TIMEOUT", reason: "Toxic behavior", time: "4h ago" },
  { id: "CASE-4819", user: "RuleBreaker#5678", type: "WARN", reason: "NSFW in general", time: "6h ago" },
];

const automod = [
  { name: "Anti-Spam", enabled: true, action: "Delete + Warn" },
  { name: "Anti-Flood", enabled: true, action: "Timeout" },
  { name: "Anti-Link", enabled: true, action: "Delete" },
  { name: "Anti-Invite", enabled: true, action: "Delete + Warn" },
  { name: "Bad Word Filter", enabled: true, action: "Delete + Warn" },
];

function getTypeDot(type: string) {
  if (type === "BAN") return "bg-red-500";
  if (type === "TIMEOUT") return "bg-yellow-400";
  return "bg-cyan-400";
}

function getTypeClass(type: string) {
  if (type === "BAN") return "bg-red-500/20 text-red-400";
  if (type === "TIMEOUT") return "bg-yellow-400/20 text-yellow-400";
  return "bg-cyan-400/20 text-cyan-400";
}

export default function ModerationPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-orange-400 font-mono tracking-wider">MODERATION CENTER</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">RUNE // Moderation Enforcer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="nexus-card p-4">
                <p className="text-xs text-gray-500 font-mono">{s.label}</p>
                <p className="text-2xl font-bold text-white font-mono mt-1">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="nexus-card p-4">
              <h3 className="text-sm font-mono text-orange-400 mb-4 tracking-wider">RECENT CASES</h3>
              <div className="space-y-3">
                {cases.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 bg-[#080B12] rounded-lg">
                    <div className={"w-2 h-2 rounded-full " + getTypeDot(c.type)} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white">{c.id}</span>
                        <span className={"text-[10px] font-mono px-1.5 py-0.5 rounded " + getTypeClass(c.type)}>
                          {c.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{c.user} - {c.reason}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="nexus-card p-4">
              <h3 className="text-sm font-mono text-orange-400 mb-4 tracking-wider">AUTOMOD RULES</h3>
              <div className="space-y-2">
                {automod.map((r) => (
                  <div key={r.name} className="flex items-center justify-between p-3 bg-[#080B12] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={"w-2 h-2 rounded-full " + (r.enabled ? "bg-green-400" : "bg-gray-600")} />
                      <span className="text-sm text-white">{r.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{r.action}</span>
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
