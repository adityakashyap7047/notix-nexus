"use client";

import Sidebar from "../../../components/layout/Sidebar";

const stats = [
  { label: "Threat Level", value: "NOMINAL", color: "text-green-400" },
  { label: "Threats (24h)", value: "3", color: "text-yellow-400" },
  { label: "Lockdown", value: "INACTIVE", color: "text-green-400" },
  { label: "Protected Servers", value: "1,247", color: "text-cyan-400" },
];

const threats = [
  { type: "JOIN_BURST", severity: "HIGH", details: "8 joins in 30s", time: "45m ago" },
  { type: "SCAM_LINK", severity: "CRITICAL", details: "Phishing link detected", time: "2h ago" },
];

const shields = [
  { name: "Anti-Raid", threats: 12 },
  { name: "Anti-Spam", threats: 47 },
  { name: "Anti-Link", threats: 23 },
  { name: "Anti-Invite", threats: 31 },
];

function getSeverityClass(severity: string) {
  if (severity === "CRITICAL") return "bg-red-500/20 text-red-400";
  if (severity === "HIGH") return "bg-orange-400/20 text-orange-400";
  return "bg-yellow-400/20 text-yellow-400";
}

export default function SecurityPage() {
  return (
    <div className="flex h-screen overflow-hidden grid-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-red-400 font-mono tracking-wider">NEXUS SECURITY CORE</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">VEX // Security Intelligence</p>
          </div>
          <div className="terminal scan-line">
            <div className="pt-8 text-center">
              <div className="text-4xl font-mono font-bold text-green-400">OPERATIONAL</div>
              <p className="text-sm text-gray-500 font-mono mt-2">THREAT LEVEL: NOMINAL</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="nexus-card p-4">
                <p className="text-xs text-gray-500 font-mono">{s.label}</p>
                <p className={"text-xl font-bold font-mono mt-1 " + s.color}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="nexus-card p-4">
              <h3 className="text-sm font-mono text-red-400 mb-4 tracking-wider">SHIELD MODULES</h3>
              <div className="space-y-3">
                {shields.map((m) => (
                  <div key={m.name} className="flex items-center justify-between p-3 bg-[#080B12] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="status-dot online" />
                      <span className="text-sm font-mono text-white">{m.name}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">{m.threats} blocked</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="nexus-card p-4">
              <h3 className="text-sm font-mono text-red-400 mb-4 tracking-wider">RECENT THREATS</h3>
              <div className="space-y-3">
                {threats.map((t, i) => (
                  <div key={i} className="p-3 bg-[#080B12] rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={"text-[10px] font-mono px-1.5 py-0.5 rounded " + getSeverityClass(t.severity)}>
                        {t.severity}
                      </span>
                      <span className="text-xs font-mono text-white">{t.type}</span>
                      <span className="text-[10px] text-gray-500 ml-auto">{t.time}</span>
                    </div>
                    <p className="text-xs text-gray-500">{t.details}</p>
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
